import React, { Component } from "react";
import ReactTable from "react-table-v6";
import AddQuestionModal from "./AddQuestionModal";
import { Modal } from "react-bootstrap";
class QuestionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      tagList: [],
      typeList: [],
      isOpen: false,
      isLoading: true,
    };
    this.getQuestion = this.getQuestion.bind(this);
    this.getTagLists = this.getTagLists.bind(this);
    this.getTypeLists = this.getTypeLists.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getQuestion();
    this.getTagLists();
    this.getTypeLists();
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
  getTagLists() {
    $.ajax({
      url: "/QuestionInput/GetTags",
      dataType: "json",
      type: "GET",
      success: (result) => {
        console.log("Done: ", result);
        this.setState({
          tagList: result,
        });
      },
      error: function (e) {
        console.log("Error: ", e);
        alert("error");
      },
    });
  }

  getTypeLists() {
    $.ajax({
      url: "/QuestionInput/GetTypes",
      dataType: "json",
      type: "GET",
      success: (result) => {
        console.log("Done: ", result);
        this.setState({
          typeList: result,
        });
      },
      error: function (e) {
        console.log("Error: ", e);
        alert("error");
      },
    });
  }
  toggleModal() {
    console.log("toggleModal....");
    this.setState((prevState, props) => {
      return { isOpen: !prevState.isOpen };
    });
  }

  closeModal() {
    this.setState((prevState, props) => {
      return { isOpen: !prevState.isOpen };
    });
  }
  renderQuestionTable() {
    const columns = [
      {
        Header: "Question",
        accessor: "qText",
        filterMethod: (filter, row) => {
          return row[filter.id].includes(filter.value);
        },
      },
      {
        Header: "Answer",
        accessor: "qAns",
        filterMethod: (filter, row) => {
          return row[filter.id].includes(filter.value);
        },
      },
      {
        Header: "Question Type",
        accessor: "qType",
        filterMethod: (filter, row) => {
          return row[filter.id].includes(filter.value);
        },
      },
    ];
    return (
      <div>
        <ReactTable
          data={this.state.questions}
          columns={columns}
          pageSize={10}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
        ></ReactTable>
      </div>
    );
  }

  headerTab() {
    return (
      <div>
        <h1>Personal Questions Library</h1>
        <button
          className="btn-success btn-sm"
          variant="outline-success"
          onClick={this.toggleModal}
        >
          Add Question
        </button>
      </div>
    );
  }
  addQuestionModal() {
    var modal = "";
    modal = (
      <AddQuestionModal
        isOpen={this.state.isOpen}
        closeModal={this.closeModal}
        tagList={this.state.tagList}
        typeList={this.state.typeList}
      />
    );
    return modal;
  }
  render() {
    console.log("Rendering QuestionContainer: ", this.state);
    return (
      <div>
        {this.headerTab()}
        {this.renderQuestionTable()}
        {this.addQuestionModal()}
      </div>
    );
  }
}
//const containerElement = document.getElementById("QuestionContainer");
//ReactDOM.render(<QuestionContainer />, containerElement);

export default QuestionContainer;
