using System;
using System.Collections.Generic;

namespace TrivialGame.Models.TrivialGameSystemContextModels
{
    public partial class Score
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int Score1 { get; set; }

        public AspNetUsers User { get; set; }
    }
}
