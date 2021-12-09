import React from "react";
import BarChart from './../base/BarChart'
import LineChart from './../base/LineChart'

const Chart = ({ data, height, width, precision, stroke, type }) => {
  // convert data chart with format [{x: indx, y: number}]
  let dataConvert = ''
  if (data.includes("[")) {
    dataConvert = data.replace(/ /g, "[").replace(/ /g, "[");
  } else {
    dataConvert = data
  }
  let maximumXFromData = 0;
  let maximumYFromData = 0;
  let points = ''
  const SIZE = width / 50;
  const digits = parseFloat(maximumYFromData.toString()).toFixed(precision).length + 1;
  const padding = (SIZE + digits) * 3;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  if (type === 'line') {
    dataConvert = formatDataChartLine(dataConvert)
    maximumXFromData = Math.max(...dataConvert.map((e) => e.x));
    maximumYFromData = Math.max(...dataConvert.map((e) => e.y));
    points = dataConvert
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
  } else {
    dataConvert = formatDataChartBar(dataConvert)
    maximumYFromData = Array.isArray(dataConvert) ? Math.max(...dataConvert.map((e) => e)) : 0;
    points = ''
  }


  const Axis = ({ points }) => (
    <polyline fill="none" stroke="#ccc" strokeWidth=".5" points={points} />
  );

  const XAxis = () => (
    <Axis
      points={`${padding},${height - padding} ${width - padding},${height - padding
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
      {type === 'bar' && <BarChart stroke={stroke} data={dataConvert} />}
      {type === 'line' && <LineChart stroke={stroke} points={points} />}
    </svg>
  );
};

Chart.defaultProps = {
  height: 200,
  width: 500,
  precision: 2,
};

const formatDataChartBar = (data) => {
  return data.split(",").filter((r) => (r)).map((r) => parseFloat(r));
};
const formatDataChartLine = (data) => {
  return data.split(",").map((r, index) => ({
    x: index,
    y: r ? r : 0,
  }));
};
export default Chart;
