using System;
using System.Collections.Generic;

namespace TrivialGame.Models.TrivialGameSystemContextModels
{
    public partial class Attempt
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int QuestionId { get; set; }
        public DateTime Time { get; set; }
        public int Correct { get; set; }

        public Question Question { get; set; }
        public AspNetUsers User { get; set; }
    }
}
