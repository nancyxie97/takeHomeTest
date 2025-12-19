import aapl from "@/data/candleStick/aapl.json";
import msft from "@/data/candleStick/msft.json";
import tsla from "@/data/candleStick/tsla.json";
import { useMemo } from "react";

export type CandleSticks = "aapl" | "msft" | "tsla";
interface UseCandleStickDataReturn {
  data: Record<number, unknown>[];
}

const CANDLESTICK_CONFIG: Record<
  CandleSticks,
  { data: Record<number, unknown>[] }
> = {
  aapl: {
    data: aapl,
  },
  msft: {
    data: msft,
  },
  tsla: {
    data: tsla,
  },
};

export const useCandleStickData = (
  name: CandleSticks,
): UseCandleStickDataReturn => {
  return useMemo(() => CANDLESTICK_CONFIG[name], [name]);
};
