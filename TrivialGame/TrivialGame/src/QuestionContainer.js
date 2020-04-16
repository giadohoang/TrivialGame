import React, { Component } from "react";
import ReactTable from "react-table";
class QuestionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { questions: [] };
    this.getQuestion = this.getQuestion.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getQuestion();
    this.getTagLists();
  }
  //renderQuestionInput
  getQuestion() {
    $.ajax({
      url: "/QuestionInput/GetQuestions",
      dataType: "json",
      type: "GET",

      //data: data,
      success: (result) => {
        console.log("Done: ", result);
        this.setState({
          questions: result,
        });
      },

      error: function (e) {
        console.log("Error: ", e);
        alert("error");
      },
    });
  }

  renderQuestionTable() {
    return <div>Hello</div>;
  }

  render() {
    console.log("Rendering QuestionContainer: ", this.state);
    return <div>{this.renderQuestionTable()}</div>;
  }
}
const containerElement = document.getElementById("QuestionContainer");
ReactDOM.render(<QuestionContainer />, containerElement);
