import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { API_URL, RETRY_COUNT } from '../shared/constants';
import { FetchStatus } from '../shared/enums';
import type { Transaction } from '../shared/types';
import { formatCurrency, formatDate } from '../shared/utils';
import { apiCall } from './api';

export const fetchTransactions = async (): Promise<
  [Transaction[], number, FetchStatus]
> => {
  try {
    const data = await fetchWithRetry(API_URL.replace('{page}', '1'));
    const totalTransactionCount = data.totalCount;
    const noOfPages = Math.ceil(totalTransactionCount / 10);
    const promises = [];

    console.log('vipin', data);

    for (let i = 2; i <= noOfPages; i++) {
      promises.push(fetchWithRetry(API_URL.replace('{page}', `${i}`)));
    }

    const fulldata = await Promise.allSettled(promises);

    fulldata.forEach(async (apiData) => {
      if (apiData.status === 'fulfilled') {
        // Push every other sets into original data set
        data.transactions.push(...apiData.value.transactions);
      } else {
        // Log the info of failed request to further investigation.
        // We may not need to block the entire content just because one
        // request thrown error. This will be a business decision anyway.
      }
    });

    let total = 0;
    data.transactions.map((transaction) => {
      total += Number(transaction.Amount);

      // For a production app, there will be further date manipulations will be needed to ensure
      // formatting is correct based on locale and type of date format sent from server.
      transaction.Date = formatDate(transaction.Date);
      transaction.Amount = formatCurrency(transaction.Amount);
    });

    return [data.transactions, total, FetchStatus.SUCCESS];
  } catch (error) {
    return [[], 0, FetchStatus.ERROR];
  }
};

/**
 * Functions helps to retry logic for fetching.
 * @param url
 * @param retryCount
 * @returns
 */
const fetchWithRetry = (url: string, retryCount: number = RETRY_COUNT) => {
  return apiCall(url)
    .then((response) => {
      if (!response.ok && response.status === 404) {
        // Fetch resolves 404 so need to handle it explicitly. If a resource is 404,
        // it may not make sense to retry it. Could be the URL is incorrect.
        return { status: 'rejected' };
      }

      return response.json();
    })
    .catch((_) => {
      if (retryCount > 0) {
        // Log warning to troubleshoot later.
        return fetchWithRetry(url, retryCount - 1);
      } else {
        // Log the error.
        throw new Error(
          `Unable to fetch the data using the url ${url} after retry attempts`,
        );
      }
    });
};
