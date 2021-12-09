export const TypeChartInput = ({ type, typesChart, setType }) => {
  return (
    <div className="form-group">
      <label>Type of chart: </label>
      <select
        className="form-control"
        value={type} onChange={(e) => setType(e.target.value)}>
        {typesChart.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
