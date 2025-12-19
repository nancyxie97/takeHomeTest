import Table from "@/components/Table";
import { createFileRoute } from "@tanstack/react-router";
import { TRADES_COLUMN_DEFS } from "@/data/columnDefs.tsx";
import tradesData from "@/data/homePage/trades.json";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="animate-accordion-down">
      <h1 className="text-2xl font-bold mb-6">Financial Data Dashboard</h1>
      <div className="space-y-10 h-full">
        <Table
          columnDefs={TRADES_COLUMN_DEFS}
          data={tradesData}
          title="Trades Table 📅"
        />
      </div>
    </div>
  );
}
