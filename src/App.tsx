import { useState } from "react";
import { devices } from "./devices";
import { summary } from "./summary";

function App() {
  const [aiEnabled, setAiEnabled] = useState(false);
  const kpi = aiEnabled ? summary.ai : summary.normal;

  return (
    <div className="app">
      <header className="header">
        <h1>空調エネルギー</h1>

        <button
          className={aiEnabled ? "toggle on" : "toggle"}
          onClick={() => {
            setAiEnabled(!aiEnabled);
          }}
        >
          AI制御: {aiEnabled ? "ON" : "OFF"}
        </button>
      </header>

      <div className="kpi-grid">
        <div className="card">
          <p className="card-label">消費電力</p>
          <p className="card-value">
            {kpi.totalKwh}
          <span className="unit">kWh</span>
          </p>
        </div>

        <div className="card">
          <p className="card-label">削減率</p>
          <p className="card-value">
            {kpi.reductionRate}
            <span className="unit">%</span>
          </p>
        </div>

        <div className="card">
          <p className="card-label">CO2削減</p>
          <p className="card-value">
            {kpi.co2Kg}
            <span className="unit">kg</span>
          </p>
        </div>

        <div className="card">
          <p className="card-label">コスト削減</p>
          <p className="card-value">
            {kpi.costYen}
            <span className="unit">円</span>
          </p>
        </div>
      </div>

      <h2>機器一覧</h2>
      <table className="table">
        <thead>
          <tr>
            <th>機器</th>
            <th className="num">設定</th>
            <th className="num">室温</th>
            <th>状態</th>
          </tr>
        </thead>
        <tbody>
          {/* devices から1台ずつ取り出して、AI制御のON/OFFで設定温度を切り替えて <tr> にする */}
          {devices.map((device) => {
            const temp = aiEnabled ? device.aiSetTemp : device.setTemp;
            const statusLabel = device.status === "normal"
              ? "正常"
              : device.status === "warning"
                ? "警告"
                : "異常";

            return (
              <tr key={device.id} >
                <td>
                  {device.floor} {device.name}
                </td>
                <td className="num">{temp === null ? "-" : temp}</td>
                <td className="num">{device.roomTemp}</td>
                <td>
                  <span className={"badge badge-" + device.status}>{statusLabel}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;