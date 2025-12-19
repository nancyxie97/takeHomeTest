import { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import {
	colorSchemeDarkBlue,
	ColDef,
	GridOptions,
	themeQuartz,
} from "ag-grid-enterprise";
import { useIsDarkMode } from "@/stores/DarkModeStore";

const ROW_ID = "id";

const defaultColDef = {
	minWidth: 80,
	flex: 1,
	filter: "agSetColumnFilter",
	resizable: true,
	sortable: true,
	suppressMenu: true,
};

interface TableProps {
	columnDefs: ColDef[];
	data: Record<string, unknown>[];
	title?: string;
	gridOptions?: Partial<GridOptions>;
}

export default function Table({ columnDefs, data, title, gridOptions }: TableProps) {
	const gridRef = useRef<AgGridReact>(null);
	const isDarkMode = useIsDarkMode();
	const theme = isDarkMode
		? themeQuartz.withPart(colorSchemeDarkBlue)
		: themeQuartz;

	const mergedGridOptions: GridOptions = {
		theme,
		columnDefs,
		defaultColDef,
		rowModelType: "clientSide",
		rowData: data,
		pagination: true,
		paginationPageSize: 50,
		getRowId: (params) => params.data[ROW_ID] as string,
		...gridOptions
	};

	return (
		<div className="w-full h-[600px] flex flex-col">
			{title && <h1 className="mb-2 shrink-0">{title}</h1>}
			<div key={title} className="flex-1 min-h-0">
				<AgGridReact ref={gridRef} {...mergedGridOptions} />
			</div>
		</div>
	);
}

