import Table from '../Table';
import { TableTab, useTableData } from '@/hooks/useTableData';
import { humanizeIdentifier } from '@/utils/humanize';

const TablePanel = ({
    tabId,
    showTitle,
}: {
    tabId: TableTab;
    showTitle?: boolean;
}) => {
    const { columnDefs, data, gridOptions } = useTableData(tabId);
    return (
        <Table
            columnDefs={columnDefs}
            data={data}
            title={showTitle ? humanizeIdentifier(tabId) : undefined}
            gridOptions={gridOptions}
        />
    );
};

export default TablePanel