import React from "react";
import { FetchStatus } from "../../shared/enums";
import type { Transaction } from "../../shared/types";
import "./transactions.css";

export const Transactions = ({ children }: { children: React.ReactNode }) => {
  return (
      <div
          role="table"
          aria-label="Transaction History"
          className="data-table data-table--collapse">
          { children }
      </div>
  );
};

// eslint-disable-next-line
Transactions.Header = ({ total }: { total: number }) => {
  return (
      <div className="data-table-row data-table-row--head" role="row">
          <div
              role="columnheader"
              className="data-table-cell date-cell column-heading">
              Date
          </div>
          <div
              role="columnheader"
              className="data-table-cell company-cell column-heading">
              Company
          </div>
          <div
              role="columnheader"
              className="data-table-cell account-cell column-heading">
              Account
          </div>
          <div
              role="columnheader"
              data-testid="total-amount"
              className="data-table-cell total-cell column-heading">{ `$${total}` }</div>
      </div>
  );
};

// eslint-disable-next-line
Transactions.Content = ({
  transactions,
  status = FetchStatus.PENDING
}: {
  transactions: Transaction[];
  status: FetchStatus;
}) => {
  if (status === FetchStatus.ERROR) {
    return (
        <div data-testid="error" className="error">
            Unable to fetch transaction records
        </div>
    );
  }

  if (status === FetchStatus.SUCCESS && transactions.length === 0) {
    return (
        <div data-testid="no-transactions" className="no-transactions">
            No transactions available
        </div>
    );
  }

  return (
      <>
          { transactions.map((item: Transaction, index: number) => {
        return (
            <div
                data-testid="data-table-row"
                key={ index }
                className={ `data-table-row ${index % 2 !== 0 ? "is-striped" : ""}` }
                role="row">
                <div role="cell" className="data-table-cell date-cell">
                    <div className="data-table-cell--heading">Date</div>
                    <div className="data-table-cell--content">{ item.date }</div>
                </div>
                <div role="cell" className="data-table-cell company-cell">
                    <div className="data-table-cell--heading">Company</div>
                    <div className="data-table-cell--content company-cell--content">
                        { item.company }
                    </div>
                </div>
                <div
                    role="cell"
                    className="data-table-cell account-cell account-cell--content">
                    <div className="data-table-cell--heading">Account</div>
                    <div className="data-table-cell--content">{ item.account }</div>
                </div>
                <div role="cell" className="data-table-cell total-cell">
                    <div className="data-table-cell--heading">Amount</div>
                    <div className="data-table-cell--content">
                        { `$${item.amount}` }
                    </div>
                </div>
            </div>
        );
      }) }
      </>
  );
};
