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
        private string _username;
        private int _money;
        private string password;
        private string _hashedPassword;

        public User() {}

        public User(string username, string password, int money) 
        { 
            this._username = username;
            this._money = money;
            this.password = password;
            this._hashedPassword = EncryptionHelper.HashPassword(password);
        }

        [JsonPropertyName("_username")]
        public string Username
        {
            get { return _username; }
            set { _username = value; }
        }

        [JsonPropertyName("_money")]
        public int Money
        {
            get { return this._money; }
            set { this._money = value; }
        }

        [JsonPropertyName("password")]
        public string Password
        {
            get { return password; }
            set { password = value; }
        }

        [JsonPropertyName("_passwordHashed")]
        public string HashedPassword
        {
            get { return this._hashedPassword; }
            set {  this._hashedPassword = value; }
        }

        public bool VerifyPassword()
        {
            return EncryptionHelper.VerifyPassword(this.password, this._hashedPassword);
        }

        public override string ToString()
        {
            return $"Username: {this._username} money: {this._money} password: {this.password} hashpassword: {this._hashedPassword}";
        }

    }
}
