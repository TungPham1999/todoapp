import "./App.css";
import { TypeChartInput } from "./components/base/TypeChartInput";
import { ColorChartInput } from "./components/base/ColorChartInput";
import { DataChartInput } from "./components/base/DataChartInput";
import Chart from "./components/chartElement/Chart";
import { useState } from "react";

function App() {
  const [dataChart, setDataChart] = useState("");
  const [type, setType] = useState("bar");
  const typesChart = ["line", "bar"];
  const [color, setColor] = useState("#0074d9");
  return (
    <div className="App">
      <header className="App-header">
        Which chart do you want to display?
      </header>
      <main>
        <div className="Chart-condition">
          <TypeChartInput
            type={type}
            setType={setType}
            typesChart={typesChart}
          />
          <ColorChartInput color={color} setColor={setColor} />
          <DataChartInput dataChart={dataChart} setDataChart={setDataChart} />
        </div>
        <Chart data={dataChart} precision={0} stroke={color}
          type={type}
        />
      </main>
    </div>
  );
}

export default App;
