using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.CompilerServices;
using System.Runtime.Serialization;
using System.Security.Policy;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;

namespace Client_WPF
{
    public class MyHttpClient
    {
        private HttpClient _httpClient;


        public MyHttpClient()
        {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("http://localhost:8080/");
        }

        public async Task<BetLocation?> InitGame(User u)
        {
            try
            {
                HttpResponseMessage response;


                string json = JsonSerializer.Serialize(u);

                if(u != null)
                {
                    var stringContent = new StringContent(json, Encoding.UTF8, "application/json");


                    response = await _httpClient.PostAsync("Pferderennen/Game/innit", stringContent);

                    MessageBox.Show("user existing");
                }
                else
                {
                    response = await _httpClient.PostAsync("Pferderennen/Game/innit", null);
                }


                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();

                    JsonSerializerOptions options = new JsonSerializerOptions();
                    options.PropertyNameCaseInsensitive = false;

                    BetLocation? location = await JsonSerializer.DeserializeAsync<BetLocation>(new MemoryStream(Encoding.UTF8.GetBytes(responseBody)), options);

                    foreach (Horse h in location.Horses)
                    {
                        h.Speed = (float)Math.Round(h.Speed, 3);
                    }

                    location.TrackLength = (float)Math.Round(location.TrackLength, 4);

                    return location;
                }
            
            }catch(Exception ex)
            {
                MessageBox.Show(ex.Message, "InitError!");
            }

            

            return null;
        }

        public async Task<string> PlaceBet(float betValue, string better, string horseName)
        {
            try
            {

                string jsonObj = JsonSerializer.Serialize(new { betValue, better, horseName});

                var content = new StringContent(jsonObj, Encoding.UTF8, "application/json");


                HttpResponseMessage response = await _httpClient.PostAsync("Pferderennen/Game/Bet", content);

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();

                    return responseBody;
                }


            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }


            return "";
        }


        public async Task<User?> Login(string _username, string _password)
        {
            string _passwordHashed = EncryptionHelper.HashPassword(_password);

            int money = 0;

            string jsonObj = JsonSerializer.Serialize(new { _username, money, _passwordHashed });

            var content = new StringContent(jsonObj, Encoding.UTF8, "application/json");

            User? u = null;
            
            try
            {

                HttpResponseMessage respones = await _httpClient.PostAsync("User/Login", content);


                if (respones.IsSuccessStatusCode)
                {
                    string data = await respones.Content.ReadAsStringAsync();
                    u = JsonSerializer.Deserialize<User?>(data);
                    MainWindow.user = u;
                }

            }
            catch(JsonException e)
            {
                MessageBox.Show(e.Message);
            }
            catch(Exception e)
            {
                MessageBox.Show(e.Message);
            }

            return u;
        }

        public async Task<string> signIn(string username, string password)
        {
            string passwordHashed = EncryptionHelper.HashPassword(password);

            if(!EncryptionHelper.VerifyPassword(password, passwordHashed))
            {
                return "Error";
            }

            string jsonObj = JsonSerializer.Serialize(new { username, password, passwordHashed });

            var content = new StringContent(jsonObj, Encoding.UTF8, "application/json");
            try
            {
                HttpResponseMessage respone = await _httpClient.PostAsync("User/Create", content);

                if (respone.IsSuccessStatusCode)
                {
                    return await respone.Content.ReadAsStringAsync();
                }

            }catch(Exception ex)
            {
                MessageBox.Show("ERROR");
                MessageBox.Show($"{ex.Message}", "Exception");
            }



            return "Error";
        }

        public async Task<BetLocation?> SingleIteration()
        {
            string data = "";

            try
            {
                HttpResponseMessage responseMessage = await _httpClient.GetAsync("Pferderennen/Game/iterate");

                if (responseMessage.IsSuccessStatusCode)
                {
                    data = await responseMessage.Content.ReadAsStringAsync();

                    BetLocation? curLocation = JsonSerializer.Deserialize<BetLocation?>(data);

                    return curLocation;
                }

            }catch(Exception ex)
            {
                MessageBox.Show(ex.Message);
            }


            return null;
        }


        public async Task<Dictionary<string, float>?> GetBetWinners()
        {

            try
            {
                HttpResponseMessage message = await _httpClient.GetAsync("Pferderennen/Game/");


                Dictionary<string, float>? content = JsonSerializer.Deserialize<Dictionary<string, float>>(await message.Content.ReadAsStringAsync());

            }catch(Exception ex)
            {
                MessageBox.Show(ex.Message);
            }


            return null;
        }


        public async Task<List<User?>> getActiveUsersAsync()
        {
            try
            {
                HttpResponseMessage message = await _httpClient.GetAsync("Pferderennen/Game/ActiveUsers");

                List<User>? list = JsonSerializer.Deserialize<List<User>>(await message.Content.ReadAsStringAsync());


                return list;

            }catch(Exception e)
            {
                MessageBox.Show(e.Message);
            }




            return null;
        }

    }
}
