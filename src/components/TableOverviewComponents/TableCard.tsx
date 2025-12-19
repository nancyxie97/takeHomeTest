//Table wrapper 
import { TableTab } from '@/hooks/useTableData';
import TablePanel from './TablePanel';

const TableCard = ({ tabId }: { tabId: TableTab }) => {
    return (
        <div className="rounded-xl bg-surface shadow p-3">
            <TablePanel tabId={tabId} showTitle />
        </div>
    );
};
export default TableCard