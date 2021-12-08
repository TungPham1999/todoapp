import React from "react";

const STROKE = 1;

const LineChart = ({ data, height, width, precision, stroke }) => {
  // convert data chart with format [{x: indx, y: number}]
  let dataConvert = [];
  if (data.includes("[")) {
    dataConvert = formatDataChart(data.replace(/ /g, "[").replace(/ /g, "["));
  } else {
    dataConvert = formatDataChart(data);
  }
  const SIZE = width / 50;
  const maximumXFromData = Math.max(...dataConvert.map((e) => e.x));
  const maximumYFromData = Math.max(...dataConvert.map((e) => e.y));
  const digits =
    parseFloat(maximumYFromData.toString()).toFixed(precision).length + 1;

  const padding = (SIZE + digits) * 3;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const points = dataConvert
    .map((element) => {
      const x =
        maximumXFromData !== 0
          ? (element.x / maximumXFromData) * chartWidth + padding
          : 0;
      const y =
        maximumYFromData !== 0
          ? chartHeight - (element.y / maximumYFromData) * chartHeight + padding
          : 0;
      return `${x},${y}`;
    })
    .join(" ");
  const Axis = ({ points }) => (
    <polyline fill="none" stroke="#ccc" strokeWidth=".5" points={points} />
  );

  const XAxis = () => (
    <Axis
      points={`${padding},${height - padding} ${width - padding},${
        height - padding
      }`}
    />
  );

  const YAxis = () => (
    <Axis points={`${padding},${padding} ${padding},${height - padding}`} />
  );
  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <XAxis />
      <YAxis />
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth={STROKE}
        points={points}
      />
    </svg>
  );
};

LineChart.defaultProps = {
  height: 200,
  width: 500,
  precision: 2,
};

const formatDataChart = (data) => {
  return data.split(",").map((r, index) => ({
    x: index,
    y: r ? r : 0,
  }));
};
export default LineChart;
