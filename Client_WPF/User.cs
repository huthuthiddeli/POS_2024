using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using System.Windows;

namespace Client_WPF
{
    public class User
    {
        public string username;
        private int money;
        private string password;
        private string hashedPassword;

        public User() {}

        public User(string username, string password, int money) 
        { 
            this.username = username;
            this.money = money;
            this.password = password;
            this.hashedPassword = EncryptionHelper.HashPassword(password);
        }

        [JsonPropertyName("username")]
        public string Username
        {
            get { return username; }
            set { username = value; }
        }

        [JsonPropertyName("money")]
        public int Money
        {
            get { return this.money; }
            set { this.money = value; }
        }

        [JsonPropertyName("password")]
        public string Password
        {
            get { return password; }
            set { password = value; }
        }

        [JsonPropertyName("passwordHashed")]
        public string HashedPassword
        {
            get { return this.hashedPassword; }
            set {  this.hashedPassword = value; }
        }

        public bool VerifyPassword()
        {
            return EncryptionHelper.VerifyPassword(this.password, this.hashedPassword);
        }

        public override string ToString()
        {
            return $"Username: {this.username} money: {this.money} password: {this.password} hashpassword: {this.hashedPassword}";
        }

    }
}
