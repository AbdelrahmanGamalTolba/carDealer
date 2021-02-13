using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WevAPI.Model
{
    public class Car
    {
        public int id { get; set; }
        public string Brand { get; set; }
        [Required]
        public string Label { get; set; }
        public DateTime LastupdateOn { get; set; }
        public int LastUpdateBy { get; set; }
    }
}
