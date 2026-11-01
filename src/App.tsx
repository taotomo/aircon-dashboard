import { useState } from "react";
import { devices } from "./devices";
import { summary } from "./summary";

function App() {
  const [aiEnabled, setAiEnabled] = useState(false);
  const kpi = aiEnabled ? summary.ai : summary.normal;

  return (
    <div>
      <h1>空調エネルギー</h1>

      <button onClick={() => {
          setAiEnabled(!aiEnabled);
        }}
      >
        AI制御: {aiEnabled ? "ON" : "OFF"}
      </button>
      <div>
        <p>消費電力</p>
        <p>{kpi.totalKwh} kWh</p>
      </div>

      <div>
        <p>削減率</p>
        <p>{kpi.reductionRate} %</p>
      </div>

      <div>
        <p>CO2削減</p>
        <p>{kpi.co2Kg} kg</p>
      </div>

      <div>
        <p>コスト削減</p>
        <p>{kpi.costYen} 円</p>
      </div>

      <h2>機器一覧</h2>
      <table>
        <thead>
          <tr>
            <th>機器</th>
            <th>設定</th>
            <th>室温</th>
            <th>状態</th>
          </tr>
        </thead>
        <tbody>
          {/* devices から1台ずつ取り出して、AI制御のON/OFFで設定温度を切り替えて <tr> にする */}
          {devices.map((device) => {
            const temp = aiEnabled ? device.aiSetTemp : device.setTemp;

            return (
              <tr key={device.id} >
                <td>
                  {device.floor} {device.name}
                </td>
                <td>{temp === null ? "-" : temp}</td>
                <td>{device.roomTemp}</td>
                <td>{device.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;