import React from "react";
import GaugeChart from "react-gauge-chart";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useData from "../hooks/data";
import styles from "./App.module.scss";
import { ReactComponent as Spinner } from "./icons/spinner.svg";
import Kraken from "./Kraken";
import Panel from "./Panel";
import Tree from "./Tree";

const treeItems = [
  {
    title: "Libgit2",
    children: [
      { title: "appveyor" },
      {
        title: "bindings",
        children: [{ title: "020_2" }, { title: "022_1" }],
      },
      {
        title: "brianmario",
        children: [
          { title: "attr-from-tree" },
          { title: "revwalk-filter" },
          { title: "trailer-list" },
        ],
      },
    ],
  },
];

function App() {
  const { rpm, memoryUsage, cpus, loading, plotData } = useData();

  return (
    <div className={styles.app}>
      <aside className={styles.collapsibleMenu}>
        <Tree items={treeItems} />
      </aside>
      <main>
        {loading ? (
          <Spinner />
        ) : (
          <div className={styles.grid}>
            <Panel title="Memory usage">
              <GaugeChart
                id="memory"
                textColor="#000"
                nrOfLevels={10}
                arcPadding={0.1}
                cornerRadius={3}
                percent={memoryUsage}
              />
            </Panel>
            <Panel title="Motor RPM">
              <GaugeChart
                id="motor-rpm"
                textColor="#000"
                nrOfLevels={420}
                arcsLength={[0.3, 0.5, 0.2]}
                colors={["#5BE12C", "#F5CD19", "#EA4228"]}
                percent={rpm / 100}
                arcPadding={0.02}
                formatTextValue={(v) => {
                  return `${parseInt(v)}`;
                }}
              />
            </Panel>
            {Object.entries(cpus).map(([key, value]) => (
              <Panel title={`CPU ${key} usage`} key={key}>
                <GaugeChart
                  id={`cpu_${key}`}
                  textColor="#000"
                  nrOfLevels={10}
                  arcPadding={0.1}
                  cornerRadius={3}
                  percent={value / 100}
                />
              </Panel>
            ))}
            <Panel double title="Chart">
              <LineChart
                width={640}
                height={300}
                data={plotData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ns" stroke="#8884d8" />
                <Line type="monotone" dataKey="nlr" stroke="#82ca9d" />
                <Line type="monotone" dataKey="nrl" stroke="#ffaaff" />
              </LineChart>
            </Panel>
            <Panel double title="Kraken">
              <Kraken />
            </Panel>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
