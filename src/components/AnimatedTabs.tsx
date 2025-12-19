import { humanizeIdentifier } from "@/utils/humanize";
import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";
import React from "react";

interface IAnimatedTabs<T> {
  tabs: T[];
  selectedTab: T;
  onTabChange: (name: T) => void;
  toggleTabPanel: (name: T) => React.ReactNode;
  renderLabel?: (tab: T) => React.ReactNode;
  getKey?: (tab: T) => string;
  showPanels?: boolean;
  compact?: boolean;
  additionalTabStyles?: string;
  addtionalTabPanel?: string;
  //toggleTabs: (name: T) => React.ReactNode;
}
const AnimatedTabs = <T,>({
  tabs,
  selectedTab,
  onTabChange,
  toggleTabPanel,
  renderLabel,
  getKey,
  showPanels = true,
  compact = false,
  additionalTabStyles,
}: IAnimatedTabs<T>) => {
  const selectedIndexRaw = tabs.findIndex((tab) => tab === selectedTab);
  const selectedIndex = selectedIndexRaw >= 0 ? selectedIndexRaw : 0;

  return (
    <TabGroup
      selectedIndex={selectedIndex}
      onChange={(index) => onTabChange(tabs[index])}
    >
      <TabList
        className={
          compact
            ? "relative inline-flex rounded-xl bg-muted p-1 mb-0"
            : "relative flex rounded-xl p-1 mb-4 bg-muted"
        }
      >
        {/* animation for the active tab (equal-width tabs only) */}
        {!compact && (
          <span
            className={`
                        absolute top-1 left-0 h-[calc(100%-0.5rem)]
                        bg-surface rounded-xl shadow
                        transition-transform duration-300 ease-out
                        ${additionalTabStyles ?? ""}
                      `}
            style={{
              width: `${100 / tabs.length}%`,
              transform: `translateX(${tabs.findIndex((t) => t === selectedTab) * 100}%)`,
            }}
          />
        )}
        {tabs.map((tab) => (
          <Tab
            key={getKey ? getKey(tab) : String(tab)}
            className={({ selected }) =>
              compact
                ? `relative z-10 text-center rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none
                                   ${
                                     selected
                                       ? "bg-surface text-accent shadow"
                                       : "text-muted-foreground hover:text-foreground"
                                   }`
                : `relative z-10 flex-1 text-center rounded-xl py-2.5
									 text-sm font-medium leading-5 transition-colors duration-200
									 focus:outline-none
									 ${selected ? "text-accent" : "text-muted-foreground hover:text-foreground"}`
            }
          >
            {renderLabel ? renderLabel(tab) : humanizeIdentifier(String(tab))}
          </Tab>
        ))}
      </TabList>
      {showPanels && <TabPanels>{toggleTabPanel(selectedTab)}</TabPanels>}
    </TabGroup>
  );
};

export default AnimatedTabs;
