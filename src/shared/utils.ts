import { format } from "date-fns";

export const formatCurrency = (currency: string) => {
  let formattedCurency = null;
  try {
    formattedCurency = currency.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } catch (error) {
    // Log error
  }

  return formattedCurency || currency;
};

export const formatDate = (date: string, dateDormat = "MMM do, yyyy") => {
  let formattedDate = null;
  try {
    formattedDate = format(new Date(date), dateDormat);
  } catch (error) {
    // Log error
  }

  return formattedDate || date;
};
