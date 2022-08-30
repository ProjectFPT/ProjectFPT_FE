import React, { Component } from "react";
import { ReactMultiSearchSelect } from "react-multi-search-select";
import "../css/selectBar.css";
import { fetchPosts } from "../api/index";
import { connect } from "react-redux";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Dataname: [],
      DataSelected: [],
      checkGetData: true,
    };
  }

  handleChange = async (selectedOptions) => {
    // console.log(selectedOptions);
    if (this.state.checkGetData) {
      const res = await fetchPosts();
      const list = [];
      for (const element of res.data) {
        list.push(element.name);
      }
      this.setState({ Dataname: list, checkGetData: false });
    } else this.setState({ DataSelected: selectedOptions });
  };

  renderData = () => {
    // console.log(this.state.DataSelected);
    if(this.state.DataSelected.length !== 0){
    this.props.dispatch({
      type: "GETDATANAME",
      checksubmit: true,
      dataNameGet: this.state.DataSelected,
    });}
    else alert("Please add device");
  };

  render() {
    return (
      <div className="container-fluid text-center">
        <h3>Add device to compare</h3>
        <ReactMultiSearchSelect
          options={this.state.Dataname}
          onChange={this.handleChange}
          selectionLimit={6}
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
        <br />
        <button
          type="button"
          className="btn btn-secondary btn-lg col-4"
          style={{
            borderColor: "#f46f20",
            backgroundColor: "#e9ecef",
            color: "black",
          }}
          onClick={this.renderData}
        >
          Render
        </button>
      </div>
    );
  }
}
export default connect(null)(SearchBar);
