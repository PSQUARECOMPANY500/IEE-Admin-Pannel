import React, { useEffect, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

const data = [
  { name: "1", value: 800 ,fill: "#F8AC1D" },
  { name: "2", value: 500 ,fill: "#F8AC1D"},
  { name: "3", value: 500 ,fill: "#F8AC1D"},
  { name: "4", value: 500 ,fill: "#F8AC1D"},
];





const renderActiveShape = (props) => {
  
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";
  console.log(value)
  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={"#444444"}
        style={{ fontSize: "40px", fontWeight: "700" }}
      >
        {"1"}/{data.length}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
        style={{ display: "none" }}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
        style={{ display: "none" }}
      />
      <circle
        cx={ex}
        cy={ey}
        r={2}
        fill={fill}
        stroke="none"
        style={{ display: "none" }}
      />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        style={{ display: "none" }}
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
        style={{ display: "none" }}
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const TaskChart = ({item}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [chartdata,setChartData] = useState("")
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  useEffect(()=>{
    setChartData(item)
  },[item])
console.log(chartdata)
  return (
    // <ResponsiveContainer >
      <PieChart width={160} height={118}>
      {/* width={400} height={400} */}
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#fff"
          dataKey="value"
          onMouseEnter={onPieEnter}
          startAngle={90} // Adjust the start angle (90 degrees for the top position)
          endAngle={-270} // Adjust the end angle (-270 degrees for one complete clockwise rotation)
          clockwise={true}
          legendType='circle'
        />
      </PieChart>
    // </ResponsiveContainer>
  );
};

export default TaskChart;
