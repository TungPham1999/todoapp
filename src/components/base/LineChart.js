const STROKE = 1;

const LineChart = ({ stroke, points }) => {
    return (
        <polyline
            fill="none"
            stroke={stroke}
            strokeWidth={STROKE}
            points={points}
        />
    )
}
LineChart.defaultProps = {
    height: 200,
    width: 500,
    precision: 2,
};

export default LineChart
