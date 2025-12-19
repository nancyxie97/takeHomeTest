import { useMemo, useRef } from "react";
import {
  AgChartInstance,
  AgFinancialChartOptions,
  AgPriceVolumeChartType,
} from "ag-charts-enterprise";
import { AgFinancialCharts } from "ag-charts-react";
import DemoData from "../data/candleStick/aapl.json";
import "ag-charts-enterprise";
import { useIsDarkMode } from "@/stores/DarkModeStore";

export default function CandleStick({
  height = 500,
  title = "AAPL",
  rawData,
}: {
  height: number;
  title: string;
  rawData?: unknown[];
}) {
  const isDark = useIsDarkMode();
  const chartRef = useRef<AgChartInstance>(null);

  const getData = (rows: unknown[]) => {
    return rows.map((row) => {
      const arr = Array.isArray(row) ? row : [];
      const dateMs = typeof arr[0] === "number" ? arr[0] : 0;
      const open = typeof arr[1] === "number" ? arr[1] : 0;
      const high = typeof arr[2] === "number" ? arr[2] : 0;
      const low = typeof arr[3] === "number" ? arr[3] : 0;
      const close = typeof arr[4] === "number" ? arr[4] : 0;

      return {
        date: new Date(dateMs),
        open,
        high,
        low,
        close,
        volume: Math.random() * 1000 + 100,
      };
    });
  };

  const options = useMemo<AgFinancialChartOptions>(() => {
    const rows = rawData ?? (DemoData as unknown[]);
    return {
      data: getData(rows),
      title: { text: title },
      chartType: "candlestick" as AgPriceVolumeChartType,
      navigator: true, // disabled by default!
      toolbar: true,
      rangeButtons: true,
      volume: true,
      statusBar: true,
      zoom: true,
      height: height,
      theme: isDark ? "ag-financial-dark" : "ag-financial",
    };
  }, [rawData, title, height, isDark]);
  return (
    <div>
      <AgFinancialCharts options={options} ref={chartRef} />
    </div>
  );
}
