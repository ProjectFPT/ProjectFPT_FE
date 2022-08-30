import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { connect } from "react-redux";
import "../css/lineStyle.css";

function mapStateToProps(state) {
  return {
    DataName: state.GetDataCompare.name,
    DataScore: state.GetDataCompare.score,
  };
}
function getData(DataName, DataScore) {
  const nameElement = DataName;
  const score = DataScore;
  const data = [];

  for (let i = 0; i < nameElement.length; i++) {
    data[i] = {
      name: nameElement[i],
      "RF Capability": score[i]["RF Capability"],
      "Baseline Performance": score[i]["Baseline Performance"],
      Coverage: score[i]["Coverage"],
      "Multiple STA Performance": score[i]["Multiple STA Performance"],
      "Stability & Robustness": score[i]["Stability & Robustness"],
    };
  }
  return data;
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={10}
          textAnchor="start"
          fill="white"
          transform="rotate(90)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

class CustomizedYAxisTick extends PureComponent {
  render() {
    const { x, y, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text fill="white" textAnchor="end">
          {payload.value}
        </text>
      </g>
    );
  }
}

class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width={"100%"} height={500}>
        <LineChart
          width={"100vw"}
          height={"100vh"}
          data={getData(this.props.DataName, this.props.DataScore)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            className="xAxixStyle"
            dataKey="name"
            interval={0}
            height={150}
            scale="point"
            tick={<CustomizedAxisTick />}
          />
          <YAxis tick={<CustomizedYAxisTick />} />
          <Tooltip dataKey="name" labelStyle={{ color: "black" }} />
          <Legend />
          <Line type="monotone" dataKey="RF Capability" stroke="red"  strokeWidth={1.8}/>
          <Line type="monotone" dataKey="Baseline Performance" stroke="blue"  strokeWidth={1.8}/>
          <Line type="monotone" dataKey="Coverage" stroke="green"  strokeWidth={1.8}/>
          <Line
            type="monotone"
            dataKey="Multiple STA Performance"
            stroke="yellow"
            strokeWidth={1.8}
          />
          <Line
            type="monotone"
            dataKey="Stability & Robustness"
            stroke="orange"
            strokeWidth={1.8}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default connect(mapStateToProps, null)(Example);
