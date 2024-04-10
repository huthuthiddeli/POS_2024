using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Client_WPF
{
    public class BetLocation
    {
        private string location;
        private Horse[] horses = new Horse[5];
        private float trackLength;
        private bool gameFinished;
        private Horse winner;
        private bool gameStarted;

        public BetLocation() { }

        public BetLocation(string location, Horse[] horses, float trackLength, bool gameFinsihed, Horse winner, bool gameStarted)
        {
            this.location = location;
            this.horses = horses;
            this.trackLength = trackLength;
            this.gameFinished = gameFinsihed;
            this.winner = winner;
            this.gameStarted = gameStarted;
        }

        //TODO: REFACTOR SO THAT IT WILL EVENTUALLY WORK

        public async Task<Dictionary<string, float>> CalculateBetResults()
        {
            Dictionary<string, float> betResults = new Dictionary<string, float>();

            // Find the winning horse
            Horse? winningHorse = horses.FirstOrDefault(horse => horse.RunDistance > trackLength);

            // Iterate through each horse's bets
            foreach (Horse horse in horses)
            {
                foreach (KeyValuePair<string, float> bet in horse.Bets)
                {
                    // Check if the bettor's horse won
                    bool betWon = horse == winningHorse;

                    // Calculate the result based on the bet
                    float result = betWon ? bet.Value : -bet.Value;

                    // Update the bet result for the bettor
                    if (betResults.ContainsKey(bet.Key))
                    {
                        betResults[bet.Key] += result;
                    }
                    else
                    {
                        betResults[bet.Key] = result;
                    }
                }
            }

            return betResults;
        }




        public override string ToString()
        {
            return $"LOCATION: {location} horses: {horses.Length} tracklength: {trackLength}";
        }


        [JsonPropertyName("location")]
        public string Location
        {
            get { return location; }
            set { location = value; }
        }

        [JsonPropertyName("horses")]
        public Horse[] Horses
        {
            get { return horses; }
            set { horses = value; }
        }

        [JsonPropertyName("trackLength")]
        public float TrackLength
        {
            get { return trackLength; }
            set { trackLength = value; }
        }

        [JsonPropertyName("gameFinished")]
        public bool GameFinished
        {
            get { return gameFinished; }
            set { gameFinished = value; }
        }

        [JsonPropertyName("winner")]
        public Horse Winner
        {
            get { return winner; }
            set { winner = value; }
        }

        [JsonPropertyName("gameStarted")]
        public bool GameStarted
        {
            get { return gameStarted; }
            set { gameStarted = value; }
        }
    }
}
