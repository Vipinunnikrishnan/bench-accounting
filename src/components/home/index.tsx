import { Transactions } from "../transactions";

export const Home = ({}) => {
  return (
    <Transactions>
      <Transactions.Header />
      <Transactions.Content />
    </Transactions>
  );
};
