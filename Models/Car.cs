using System.Text.Json;

namespace my_new_app.Models
{
    public class Car
    {
        public string Year { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public string Guid { get; set; }

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}