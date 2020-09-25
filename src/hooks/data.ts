import { useEffect, useState } from "react";

function useData() {
  const [rpm, setRpm] = useState(10);
  const [memoryUsage, setMemoryUsage] = useState(0.1);
  const [cpus, setCpus] = useState<Record<string, number>>({
    "1": 20,
    "2": 20,
  });
  const [loading, setLoading] = useState(false);
  const [plotData, setPlotData] = useState<
    {
      name: string;
      ns: string;
      nlr: string;
      nrl: string;
    }[]
  >([]);

  useEffect(() => {
    const client = new WebSocket("ws://35.183.23.210:8000/b");
    client.addEventListener("message", (event) => {
      const parsedJson = JSON.parse(event.data);

      const memory = parsedJson.lidar.memory;
      setMemoryUsage((memory.total - memory.available) / memory.total);
      setCpus(parsedJson.lidar.cpu);
      setRpm(parsedJson.sensor.motor_rpm);
      setLoading(false);
    });

    fetch("https://api.bluecitytechnology.com/s/smp/")
      .then((response) => response.json())
      .then((json) => {
        setPlotData(
          Object.entries(json.data).map(([name, value]) => {
            console.log("value", value);
            return {
              name,
              ...(value as any),
            };
          })
        );
      });
  }, []);

  return {
    rpm,
    memoryUsage,
    cpus,
    loading,
    plotData,
  };
}

export default useData;
