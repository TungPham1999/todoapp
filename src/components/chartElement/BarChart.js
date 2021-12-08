const Bar = ({ fill = "#000", x, y, height, width }) => (
  <rect fill={fill} x={x} y={y} height={height} width={width} />
);

const Chart = ({ children, height, width }) => (
  <svg viewBox={`0 0 ${width} ${height}`} height={height} width={width}>
    {children}
  </svg>
);

export const BarChart = ({ data }) => {
  const barWidth = 20;
  const barMargin = 5;
  const width = data.length * (barWidth + barMargin);
  const height = greatestValue(data.map((datum) => datum.lessonsWatched));

  return (
    <Chart height={height} width={width}>
      {data.map((datum, index) => (
        <Bar
          key={datum.name}
          fill="teal"
          x={index * (barWidth + barMargin)}
          y={height - datum.lessonsWatched}
          width={barWidth}
          height={datum.lessonsWatched}
        />
      ))}
    </Chart>
  );
};

BarChart.defaultProps = {
  height: 200,
  width: 500,
};

export default BarChart;
