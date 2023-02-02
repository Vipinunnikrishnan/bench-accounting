import React from "react";
import { FetchStatus } from "../../shared/enums";
import type { Transaction } from "../../shared/types";
import { Spinner } from "../spinner";
import "./transactions.css";

export const Transactions = ({ children }: { children: React.ReactNode }) => {
  return <div className="data-table data-table--collapse">{ children }</div>;
};

// eslint-disable-next-line
Transactions.Header = ({ total }: { total: number }) => {
  return (
      <div className="data-table-row data-table-row--head">
          <div className="data-table-cell date-cell column-heading">Date</div>
          <div className="data-table-cell company-cell column-heading">Company</div>
          <div className="data-table-cell account-cell column-heading">Account</div>
          <div className="data-table-cell total-cell column-heading">{ `$${total}` }</div>
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
  if (status === FetchStatus.PENDING) {
    return (
        <div className="spinner">
            <Spinner />
        </div>
    );
  }

  if (status === FetchStatus.ERROR) {
    return <div className="error">Unable to fetch transaction records</div>;
  }
  return (
      <>
          { transactions.map((item: Transaction, index: number) => {
        return (
            <div
                key={ index }
                className={ `data-table-row ${index % 2 !== 0 ? "is-striped" : ""}` }
          >
                <div className="data-table-cell date-cell">
                    <div className="data-table-cell--heading">Date</div>
                    <div className="data-table-cell--content">{ item.Date }</div>
                </div>
                <div className="data-table-cell company-cell">
                    <div className="data-table-cell--heading">Company</div>
                    <div className="data-table-cell--content company-cell--content">
                        { item.Company }
                    </div>
                </div>
                <div className="data-table-cell account-cell account-cell--content">
                    <div className="data-table-cell--heading">Account</div>
                    <div className="data-table-cell--content">{ item.Ledger }</div>
                </div>
                <div className="data-table-cell total-cell">
                    <div className="data-table-cell--heading">Amount</div>
                    <div className="data-table-cell--content">
                        { `$${item.Amount}` }
                    </div>
                </div>
            </div>
        );
      }) }
      </>
  );
};
