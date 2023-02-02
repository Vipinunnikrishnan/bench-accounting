/**
 * window.fetch wrapper to further customize later if needed like common logging etc.
 * @param url
 * @param options
 * @returns
 */
export const apiCall = (url, options = {}) => fetch(url, options);
