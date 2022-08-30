import React from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import "../css/tableStyle.css"

function mapStateToProps(state) {
  return {
    DataScore: state.ScoreReducer.score,
    DataName: state.NameTable.formValues.name,
  };
}

const DataTableKpi = (props) => {
  const column = [
    "RF Capability",
    "Baseline Performance",
    "Coverage",
    "Multiple STA Performance",
    "Stability & Robustness",
  ];
  const column2 = [
    " (RFC)"," (BP)",""," (MSTAP)"," (S&R)"
  ]
  const data = props.DataScore;
  // console.log(data);
  const name = props.DataName;
  return (
    <Table responsive className="text-light table-condensed">
      <thead>
        <tr>
          <th>Name</th>
          {Array.from({ length: 5 }).map((_, index) => (
            <th key={index}>{column[index] + column2[index]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{name}</td>
          {Array.from({ length: 5 }).map((_, index) => (
            <td key={index}>{data[column[index]]}</td>
          ))}
        </tr>
      </tbody>
    </Table>
  );
};
export default connect(mapStateToProps, null)(DataTableKpi);
