import React from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import "../css/tableStyle.css"

function mapStateToProps(state) {
  return {
    DataName: state.GetDataCompare.name,
    DataScore: state.GetDataCompare.score,
  };
}

const TableCompare = (props) => {
  const column = [
    "RF Capability",
    "Baseline Performance",
    "Coverage",
    "Multiple STA Performance",
    "Stability & Robustness",
  ];
  const column2 = [" (RFC)", " (BP)", "", " (MSTAP)", " (S&R)"];
  const data = props.DataScore;
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
        {Array.from({ length: name.length }).map((_, indexN) => (
          <tr>
            <td>{name[indexN]}</td>
            {Array.from({ length: 5 }).map((_, index) => (
              <td key={index}>{data[indexN][column[index]]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export default connect(mapStateToProps, null)(TableCompare);
