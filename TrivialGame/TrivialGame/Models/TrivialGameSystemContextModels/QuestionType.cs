using System;
using System.Collections.Generic;

namespace TrivialGame.Models.TrivialGameSystemContextModels
{
    public partial class QuestionType
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public int QuestionTypeId { get; set; }
    }
}
