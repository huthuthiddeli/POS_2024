using System.Collections.ObjectModel;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Windows;
using System.Windows.Media.Imaging;
using Client_WPF;
using System;
using System.ComponentModel;
using System.Windows.Controls;

namespace Client_WPF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private static BetLocation? gameManager;
        private static User? _user;
        private MyHttpClient client;
        private string curDir;

        //TODO: STILL HAVE TO ADD MONEY IF WON BET

        public MainWindow()
        {
            Login login = new Login();
            login.ShowDialog();

            if(user == null)
            {
                MessageBox.Show("Not logged in! Application will shut down!", "info");
                Application.Current.Shutdown();
            }

            curDir = AppDomain.CurrentDomain.BaseDirectory;

            InitializeComponent();

            this.Loaded += LoadSetup;


            SetIcon();
        }

        private void SetIcon()
        {
            if (File.Exists(curDir + "/Icons/horseicon.jpg"))   
            {
                this.Icon = new BitmapImage(new Uri(curDir + "/Icons/raceicon.jpg"));
            }
        }

        private async void LoadSetup(object sender, RoutedEventArgs e)
        {
            client = new MyHttpClient();

            gameManager = await client.InitGame(user);

            if (gameManager == null)
            {
                return;
            }

            locationLabel.Content = "Location: " + gameManager.Location;

            distanceLabel.Content = "Tracklength: " + gameManager.TrackLength;

            userNameLabel.Content = "Username: " + user.username;


            FirstHorseName.Content = gameManager.Horses[0].Name;
            SecondHorseName.Content = gameManager.Horses[1].Name;
            ThirdHorseName.Content = gameManager.Horses[2].Name;
            FourthHorseName.Content = gameManager.Horses[3].Name;
            FivthHorseName.Content = gameManager.Horses[4].Name;
        }

        private void displayHorses_Click(object sender, RoutedEventArgs e)
        {
            ShowHorses showHorses = new ShowHorses();
            showHorses.ShowDialog();


            if (gameManager.GameStarted)
            {
                MessageBox.Show("game started");
            }
        }

        public static User? user
        {
            get { return _user; }
            set { _user = value; }
        }

        public static BetLocation? GameManager
        {
            get { return gameManager; }
            set { gameManager = value; }
        }

        private async void iterateButton_Click(object sender, RoutedEventArgs e)
        {
            gameManager = await client.SingleIteration();


            // IMPLEMENT GAME RESTART WHEN GAME FINISHED
            if(gameManager.GameFinished)
            {
                foreach (var item2 in grid.Children)
                {
                    if (item2 is ProgressBar)
                    {
                        ProgressBar progressBar = (ProgressBar)item2;

                        switch (progressBar.Name)
                        {

                            case "FirstHorse":
                                float value = gameManager.Horses[0].RunDistance / gameManager.TrackLength * 100;
                                
                                progressBar.Value = value;
                                break;
                            case "SecondHorse":
                                value = gameManager.Horses[1].RunDistance / gameManager.TrackLength * 100;
                                progressBar.Value = value;
                                break;
                            case "ThirdHorse":
                                value = gameManager.Horses[2].RunDistance / gameManager.TrackLength * 100;
                                progressBar.Value = value;
                                break;
                            case "FourthHorse":
                                value = gameManager.Horses[3].RunDistance / gameManager.TrackLength * 100;
                                progressBar.Value = value;
                                break;
                            case "FivthHorse":
                                value = gameManager.Horses[4].RunDistance / gameManager.TrackLength * 100;
                                progressBar.Value = value;
                                break;

                        }


                    }
                }


                MessageBox.Show("FINISHED!");

                Dictionary<string, float> item = await gameManager.CalculateBetResults();

                MessageBox.Show(item.Count.ToString());

                foreach(KeyValuePair<string, float> keyValuePair in item)
                {
                    MessageBox.Show(keyValuePair.ToString());
                }

                MessageBox.Show("WINNER IS:\n" + gameManager.Horses.FirstOrDefault(e => e.RunDistance >= gameManager.TrackLength).ToString());




            }
            else
            {
                foreach(var item in grid.Children)
                {
                    if(item is ProgressBar)
                    {
                        ProgressBar progressBar = (ProgressBar)item;

                        switch (progressBar.Name)
                        {

                            case "FirstHorse":
                                float value = gameManager.Horses[0].RunDistance / gameManager.TrackLength * 100;
                                progressBar.Value = value;
                                break;
                            case "SecondHorse":
                                value = gameManager.Horses[1].RunDistance / gameManager.TrackLength * 100;
                                progressBar.Value = value;
                                break;
                            case "ThirdHorse":
                                value = gameManager.Horses[2].RunDistance / gameManager.TrackLength * 100;
                                progressBar.Value = value;
                                break;
                            case "FourthHorse":
                                value = gameManager.Horses[3].RunDistance / gameManager.TrackLength * 100;
                                progressBar.Value = value;
                                break;
                            case "FivthHorse":
                                value = gameManager.Horses[4].RunDistance / gameManager.TrackLength * 100;
                                progressBar.Value = value;
                                break;
                                
                        }
                       
                            
                    }
                }
            }
        }

        private async void userNameLabel_Click(object sender, RoutedEventArgs e)
        {
            if(user == null)
            {
                MessageBox.Show("You are not logged in! Please restart the application!");
                return;
            }

            UserDialog userDialog = new UserDialog();
            userDialog.ShowDialog();
        }
    }
}