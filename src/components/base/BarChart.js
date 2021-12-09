const BarChart = ({ data, stroke, precision, barWidth, barMargin, height }) => {
    const Bar = ({ fill = "#000", x, y, height, width }) => (
        <rect fill={fill} x={x} y={y} height={height} width={width} />
    );
    const barChart = data.map((datum, index) => (
        <Bar
            key={index}
            fill={stroke}
            x={(index + precision) * (barWidth + barMargin)}
            y={height - (datum + 40)}
            width={barWidth}
            height={datum}
        />
    ))
    return barChart
}

BarChart.defaultProps = {
    barWidth: 10,
    barMargin: 5,
    precision: 3,
    height: 200,
};


export default BarChart;