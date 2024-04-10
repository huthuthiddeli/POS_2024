using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Client_WPF
{
    public class Horse
    {
        private string name;
        private float speed;
        private Dictionary<string, float> bets;
        private float runDistance;


        public Horse() { }

        public Horse(string name, float speed, Dictionary<string, float> bets, float runDistance)
        {
            this.name = name;
            this.speed = speed;
            this.bets = bets;
            this.runDistance = runDistance;
        }

        public override string ToString()
        {
            return $"name: {name} speed: {speed} bets: {bets.Keys.Count} runDistance: {runDistance}";
        }

        [JsonPropertyName("name")]
        public string Name
        {
            get { return name ; }
            set { name = value ; }
        }

        [JsonPropertyName("speed")]
        public float Speed
        {
            get { return speed ; }
            set { speed = value ; }
        }

        [JsonPropertyName("bets")]
        public Dictionary<string, float> Bets
        {
            get { return bets; }
            set { bets = value; }
        }

        [JsonPropertyName("runDistance")]
        public float RunDistance
        {
            get { return runDistance ; }
            set { runDistance = value ; }
        }
    }
}
