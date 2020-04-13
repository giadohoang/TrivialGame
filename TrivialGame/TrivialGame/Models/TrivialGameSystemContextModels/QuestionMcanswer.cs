using System;
using System.Collections.Generic;

namespace TrivialGame.Models.TrivialGameSystemContextModels
{
    public partial class QuestionMcanswer
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string Options { get; set; }
        public int Correct { get; set; }

        public Question Question { get; set; }
    }
}
