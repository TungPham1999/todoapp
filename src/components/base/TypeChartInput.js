export const TypeChartInput = ({ type, typesChart, setType }) => {
  return (
    <div>
      <label>Type of chart: </label>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        {typesChart.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
