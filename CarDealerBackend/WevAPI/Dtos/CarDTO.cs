using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WevAPI.Dtos
{
    public class CarDTO
    {
        public int id { get; set; }
        [Required(ErrorMessage ="Name is mandatory field")]
        [RegularExpression(".*[a-zA-Z]+.*",ErrorMessage ="Only numerics are not allowed")]
        public string Brand { get; set; }
        [Required]
        public string Label { get; set; }

    }
}
