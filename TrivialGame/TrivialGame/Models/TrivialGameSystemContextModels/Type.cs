using System;
using System.Collections.Generic;

namespace TrivialGame.Models.TrivialGameSystemContextModels
{
    public partial class Type
    {
        public Type()
        {
            Question = new HashSet<Question>();
        }

        public int Qtype { get; set; }
        public string QtypeName { get; set; }

        public ICollection<Question> Question { get; set; }
    }
}
