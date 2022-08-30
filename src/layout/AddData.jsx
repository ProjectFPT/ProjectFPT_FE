import React, { Component } from "react";
import GetKpi from "../Component/GetKpi";
import ImportData from "../Component/ImportData";
import Chart from "../Component/Chart";
import "../css/bootstrap.css";
import { connect } from "react-redux";
import DataTableKpi from "../Component/DataTableKpi";
import ImportName from "../Component/ImportName";
import { Button } from "react-bootstrap";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {createPost} from "../api/index"

function mapStateToProps(state) {
  return {
    checkRender: state.ScoreReducer.checkRender,
    checkSubmitName: state.NameTable.checksubmitForm,
    nameData: state.NameTable.formValues,
    scoreData: state.ScoreReducer.score,
  };
}


class AddDatata extends Component {
  refreshPage = () => {
    window.location.reload();
  };

  UploadData() {
    const dataSend = {};
    dataSend.name = this.props.nameData.name;
    dataSend.score = this.props.scoreData;
    createPost(JSON.stringify(dataSend));
    return (
      <Popup open={this.props.checkSubmitName} position="right center">
        {/* <div className="modal"> */}
        <div
          className="header"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3 style={{ color: "black" }}>Data is upload</h3>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={this.refreshPage}
            variant="secondary"
            size="lg"
            className="btn btn-secondary align-center col"
            style={{
              borderColor: "#f46f20",
              backgroundColor: "#e9ecef",
              color: "black",
              margin: "20px"
            }}
          >
            Click to add another data
          </Button>
          <Button
            href="/Compare"
            variant="secondary"
            size="lg"
            className="btn btn-secondary align-center col"
            style={{
              borderColor: "#f46f20",
              backgroundColor: "#e9ecef",
              color: "black",
              margin: "20px"
            }}
          >
            Click to compare data 
          </Button>
        </div>
        {/* </div> */}
      </Popup>
    );
  }

  renderChart() {
    return (
      <div className="container py-12">
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <h3>Type name and click button to submit</h3>
            <ImportName></ImportName>
          </div>
        </div>
        <div className="row">
          <p></p>
        </div>
        <div className="row">
          <div className="col">
            <Chart />
          </div>
          <div className="col">
            <DataTableKpi />
          </div>
        </div>
        {this.props.checkSubmitName ? this.UploadData() : null}
      </div>
    );
  }

  render() {
    this.props.dispatch({
      type: "POSTSTATUS",
      activeAdd: true,
      activeCompare: false,
    });
    return (
      <div className="container">
        {this.props.checkRender ? (
          this.renderChart()
        ) : (
          <div>
            <h3>Import device </h3>
            <div className="row">
              <ImportData></ImportData>
            </div>
            <div className="row">
              <div className="col">
                <GetKpi></GetKpi>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(AddDatata);
