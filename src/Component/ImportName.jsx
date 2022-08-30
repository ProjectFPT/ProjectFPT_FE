import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/bootstrap.css"

class ImportName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        name: "",
      },
    };
  }


  submitForm = (e) => {
    e.preventDefault();
    this.props.dispatch({
      type: "SUBMIT_FORM",
      checksubmit: true,
    });
  };

  handleInputChange = (e) =>
    this.setState(
      {
        values: { ...this.state.values, [e.target.name]: e.target.value },
      },
      () =>
        this.props.dispatch({
          type: "SET_FORMVALUES",
          payload: this.state.values,
          checksubmit: false,
        })
    );

  render() {
    return (
      <div className="container row">
          <form onSubmit={this.submitForm}>
          <div className="col">
            <div className="input-group input-group-lg col">
              <input
                type="text"
                name="name"
                id="name"
                value={this.state.values.name}
                onChange={this.handleInputChange}
                title="Name"
                style={{
                  borderColor: "#f46f20",
                  backgroundColor: "#white",
                  color: "black",
                  // borderWidth: "medium",
                  // boxShadow:"10px 10px cornflowerblue",
                }}
                className="form-control"
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                required
              />
              <button
              type="submit"
              className="btn btn-secondary btn-lg col-4"
              style={{
                borderColor: "#f46f20",
                backgroundColor: "#e9ecef",
                color: "black",
              }}
            >
              Submit
            </button>
            </div>
            </div>
          </form>
        </div>
    );
  }
}

export default connect(null)(ImportName);
