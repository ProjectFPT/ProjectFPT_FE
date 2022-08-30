import React, { Component } from "react";
import SearchBar from "../Component/SearchBar";
import { connect } from "react-redux";
import { fetchPosts } from "../api/index";
import ChartCompare from "../Component/ChartCompare.jsx";
import TableCompare from "../Component/TableCompare";
import "../css/comparePage.css";
import Example from "../Component/LineCompare";

function mapStateToProps(state) {
  return {
    Dataname: state.GetNameReducer.Dataname,
    checksubmit: state.GetNameReducer.checksubmit,
  };
}

class CompareData extends Component {
  constructor(props) {
    super(props);
    this.state = { chartName: true };
  }

  getScore = async () => {
    const res = await fetchPosts();
    const list = [];
    const name = this.props.Dataname;
    const nameList = [];
    for (let count = 0; count < name.length; count++)
      for (const element of res.data) {
        if (element.name === name[count]) {
          list.push(element.score);
          nameList.push(name[count]);
          break;
        }
      }

    this.props.dispatch({
      type: "GETDATACOMPARE",
      name: nameList,
      score: list,
    });
  };

  getChart = () => {
    return (
      <div className="row">{this.state.chartName ? <ChartCompare /> : <Example></Example>}</div>
    );
  };

  renderCompareData = () => {
    this.getScore();
    return (
      <div className="container">
        <div className="col">
          {this.state.chartName ? (
            <div className="row">
              <button
                className="btn btn-outline-dark col active"
                onClick={() => {
                  this.setState({ chartName: true });
                }}
              >
                Radar Chart
              </button>
              <button
                className="btn btn-outline-dark col"
                onClick={() => {
                  this.setState({ chartName: false });
                }}
              >
                Line Chart
              </button>{" "}
            </div>
          ) : (
            <div className="row">
              {" "}
              <button
                className="btn btn-outline-dark col"
                onClick={() => {
                  this.setState({ chartName: true });
                }}
              >
                Radar Chart
              </button>
              <button
                className="btn btn-outline-dark col active"
                onClick={() => {
                  this.setState({ chartName: false });
                }}
              >
                Line Chart
              </button>{" "}
            </div>
          )}

          <p></p>
          {this.getChart()}
        <div className="row">
          <TableCompare className="talbe_compare"></TableCompare>
        </div>
      </div>
      </div>
    );
  };

  render() {
    this.props.dispatch({
      type: "POSTSTATUS",
      activeAdd: false,
      activeCompare: true,
    });
    return (
      <div className="container">
        {this.props.checksubmit ? (
          this.renderCompareData()
        ) : (
          <SearchBar></SearchBar>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(CompareData);
