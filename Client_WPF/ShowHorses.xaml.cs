using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media.Imaging;

namespace Client_WPF
{
    /// <summary>
    /// Interaktionslogik für ShowHorses.xaml
    /// </summary>
    public partial class ShowHorses : Window
    {
        private BetLocation manager;
        private string curDir;
        private MyHttpClient client;

        public ShowHorses()
        {
            InitializeComponent();

            client = new MyHttpClient();    

            curDir = AppDomain.CurrentDomain.BaseDirectory;

            this.Loaded += SetUp;

            SetIcon();

            horseList.MouseDoubleClick += HorseList_MouseDoubleClick;
        }

        private void SetIcon()
        {
            if (File.Exists(curDir + "/Icons/horseicon.jpg"))
            {
                this.Icon = new BitmapImage(new Uri(curDir + "/Icons/horseicon.jpg"));
            }
        }


        private async void HorseList_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            
            if(sender is ListView list)
            {
                if(list.SelectedItems != null)
                {
                    Horse? selectedItem = list.SelectedItem as Horse;

                    if (selectedItem?.Bets == null)
                    {
                        MessageBox.Show("ALARM");
                    }


                    betList.ItemsSource = selectedItem?.Bets;

                    horseName.Content = selectedItem?.Name;
                }
            }
        }

        public void SetUp(Object sender, RoutedEventArgs e)
        {
            if(MainWindow.GameManager is not null)
            {
                horseList.ItemsSource = MainWindow.GameManager.Horses;

                if (MainWindow.GameManager.GameStarted)
                {
                    submit.IsEnabled = false;
                    horseName.Content = "Race has already begun, you´ve run out of time!";
                }

            }
        }

        private async void submit_Click(object sender, RoutedEventArgs e)
        {
            if(horseName.Content.ToString()?.Length > 0 && ammount.Text.Length > 0)
            {
                string newContent = await client.PlaceBet(ammount.Text.ToString(), MainWindow.user.Username, horseName.Content.ToString());
                MessageBox.Show(MainWindow.user.Username);

                if(newContent == "There was no such horse like this")
                {
                    MessageBox.Show(newContent);
                    return;
                }

                MainWindow.GameManager = JsonSerializer.Deserialize<BetLocation>(newContent);
                horseList.ItemsSource = MainWindow.GameManager.Horses;

                //adds the specific value to the betlist
                for(int i = 0; i < MainWindow.GameManager.Horses.Length; i++)
                {
                    if (MainWindow.GameManager.Horses[i].Name == horseName.Content.ToString())
                    {
                        betList.ItemsSource = MainWindow.GameManager.Horses[i].Bets;
                    }
                }

            }
        }

        private void finish_Click(object sender, RoutedEventArgs e)
        {
            MainWindow.GameManager.GameStarted = true;


            Close();
        }
    }
}
