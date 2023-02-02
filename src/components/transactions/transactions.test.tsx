import { render, screen } from "@testing-library/react";
import React from "react";
import { Transactions } from ".";
import { mockTransactions } from "../../data/mock-data";
import { FetchStatus } from "../../shared/enums";

const transactions = mockTransactions.map((txn) => ({
  date: txn.Date,
  account: txn.Ledger,
  company: txn.Company,
  amount: txn.Amount
}));

describe("Transaction", () => {
  it("should render the component", () => {
    const { container } = render(
        <Transactions>
            <Transactions.Header total={ 1000 } />
            <Transactions.Content
                transactions={ transactions }
                status={ FetchStatus.SUCCESS }
        />
        </Transactions>
    );

    expect(screen.getByTestId("total-amount").textContent).toBe("$1000");
    expect(screen.getAllByTestId("data-table-row").length).toBe(12);
  });

  it("should render error message if the status is \"ERROR\"", () => {
    const { container } = render(
        <Transactions>
            <Transactions.Header total={ 0 } />
            <Transactions.Content transactions={ [] } status={ FetchStatus.ERROR } />
        </Transactions>
    );

    expect(screen.getAllByTestId("error").length).toBe(1);
  });

  it("should render `No transactions available` if the transactions length is 0 as well as status is succes", () => {
    const { container } = render(
        <Transactions>
            <Transactions.Header total={ 0 } />
            <Transactions.Content transactions={ [] } status={ FetchStatus.SUCCESS } />
        </Transactions>
    );

    expect(screen.getAllByTestId("no-transactions").length).toBe(1);
  });
});
