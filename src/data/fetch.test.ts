import { fetchTransactions } from "./fetch";
import { mockTransactions } from "./mock-data";
import { FetchStatus } from "../shared/enums";
import { formatCurrency } from "../shared/utils";

jest.mock("./api", () => ({
  apiCall: (url: string) => {
    if (url.indexOf("1.json") !== -1) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            totalCount: 30,
            page: 1,
            transactions: mockTransactions.filter((_, index) => index < 10)
          })
      });
    } else if (url.indexOf("2.json") !== -1) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            totalCount: 12,
            page: 1,
            transactions: mockTransactions.filter((_, index) => index >= 10)
          })
      });
    } else {
      return Promise.reject({
        ok: true
      });
    }
  }
}));

describe("Fetch Transactions", () => {
  it("fetches the transactions and subsequent data and retries if any error occured", async () => {
    const response = await fetchTransactions();
    expect(response[0].length).toBe(12);
    const totalSum = mockTransactions.reduce(
      (acc, curr) => acc + Number(curr.Amount),
      0
    );
    expect(response[1]).toBe(formatCurrency(totalSum.toString()));
    expect(response[2]).toBe(FetchStatus.SUCCESS);
  });
});
