import { useMemo } from "react";
import { ColDef, GridOptions, MenuItemDef } from "ag-grid-community";
import {
  CREDIT_COLUMN_DEFS,
  HOLDINGS_COLUMN_DEFS,
  RISK_COLUMN_DEFS,
  TRANSACTIONS_COLUMN_DEFS,
} from "@/data/columnDefs.tsx";
import creditData from "@/data/tableOverview/credit.json";
import holdingsData from "@/data/tableOverview/holdings.json";
import riskData from "@/data/tableOverview/risk.json";
import transactionsData from "@/data/tableOverview/transactions.json";


// Returing Table Overview data/column def/ gridOptions depending on which category that was selected

export type TableTab = "credit" | "holdings" | "risk" | "transactions";

interface UseTableDataReturn {
  columnDefs: ColDef[];
  data: Record<string, unknown>[];
  gridOptions?: GridOptions;
}

const TABLE_CONFIG: Record<
  TableTab,
  { columnDefs: ColDef[]; data: Record<string, unknown>[]; gridOptions?: GridOptions }
> = {
  credit: {
    columnDefs: CREDIT_COLUMN_DEFS,
    data: creditData,
    gridOptions: {},
  },
  holdings: {
    columnDefs: HOLDINGS_COLUMN_DEFS,
    data: holdingsData,
    gridOptions: {
      getContextMenuItems: (params) => {
        const result: MenuItemDef[] = [];

        if (params.node?.group) {
          result.push(
            {
              name: "Expand All Groups",
              action: () => params.api.expandAll(),
            },
            {
              name: "Collapse All Groups",
              action: () => params.api.collapseAll(),
            },
            {
              name: "separator",
            }
          );
        }

        // Add default menu items after our custom items
        const defaultItems = params.defaultItems?.map((item) => item);
        return [...result, ...(defaultItems || [])];
      },
      autoGroupColumnDef: {
        headerName: "Portfolio ID",
        field: "portfolioId",
        minWidth: 200,
        maxWidth: 200,
        suppressSizeToFit: true,
        cellRendererParams: {
          suppressCount: true,
        },
      },

    }
    ,
  },
  risk: {
    columnDefs: RISK_COLUMN_DEFS,
    data: riskData,
    gridOptions: {
      getRowClass: (params) => {
        console.log('row', params);
        if (!params.data) return "";
        const { beta, correlation, volatility } = params.data;
        return correlation >= .8 && beta >= 1.3 && volatility > .2 ? "bg-danger-foreground" : "";
      }
    },
  },
  transactions: {
    columnDefs: TRANSACTIONS_COLUMN_DEFS,
    data: transactionsData,
    gridOptions: {
    },
  },
};

export const useTableData = (tab: TableTab): UseTableDataReturn => {
  return useMemo(() => {
    const config = TABLE_CONFIG[tab];
    if (!config) {
      throw new Error(`Invalid table tab: ${tab}`);
    }
    return {
      columnDefs: config.columnDefs,
      data: config.data,
      gridOptions: config.gridOptions,
    };
  }, [tab]);
};
