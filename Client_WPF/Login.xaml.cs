using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace Client_WPF
{
    /// <summary>
    /// Interaktionslogik für Login.xaml
    /// </summary>
    public partial class Login : Window
    {
        private string curPath;
        private MyHttpClient client;

        public Login()
        {
            InitializeComponent();

            this.curPath = AppDomain.CurrentDomain.BaseDirectory;

            client = new MyHttpClient();

            SetIcon();


            this.Background = Brushes.AliceBlue;
        }

        private void SetIcon()
        {
            if (File.Exists(curPath + "/Icons/loginicon.jpg"))
            {
                this.Icon = new BitmapImage(new Uri(curPath + "/Icons/loginicon.jpg"));
            }
        }

        private async void login_Click(object sender, RoutedEventArgs e)
        {
            string username = usernameBox.Text;
            string password = passwordBox.Text;

            User? user = await client.Login(username, password);

            if(user == null)
            {
                MessageBox.Show("NULL");
                return;
            }

            MainWindow.user = user;

            Close();
        }


        //TODO: IF EXIST!
        private async void signUp_Click(object sender, RoutedEventArgs e)
        {
            string username = usernameBox.Text;
            string password = passwordBox.Text;

            MessageBox.Show(username + "  " + password);


            string items = await client.signIn(username, password);

            if(items == null)
            {
                MessageBox.Show("Already Registered! Please log in!");
            }
            else
            {
                MessageBox.Show(items, "Sign in", MessageBoxButton.OK, MessageBoxImage.Information);
            }
        }
    }
}
