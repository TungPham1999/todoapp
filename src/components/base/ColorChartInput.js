export const ColorChartInput = ({ color, setColor }) => {
  return (
    <div className="form-group">
      <label>Color of chart: </label>
      <input
        type="color"
        className="form-control"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      ></input>
    </div>
  );
};
