using System;
using System.Collections.Generic;

namespace TrivialGame.Models.TrivialGameSystemContextModels
{
    public partial class QuestionTag
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public int TagId { get; set; }

        public Question Question { get; set; }
        public Tag Tag { get; set; }
    }
}
