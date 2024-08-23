import { api } from "../utils/api";

export class BillServices {
  static async addBill(payload) {
    const response = await api.post("/bill", payload);

    return response.data;
  }

  static async getBills() {
    const response = await api.get("/bill");

    return response.data;
  }
}
