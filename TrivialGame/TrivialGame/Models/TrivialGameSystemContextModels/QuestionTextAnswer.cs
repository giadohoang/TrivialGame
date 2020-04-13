using System;
using System.Collections.Generic;

namespace TrivialGame.Models.TrivialGameSystemContextModels
{
    public partial class QuestionTextAnswer
    {
        public int Id { get; set; }
        public int? QuestionId { get; set; }
        public string QuestionValue { get; set; }

        public Question Question { get; set; }
    }
}
