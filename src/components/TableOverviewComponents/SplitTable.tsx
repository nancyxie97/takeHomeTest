import { TableTab } from "@/hooks/useTableData";
import { humanizeIdentifier } from "@/utils/humanize";
import TableCard from "./TableCard";
import DesignedSelect from "../DesignedSelect";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const SplitTable = ({
    selectedValue,
    setSelectedValue,
    tabs,
    oppositeSideValue,
}: {
    selectedValue: TableTab;
    setSelectedValue: (name: TableTab) => void;
    tabs: TableTab[];
    oppositeSideValue: TableTab;
}) => {
    // convert tabs into { value, label } format for DesignedSelect
    const options = tabs
        .filter((t) => t !== oppositeSideValue)
        .map((tab) => ({ value: tab, label: humanizeIdentifier(tab) }));

    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-muted-foreground">Compare</span>
                <DesignedSelect<TableTab>
                    value={selectedValue}
                    onChange={setSelectedValue}
                    options={options}
                    rightIcon={<ChevronDownIcon className="h-4 w-4 text-muted-foreground" />}
                />
            </div>

            <TableCard tabId={selectedValue} />
        </div>
    );
};

export default SplitTable;
