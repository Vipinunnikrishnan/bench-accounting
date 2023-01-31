import { FetchStatus } from "../../shared/enums";
import type { Transaction } from "../../shared/types";

export const Transactions = ({ children }) => {
  return <div className="table">{children}</div>;
};

Transactions.Header = ({ total }: { total: number }) => {
  return (
    <div className="table-header">
      <div>Date</div>
      <div>Company</div>
      <div>Account</div>
      <div>{total}</div>
    </div>
  );
};

Transactions.Content = ({
  transactions,
  status = FetchStatus.PENDING,
}: {
  transactions: Transaction[];
  status: FetchStatus;
}) => {
  if (status === FetchStatus.PENDING) {
    return "Spinning";
  }

  if (status === FetchStatus.ERROR) {
    return "Error";
  }
  return (
    <div className="table-content">
      {transactions.map((item: Transaction) => {
        return (
          <>
            <div>{item.Date}</div>
            <div>{item.Company}</div>
            <div>{item.Ledger}</div>
            <div>{item.Amount}</div>
          </>
        );
      })}
    </div>
  );
};
