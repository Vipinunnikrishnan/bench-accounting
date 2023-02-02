import { Transactions } from '.';
import { FetchStatus } from '../../shared/enums';
import { render } from '@testing-library/react';
import { mockTransactions } from '../../data/mock-data';

const transactions = mockTransactions.map((txn) => ({
  date: txn.Date,
  account: txn.Ledger,
  company: txn.Company,
  amount: txn.Amount,
}));

describe('Transaction', () => {
  it('should render the component', () => {
    const { container } = render(
      <Transactions>
        <Transactions.Header total={1000} />
        <Transactions.Content
          transactions={transactions}
          status={FetchStatus.SUCCESS}
        />
      </Transactions>,
    );

    expect(container.querySelector('.total-cell').innerHTML).toBe('$1000');
    expect(container.querySelectorAll('.data-table-row').length).toBe(13);
  });

  it('should render error message if the status is "ERROR" ', () => {
    const { container } = render(
      <Transactions>
        <Transactions.Header total={0} />
        <Transactions.Content transactions={[]} status={FetchStatus.ERROR} />
      </Transactions>,
    );

    expect(container.querySelectorAll('.error').length).toBe(1);
  });

  it('should render `No transactions available` if the transactions length is 0 as well as status is succes', () => {
    const { container } = render(
      <Transactions>
        <Transactions.Header total={0} />
        <Transactions.Content transactions={[]} status={FetchStatus.SUCCESS} />
      </Transactions>,
    );

    expect(container.querySelectorAll('.no-transactions').length).toBe(1);
  });
});
