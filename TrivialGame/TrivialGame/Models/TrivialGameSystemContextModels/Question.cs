using System;
using System.Collections.Generic;

namespace TrivialGame.Models.TrivialGameSystemContextModels
{
    public partial class Question
    {
        public Question()
        {
            Attempt = new HashSet<Attempt>();
            QuestionMcanswer = new HashSet<QuestionMcanswer>();
            QuestionTag = new HashSet<QuestionTag>();
            QuestionTextAnswer = new HashSet<QuestionTextAnswer>();
        }

        public int Id { get; set; }
        public int? QuestionType { get; set; }
        public string UserId { get; set; }

        public AspNetUsers User { get; set; }
        public ICollection<Attempt> Attempt { get; set; }
        public ICollection<QuestionMcanswer> QuestionMcanswer { get; set; }
        public ICollection<QuestionTag> QuestionTag { get; set; }
        public ICollection<QuestionTextAnswer> QuestionTextAnswer { get; set; }
    }
}
