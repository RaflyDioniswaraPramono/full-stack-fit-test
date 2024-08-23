import { api } from "../utils/api";

export class PaymentServices {
  static async payment(payload) {
    const response = await api.post("/payment", payload);

    return response.data;
  }

  static async getPayments() {
    const response = await api.get("/payment");

    return response.data;
  }
}
