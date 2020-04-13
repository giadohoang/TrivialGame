using System;
using System.Collections.Generic;

namespace TrivialGame.Models.TrivialGameSystemContextModels
{
    public partial class Type
    {
        public int Id { get; set; }
        public int? Qtype { get; set; }
        public string QtypeName { get; set; }
    }
}
