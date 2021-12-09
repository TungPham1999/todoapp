export const DataChartInput = ({ dataChart, setDataChart }) => {
  return (
    <div className="form-group">
      <label>Data of chart: </label>
      <input
        value={dataChart}
        onChange={(e) => setDataChart(e.target.value)}
        className="form-control"
      ></input>
    </div>
  );
};
