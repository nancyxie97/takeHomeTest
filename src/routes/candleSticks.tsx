import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PencilSquareIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import CandleStick from "@/components/CandleStick";
import { CandleSticks, useCandleStickData } from "@/hooks/useCandleStickData";
import DesignedSelect from "@/components/DesignedSelect";

export const Route = createFileRoute("/candleSticks")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selected, setSelected] = useState<CandleSticks>("aapl");
  const { data } = useCandleStickData(selected);

  const options = [
    { value: "aapl", label: "AAPL" },
    { value: "msft", label: "MSFT" },
    { value: "tsla", label: "TSLA" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Candlesticks</h1>

        <DesignedSelect<CandleSticks>
          value={selected}
          onChange={setSelected}
          options={options}
          leftIcon={<PencilSquareIcon className="h-4 w-4 text-muted-foreground" />}
          rightIcon={<ChevronDownIcon className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <CandleStick height={500} title={selected.toUpperCase()} rawData={data} />
    </div>
  );
}
