import React from "react";
import { connect } from "react-redux";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../css/radarStyle.css";

function mapStateToProps(state) {
  return {
    DataName: state.GetDataCompare.name,
    DataScore: state.GetDataCompare.score,
  };
}

function customTick({ payload, x, y, textAnchor, stroke, radius }) {
  return (
    <g className="recharts-layer recharts-polar-angle-axis-tick">
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

const ChartCompare = (props) => {
  const score = props.DataScore;
  const s1 = [];
  const s2 = [];
  const s3 = [];
  const s4 = [];
  const s5 = [];
  let data = [];
  for (let i = 0; i < props.DataName.length; i++) {
    s1.push(score[i]["RF Capability"]);
    s2.push(score[i]["Baseline Performance"]);
    s3.push(score[i]["Coverage"]);
    s4.push(score[i]["Multiple STA Performance"]);
    s5.push(score[i]["Stability & Robustness"]);
  }
  const nameElement = props.DataName;
  data = [
    { name: "RFC" },
    {
      name: "BP",
    },
    { name: "Coverage" },
    {
      name: "MSTAP",
    },
    {
      name: "S&R",
    },
  ];
  const color = ["red", "blue", "yellow", "green", "orange", "#209e70"];
  for (let i = 0; i < props.DataName.length; i++) {
    data[0][nameElement[i].toString()] = s1[i];
    data[1][nameElement[i].toString()] = s2[i];
    data[2][nameElement[i].toString()] = s3[i];
    data[3][nameElement[i].toString()] = s4[i];
    data[4][nameElement[i].toString()] = s5[i];
  }

  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius={150}
        data={data}
        width={"100vw"}
        height={"100vh"}
        className="chartRadarCompare"
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="name" tick={customTick} />
        <PolarRadiusAxis angle={70} />
        {nameElement.map((data, idx) => {
          return (
            <Radar
              dataKey={nameElement[idx].toString()}
              name={nameElement[idx]}
              stroke={color[idx]}
              strokeWidth={1.8}
              fill="white"
              fillOpacity={0.08}
              scaleToFit="true"
            ></Radar>
          );
        })}
        <Tooltip
          labelStyle={{ color: "black" }}
          position ={{y:-90}}
          wrapperStyle={{ backgroundColor: "grey", opacity:"1"}}
        />
        <Legend align="center" />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default connect(mapStateToProps, null)(ChartCompare);
