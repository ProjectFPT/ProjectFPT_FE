import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    DataTable: state.InfoTable.table,
    DataColums: state.InfoTable.columns,
    DataScore: state.ScoreReducer.score,
    CheckAddCSV: state.InfoTable.addCSV,
  };
}

function Receiver_Sensitivity_Test(temp) {
  const tempArray = temp.split(" ");
  const x = [];
  let check = false;
  for (const element of tempArray) {
    if (check) {
      check = false;
      x.push(Number(element.split("/")[0]));
    }
    if (element === "passed" || element === "Passed") check = true;
  }
  return x[0] + x[1];
}

function Maximum_Connection_Test(temp) {
  const tempArray = temp.split(" ");
  let x;
  let check = false;
  for (const element of tempArray) {
    if (check) {
      check = false;
      x = Number(element.split("/")[0]);
      break;
    }
    if (element === "PER:") check = true;
  }
  return x;
}

function Maximum_TCP_Throughput_Test(temp) {
  const tempArray = temp.split(" ");
  let count = 0;
  let check = false;
  let x;
  for (const element of tempArray) {
    if (check) {
      check = false;
      x = Number(element.split("%")[0]);
      if (x > 100) count++;
    }
    if (element === "UL" || element === "DL") check = true;
  }
  return count;
}

function Range_Versus_Rate_Test(temp) {
  const tempArray = temp.split(" ");
  const x = [];
  let check = false;
  for (const element of tempArray) {
    if (check) {
      check = false;
      x.push(Number(element.split("/")[0]));
    }
    if (element === "UL" || element === "DL") check = true;
  }
  return x[0] + x[1] + x[2] + x[3];
}

function Downlink_MU_MIMO_Performance_Test(temp) {
  const tempArray = temp.split(" ");
  let x;
  let check = false;
  for (const element of tempArray) {
    if (check) {
      check = false;
      x = Number(element.split("/")[0]);
      break;
    }
    if (element === "passed" || element === "Passed" || element === "Passed:")
      check = true;
  }
  return x;
}

function Long_Term_Stability_Test(temp) {
  const tempArray = temp.split(" ");
  const x = [];
  let check = false;
  for (const element of tempArray) {
    if (check) {
      check = false;
      x.push(Number(element.split("/")[0]));
    }
    if (element === "passed" || element === "Passed" || element === "Passed:")
      check = true;
  }
  return x[0] + x[1] + x[2] + x[3];
}

class GetKpi extends Component {
  getPass = (results, columns) => {
    let description_col = 0;
    let detail_col = 0;
    //find keys "short-description"
    for (let i = 0; i < columns.length; i++)
      if (columns[i] === "short-description") {
        description_col = i;
        break;
      }
    //find keys "test-details"
    for (let i = 0; i < columns.length; i++)
      if (columns[i] === "test details") {
        detail_col = i;
        break;
      }
    const passed = [];
    for (const element of results) {
      let temp = element[description_col];
      switch (temp) {
        case "6.1.1 Receiver Sensitivity Test":
          passed["Receiver_Sensitivity_Test"] = Receiver_Sensitivity_Test(
            element[detail_col]
          );
          break;
        case "6.2.1 Maximum Connection Test (32-STA)":
          passed["Maximum_Connection_Test"] = Maximum_Connection_Test(
            element[detail_col]
          );
          break;
        case "6.2.2 Maximum TCP Throughput Test":
          passed["Maximum_TCP_Throughput_Test"] = Maximum_TCP_Throughput_Test(
            element[detail_col]
          );
          break;
        case "6.2.3 Airtime Fairness Test":
          passed["Airtime_Fairness_Test"] = Receiver_Sensitivity_Test(
            element[detail_col]
          );
          break;
        case "6.3.1 Range Versus Rate Test":
          passed["Range_Versus_Rate_Test"] = Range_Versus_Rate_Test(
            element[detail_col]
          );
          break;
        case "6.3.2 Spatial Consistency Test":
          passed["Spatial_Consistency_Test"] = Receiver_Sensitivity_Test(
            element[detail_col]
          );
          break;
        case "6.4.1 Multiple STAs Performance Test":
          passed["Multiple_STAs_Performance_Test"] = Receiver_Sensitivity_Test(
            element[detail_col]
          );
          break;
        case "6.4.2 Multiple Association /<br>Disassociation Stability Test":
          passed["Multiple_Association_/<br>Disassociation_Stability_Test"] =
            Receiver_Sensitivity_Test(element[detail_col]);
          break;
        case "6.4.3 Downlink MU-MIMO Performance Test":
          passed["Downlink_MU_MIMO_Performance_Test"] =
            Downlink_MU_MIMO_Performance_Test(element[detail_col]);
          break;
        case "6.5.2 AP Coexistence Test":
          passed["AP_Coexistence_Test"] = Downlink_MU_MIMO_Performance_Test(
            element[detail_col]
          );
          break;
        case "6.5.1 Long Term Stability Test":
          passed["Long_Term_Stability_Test"] = Long_Term_Stability_Test(
            element[detail_col]
          );
          break;
        default:
        // code block
      }
    }
    return passed;
  };

  getScore = () => {
    if (this.props.CheckAddCSV) {
      const score = {};
      const passed = this.getPass(this.props.DataTable, this.props.DataColums);
      score["RF Capability"] = Math.ceil(
        (passed["Receiver_Sensitivity_Test"] / 32) * 100
      );
      if(isNaN(score["RF Capability"])) score["RF Capability"] = 0;
      score["Baseline Performance"] = Math.ceil(
        ((passed["Maximum_Connection_Test"] / 128 +
          passed["Maximum_TCP_Throughput_Test"] / 4 +
          passed["Airtime_Fairness_Test"] / 14) /
          3) *
          100
      );
      if(isNaN(score["Baseline Performance"])) score["Baseline Performance"] = 0;
      score["Coverage"] = Math.ceil(
        ((passed["Range_Versus_Rate_Test"] / (34 + 26) +
          passed["Spatial_Consistency_Test"] / 24) /
          2) *
          100
      );
      if(isNaN(score["Coverage"])) score["Coverage"] = 0;
      score["Multiple STA Performance"] = Math.ceil(
        ((passed["Multiple_STAs_Performance_Test"] / 12 +
          passed["Multiple_Association_/<br>Disassociation_Stability_Test"] /
            1920 +
          passed["Downlink_MU_MIMO_Performance_Test"] / 3) /
          3) *
          100
      );
      if(isNaN(score["Multiple STA Performance"])) score["Multiple STA Performance"] = 0;
      score["Stability & Robustness"] = Math.ceil(
        ((passed["Long_Term_Stability_Test"] / 206 +
          passed["AP_Coexistence_Test"] / 8) /
          2) *
          100
      );
      if(isNaN(score["Stability & Robustness"])) score["Stability & Robustness"] = 0;
      this.postDataScore(score);
    } else alert("CSV is not added");
  };

  postDataScore = (scoreHandle) => {
    this.props.dispatch({
      type: "POSTDATASCORE",
      dataScore: scoreHandle,
      checkRender: true,
    });
  };

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={this.getScore}
          className="btn btn-secondary btn-lg"
          style={{ borderColor: "#f46f20",backgroundColor:"#e9ecef",color:"black"}}
        >
          Click to render
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(GetKpi);
