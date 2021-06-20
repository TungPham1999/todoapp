import React from "react";
import getNewDate from "./../utils/function";
import "./TodoForm.css";

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.editItem && props.editItem.id ? props.editItem.title : "",
      date:
        props.editItem && props.editItem.id
          ? props.editItem.date
          : getNewDate(),
      description:
        props.editItem && props.editItem.id ? props.editItem.description : "",
      typePiority:
        props.editItem && props.editItem.id
          ? props.editItem.typePiority
          : "Normal",
      piorities: ["Normal", "Low", "High"],
      minDate: getNewDate(),
      errors: "",
    };
  }
  handleChange = (field, e) => {
    this.setState({ [field]: e.target.value });
    if (this.props.editItem) {
      this.props.updateTodoByKeyUp({
        id: this.props.editItem
          ? this.props.editItem.id
          : Math.floor(Math.random() * 10000),
        title: this.state.title,
        date: this.state.date,
        typePiority: this.state.typePiority,
        description: this.state.description,
        isChecked: this.props.editItem ? this.props.editItem.isChecked : false,
        isUpdate: false,
      });
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.title && this.state.title.trim() !== "") {
      this.props.handleAction({
        id: this.props.editItem
          ? this.props.editItem.id
          : Math.floor(Math.random() * 10000),
        title: this.state.title,
        date: this.state.date,
        typePiority: this.state.typePiority,
        description: this.state.description,
        isChecked: this.props.editItem ? this.props.editItem.isChecked : false,
        isUpdate: false,
      });
      if (!this.props.editItem) {
        this.resetState();
      }
    } else {
      this.setState({
        errors: "Title required",
      });
    }
  };
  resetState = () => {
    this.setState({
      title: "",
      date: getNewDate(),
      description: "",
      typePiority: "Normal",
      piorities: ["Normal", "Low", "High"],
      minDate: getNewDate(),
      errors: "",
    });
  };
  render() {
    return (
      <div
        className={
          this.props.editItem && this.props.editItem.id
            ? "todo-form-update"
            : "todo-form-create"
        }
      >
        {!this.props.editItem && <h1>New Task</h1>}
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Add new task ..."
              value={this.state.title}
              name="title"
              className="input-add"
              onChange={this.handleChange.bind(this, "title")}
              onKeyUp={this.handleChange.bind(this, "title")}
            ></input>
            <div
              style={{
                color: "red",
                fontSize: "12px",
                textAlign: "start",
                height: "0px",
              }}
            >
              {this.state.errors}
            </div>
          </div>
          <div>
            <h4 className="form-lable">Description</h4>
            <textarea
              className="form-textarea"
              rows="7"
              value={this.state.description}
              name="description"
              onChange={this.handleChange.bind(this, "description")}
              onKeyUp={this.handleChange.bind(this, "description")}
            ></textarea>
          </div>
          <div className="form-group">
            <div className="date">
              <h4 className="form-lable">Due Date</h4>
              <input
                value={this.state.date}
                type="date"
                name="date"
                className="date-input"
                min={this.state.minDate}
                onChange={this.handleChange.bind(this, "date")}
                onKeyUp={this.handleChange.bind(this, "date")}
              ></input>
            </div>
            <div className="piority">
              <h4 className="form-lable">Piority</h4>
              <select
                className="select-input"
                value={this.state.typePiority}
                onChange={this.handleChange.bind(this, "typePiority")}
                onKeyUp={this.handleChange.bind(this, "typePiority")}
              >
                {this.state.piorities.map((item, index) => (
                  <option key={index} value={index}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-button">
            {this.props.editItem && this.props.editItem.id ? (
              <button onClick={this.handleSubmit}>Update</button>
            ) : (
              <button onClick={this.handleSubmit}>Add</button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default TodoForm;
