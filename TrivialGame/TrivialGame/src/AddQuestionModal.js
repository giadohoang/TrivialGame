import Modal from "react-modal";
import React, { Component } from "react";
import Dropdown from "react-dropdown";
import Select from "react-select";
import "react-dropdown/style.css";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    height: "500px",
    width: "500px",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
  },
};

class AddQuestionModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qObj: {},
      mcList: [],
      typeList: [],
      selectedTagList: [],
      // newMcId: -1,
      selectedQType: 0,
      selectedQTypeObj: {},
      tfChoice: "",
      mcChoice: 0,
      answer: "",
    };
    this.initializeData = this.initializeData.bind(this);
    this.renderTableBody = this.renderTableBody.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearData = this.clearData.bind(this);
    this.onQTypeChange = this.onQTypeChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  componentDidMount() {
    this.initializeData();
  }

  initializeData() {
    var qObj = { qText: "", qAns: "" };
    var mcList = [
      { option: 1, value: "", answer: false },
      { option: 2, value: "", answer: false },
      { option: 3, value: "", answer: false },
      { option: 4, value: "", answer: false },
    ];
    this.setState((prevState, props) => {
      return { qObj: qObj, mcList: mcList };
    });
  }

  onQTypeChange(e) {
    console.log("onQTypeChange: ", e);
    var value = e.value;
    this.setState((prevState, props) => {
      return { selectedQType: value, selectedQTypeObj: e };
    });
  }

  handleOptionChange(e) {
    console.log("handleOptionChange: ", e);
    console.log("on target: ", e.target);
    //if changing option on True False
    if (e.target.name == "tfChoice") {
      var selected = e.target.value == "True";
      var qObj = Object.assign(this.state.qObj);
      qObj.qAns = selected;
      this.setState((prevState, props) => {
        return { tfChoice: selected, answer: selected, qObj };
      });
    }
    //user choose what question is right among multi choice
    else if (e.target.name == "mcChoice") {
      var selected = e.target.value;
      //find which option
      var op = e.target.id.split("-")[1];
      var ans = "";
      let mcList = [...this.state.mcList];
      mcList.forEach((item) => {
        if (item.option == op) {
          item.answer = true;
          ans = item.value;
        } else {
          item.answer = false;
        }
      });
      var qObj = Object.assign(this.state.qObj);
      qObj.qAns = ans;

      this.setState((prevState, props) => {
        return {
          mcChoice: op,
          mcList,
          qObj,
        };
      });
    }
  }

  handleTagChange(e) {
    console.log("handleTagChange ", e);
    var selectedTagList = [...e];
    this.setState((prevState, props) => {
      return { selectedTagList: selectedTagList };
    });
  }

  handleOnBlur(e) {
    console.log("handleOnBlur: ", e.target);
    console.log("handleOnBlur: ", e.target.value);
    //user add answer
    if (e.target.name == "mcOption") {
      //find which option
      var op = e.target.id.split("-")[1];
      let mcList = [...this.state.mcList];
      mcList.forEach((item) => {
        if (item.option == op) {
          item.value = e.target.value;
        }
      });
      this.setState({ mcList });
    }
    //user type in question
    else if (e.target.name == "qText") {
      var qObj = Object.assign(this.state.qObj);
      qObj.qText = e.target.value;
      this.setState(qObj);
    } else if ((e.target.name = "qAns")) {
      var qObj = Object.assign(this.state.qObj);
      qObj.qAns = e.target.value;
      this.setState(qObj);
    }
  }
  handleSubmit(e) {
    console.log("handleSubmit: ", e);
    var __RequestVerificationToken = document.getElementsByName(
      "__RequestVerificationToken"
    )[0].value;
    var data = {
      selectedQType: this.state.selectedQType,
      qObj: this.state.qObj,
      mcList: this.state.mcList,
      selectedTagList: this.state.selectedTagList,
    };
    var value = JSON.stringify({
      selectedQType: this.state.selectedQType,
      qObj: this.state.qObj,
      mcList: this.state.mcList,
      selectedTagList: this.state.selectedTagList,
    });
    console.log("Sedning data: ", value);
    $.ajax({
      url: "/QuestionInput/Create",
      // dataType: "application/json;charset=utf-8",
      method: "post",
      data: { __RequestVerificationToken, value },
      success: (question) => {
        alert("success saving question");
        console.log("Success: ");
        this.clearData();
        this.props.closeModal();
      },
      error: (e) => {
        alert("error saving question");
        console.log("Error: ", e);
      },
    });
  }

  clearData() {
    this.setState({
      qObj: {},
      mcList: [],
      typeList: [],
      selectedTagList: [],
      selectedQType: 0,
      selectedQTypeObj: {},
      tfChoice: true,
      mcChoice: 0,
      answer: "",
    });
  }
  renderTableBody() {
    var rows = [];
    this.state.mcList.forEach((item) => {
      rows.push(
        <tr id={item.option} key={item.option}>
          <td>{item.option}</td>
          <td>
            <input
              type="text"
              id={"input-" + item.option}
              name="mcOption"
              onBlur={this.handleOnBlur}
              defaultValue=""
            ></input>
          </td>
          <td>
            <input
              type="radio"
              name="mcChoice"
              id={"radio-" + item.option}
              value={0}
              checked={item.answer}
              onChange={this.handleOptionChange}
            />
          </td>
        </tr>
      );
    });
    return rows;
  }

  renderTags() {
    return (
      <Select
        name="tagSelect"
        options={this.props.tagList}
        isMulti
        closeMenuOnSelect={false}
        onChange={this.handleTagChange}
      />
    );
  }

  render() {
    console.log("Modal state: ", this.state);
    const options = this.state.typeList;

    return (
      <Modal
        style={customStyles}
        isOpen={this.props.isOpen}
        ariaHideApp={false}
      >
        <h2>Add New Question</h2>

        <div>
          <div className="form-group">
            <label
              htmlFor="qText"
              className="label"
              style={{ verticalAlign: "top" }}
            >
              Question:
            </label>
            <textarea
              id="qText"
              name="qText"
              type="text"
              placeholder="Enter question"
              defaultValue={this.state.qText}
              style={{ width: "450px" }}
              rows={4}
              onBlur={this.handleOnBlur}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="qType"
              className="label"
              style={{ verticalAlign: "top" }}
            >
              Question Type:
            </label>
            <Dropdown
              id="qType"
              name="qType"
              options={this.props.typeList}
              onChange={this.onQTypeChange}
              value={this.state.selectedQTypeObj}
              placeholder="Select an option"
              style={{ height: "40px" }}
            />
          </div>
          {/* If string question */}
          {this.state.selectedQType == 1 && (
            <div className="form-group">
              <label
                htmlFor="qText"
                className="label"
                style={{ verticalAlign: "top" }}
              >
                Answer:
              </label>
              <textarea
                id="qAns"
                name="qAns"
                type="text"
                placeholder="Enter answer"
                defaultValue={this.state.qAns}
                style={{ width: "450px" }}
                rows={1}
                onBlur={this.handleOnBlur}
              />
            </div>
          )}
          {/* If True/ False question */}
          {this.state.selectedQType == 2 && (
            <div className="form-group">
              <label
                htmlFor="qText"
                className="label"
                style={{ verticalAlign: "top" }}
              >
                Answer:
              </label>

              <div>
                <input
                  type="radio"
                  name="tfChoice"
                  value="True"
                  checked={this.state.tfChoice == true}
                  onChange={this.handleOptionChange}
                />
                True
                <input
                  type="radio"
                  name="tfChoice"
                  value="False"
                  checked={this.state.tfChoice == false}
                  onChange={this.handleOptionChange}
                />
                False
              </div>
            </div>
          )}
          {/* If multiple choice question */}
          {this.state.selectedQType == 3 && (
            <div className="form-group">
              <table className="table">
                <thead className="thead">
                  <tr>
                    <td>Option Number</td>
                    <td>Answer</td>
                    <td>Correct</td>
                  </tr>
                </thead>
                <tbody>{this.renderTableBody()}</tbody>
              </table>
            </div>
          )}
          {this.renderTags()}
          <button onClick={this.props.closeModal}>close</button>
          <button onClick={this.handleSubmit}>Add</button>
        </div>
      </Modal>
    );
  }
}

export default AddQuestionModal;
