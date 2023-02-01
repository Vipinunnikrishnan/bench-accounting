import { FetchStatus } from "../../shared/enums";
import type { Transaction } from "../../shared/types";
import "./transactions.css";
export const Transactions = ({ children }) => {
  return <div className="data-table data-table--collapse">{children}</div>;
};

Transactions.Header = ({ total }: { total: number }) => {
  return (
    <div className="data-table-row data-table-row--head">
      <div className="data-table-cell date-cell column-heading">Date</div>
      <div className="data-table-cell company-cell column-heading">Company</div>
      <div className="data-table-cell account-cell column-heading">Account</div>
      <div className="data-table-cell total-cell column-heading">{`$${total}`}</div>
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
    return <>"Spinning"</>;
  }

  if (status === FetchStatus.ERROR) {
    return <>"Error"</>;
  }
  return (
    <>
      {transactions.map((item: Transaction, index: number) => {
        return (
          <div
            className={`data-table-row ${index % 2 !== 0 ? "is-striped" : ""}`}
          >
            <div className="data-table-cell date-cell">
              <div className="data-table-cell--heading">Date</div>
              <div className="data-table-cell--content date-content">
                {item.Date}
              </div>
            </div>
            <div className="data-table-cell company-cell">
              <div className="data-table-cell--heading">Company</div>
              <div className="data-table-cell--content date-content">
                {item.Company}
              </div>
            </div>
            <div className="data-table-cell account-cell account-cell--content">
              <div className="data-table-cell--heading">Account</div>
              <div className="data-table-cell--content date-content">
                {item.Ledger}
              </div>
            </div>
            <div className="data-table-cell total-cell">
              <div className="data-table-cell--heading">Amount</div>
              <div className="data-table-cell--content date-content">
                {`$${item.Amount}`}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
