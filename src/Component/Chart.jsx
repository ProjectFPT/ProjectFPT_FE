import React from "react";
import { connect } from "react-redux";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
} from "recharts";

function mapStateToProps(state) {
  return {
    DataScore: state.ScoreReducer.score,
    DataName: state.NameTable.formValues.name,
  };
}

function customTick({ payload, x, y,textAnchor, stroke, radius }) {
  return (
    <g
      className="recharts-layer recharts-polar-angle-axis-tick"
    >
      <text
        radius={radius}
        stroke={stroke}
        x={x}
        y={y}
        className="recharts-text recharts-polar-angle-axis-tick-value"
        textAnchor={textAnchor}
        fill="white"
      >
        <tspan x={x} dy="0em">
          {payload.value}
        </tspan>
      </text>
    </g>
  );
}

const Chart = (props) => {
  const data = [
    { name: "RFC", x: props.DataScore["RF Capability"] },
    {
      name: "BP",
      x: props.DataScore["Baseline Performance"],
    },
    { name: "Coverage", x: props.DataScore["Coverage"] },
    {
      name: "MSTAP",
      x: props.DataScore["Multiple STA Performance"],
    },
    {
      name: "S&R",
      x: props.DataScore["Stability & Robustness"],
    },
  ];
  const nameElement = props.DataName;

  return (
    <RadarChart
      cx={300}
      cy={200}
      outerRadius={150}
      width={500}
      height={380}
      data={data}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="name" tick={customTick} />
      <PolarRadiusAxis angle={70}/>
      <Radar
        dataKey="x"
        name={nameElement}
        stroke="red"
        fill="grey"
        fillOpacity={0.6}
        scaleToFit="true"
        strokeWidth={1.8}
      ></Radar>
      <Legend />
    </RadarChart>
  );
};
export default connect(mapStateToProps, null)(Chart);
