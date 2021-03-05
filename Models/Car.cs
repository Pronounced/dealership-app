using System.Text.Json;

namespace my_new_app.Models
{
    public class Car
    {
        public string year { get; set; }
        public string make { get; set; }
        public string model { get; set; }
        public string guid { get; set; }

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}