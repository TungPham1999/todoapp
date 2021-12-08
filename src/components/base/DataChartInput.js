export const DataChartInput = ({ dataChart, setDataChart }) => {
  return (
    <div>
      <label>Data of chart: </label>
      <input
        value={dataChart}
        onChange={(e) => setDataChart(e.target.value)}
      ></input>
    </div>
  );
};
