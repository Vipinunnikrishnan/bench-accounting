import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../../data/fetch';
import { FetchStatus } from '../../shared/enums';
import { Transaction } from '../../shared/types';
import { Transactions } from '../transactions';

export const Home = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(
    FetchStatus.PENDING,
  );

  useEffect(() => {
    async function load() {
      const [transactions, total, status]: [
        Transaction[],
        number,
        FetchStatus,
      ] = await fetchTransactions();
      setFetchStatus(status);
      setData(transactions);
      setTotal(total);
    }

    load();
  }, []);

  return (
    <Transactions>
      <Transactions.Header total={total} />
      <Transactions.Content transactions={data} status={fetchStatus} />
    </Transactions>
  );
};
