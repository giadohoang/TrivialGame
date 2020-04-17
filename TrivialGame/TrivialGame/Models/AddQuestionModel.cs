using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrivialGame.Models
{
    public partial class AddQuestionModel
    {
        public int selectedQType { get; set; }

        public AddQuestion qObj { get; set; }

        public ICollection<AddMultipleChoice> mcList { get; set; }

        public ICollection<SelectedTag> selectedTagList { get; set; }

    }

    public class SelectedTag
    {
        public int value { get; set; }
        public string label { get; set; }
    }

    public class AddMultipleChoice
    {
        public int option { get; set; }

        public string value { get; set; }

        public bool answer { get; set; }

    }

    public class AddQuestion
    {
        public string qText { get; set; }

        public string qAns { get; set; }
    }
}
