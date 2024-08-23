import { api } from "../utils/api";

export class TransactionServices {
  static async getTransactions() {
    const response = await api.get("/transaction");

    return response.data;
  }

  static async getTransactionsByMonth(month) {
    const response = await api.get(`/transaction/${month}`);

    return response.data;
  }

  static async getIncomes(year) {
    const response = await api.get(`/income/${year}`);

    return response.data;
  }

  static async getExpends() {
    const response = await api.get("/expend");

    return response.data;
  }
}
