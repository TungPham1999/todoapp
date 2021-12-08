export const ColorChartInput = ({ color, setColor }) => {
  return (
    <div>
      <label>Color of chart: </label>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      ></input>
    </div>
  );
};
