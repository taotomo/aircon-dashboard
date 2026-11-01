import { useState } from "react";
import { devices } from "./devices";

function App() {
  const [aiEnabled, setAiEnabled] = useState(false);

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
        <p>1,500kwh</p>
      </div>

      <div>
        <p>削減率</p>
        <p>20%</p>
      </div>

      <div>
        <p>CO2削減</p>
        <p>200kg</p>
      </div>

      <div>
        <p>コスト削減</p>
        <p>1,500</p>
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