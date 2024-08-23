import { api } from "../utils/api";

export class ExpenditureServices {
  static async addExpenditure(payload) {
    const response = await api.post("/expenditure", payload);

    return response.data;
  }

  static async getExpenditures() {
    const response = await api.get("/expenditure");

    return response.data;
  }
}
