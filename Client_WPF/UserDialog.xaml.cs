using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
    /// Interaktionslogik für UserDialog.xaml
    /// </summary>
    public partial class UserDialog : Window
    {
        private MyHttpClient client;




        public UserDialog()
        {
            client = new MyHttpClient();


            InitializeComponent();


            Loaded += OnLoad;
        }

        public async void OnLoad(object sender, RoutedEventArgs e)
        {
            
            List<User?> users = await client.getActiveUsersAsync();


            userList.ItemsSource = users;
        }

        private void userList_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {

            if (sender is ListView list)
            {
                if (list.SelectedItems != null)
                {
                    User? u = list.SelectedItem as User;

                    if(u != null)
                    {
                        usernameLabel.Content = "Username: " + u.Username;
                        moneyLabel.Content = "Password: " + u.Money;
                    }

                }
            }
        }
    }
}
