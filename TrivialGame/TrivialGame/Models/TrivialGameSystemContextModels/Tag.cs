using System;
using System.Collections.Generic;

namespace TrivialGame.Models.TrivialGameSystemContextModels
{
    public partial class Tag
    {
        public Tag()
        {
            QuestionTag = new HashSet<QuestionTag>();
        }

        public int Id { get; set; }
        public int? Qtag { get; set; }
        public string QtagName { get; set; }

        public ICollection<QuestionTag> QuestionTag { get; set; }
    }
}
