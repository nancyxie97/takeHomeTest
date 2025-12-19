import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { TableTab } from "@/hooks/useTableData";
import AnimatedTabs from "@/components/AnimatedTabs";
import useResize from "@/hooks/useResize";
import TableCard from "@/components/TableOverviewComponents/TableCard";
import SplitTable from "@/components/TableOverviewComponents/SplitTable";

export const Route = createFileRoute("/tableOverview")({
	component: RouteComponent,
});


const toggleSingleTable = (name: TableTab) => {
	return <TableCard tabId={name} />;
};


function RouteComponent() {
	const { width } = useResize();
	const isMobile = width < 1024;
	type ViewMode = "single" | "sideBySide" | "allGrid" | "allScroll";

	const tabs: TableTab[] = ["credit", "holdings", "risk", "transactions"];
	const viewModes: ViewMode[] = useMemo(() => {
		return [
			"single",
			"sideBySide",
			...(!isMobile ? ["allGrid"] as ViewMode[] : []),
			"allScroll",
		]
	}, [isMobile]);
	const viewModeLabel: Record<ViewMode, string> = {
		single: "Single",
		sideBySide: "Side-by-side",
		allGrid: "All (grid)",
		allScroll: "All (scroll)",
	};

	const getNextTab = (tab: TableTab): TableTab => {
		const idx = tabs.findIndex((t) => t === tab);
		return tabs[(idx + 1) % tabs.length];
	};

	const [selectedTab, setSelectedTab] = useState<TableTab>("credit");
	const [viewMode, setViewMode] = useState<ViewMode>("single");
	const [compareTab, setCompareTab] = useState<TableTab>(() =>
		getNextTab("credit"),
	);

	useEffect(() => {
		if (compareTab === selectedTab) {
			setCompareTab(getNextTab(selectedTab));
		}
	}, [compareTab, selectedTab]);

	const onChangeSingleTable = (name: TableTab) => {
		setSelectedTab(name);
	};

	const renderViewModePanel = (mode: ViewMode) => {
		if (mode === "single") {
			return (
				<AnimatedTabs<TableTab>
					tabs={tabs}
					selectedTab={selectedTab}
					onTabChange={onChangeSingleTable}
					toggleTabPanel={toggleSingleTable}
				/>
			);
		}

		if (mode === "sideBySide") {
			return (
				<>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						<SplitTable
							selectedValue={selectedTab}
							setSelectedValue={setSelectedTab}
							tabs={tabs}
							oppositeSideValue={compareTab}
						/>
						<SplitTable
							selectedValue={compareTab}
							setSelectedValue={setCompareTab}
							tabs={tabs}
							oppositeSideValue={selectedTab}
						/>
					</div>
				</>
			);
		}

		if (mode === "allGrid") {
			return (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					{tabs.map((tab) => (
						<TableCard key={tab} tabId={tab} />
					))}
				</div>
			);
		}

		// allScroll
		return (
			<div className="space-y-4">
				{tabs.map((tab) => (
					<TableCard key={tab} tabId={tab} />
				))}
			</div>
		);
	};

	return (
		<div>
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
				<h1 className="text-2xl font-bold">Table Overview</h1>
				<div className="flex flex-wrap items-center gap-3">
					<AnimatedTabs<ViewMode>
						tabs={viewModes}
						selectedTab={viewMode}
						onTabChange={setViewMode}
						renderLabel={(mode) => viewModeLabel[mode]}
						compact
						showPanels={false}
						toggleTabPanel={renderViewModePanel}
					/>
				</div>
			</div>

			{renderViewModePanel(viewMode)}
		</div>
	);
}
