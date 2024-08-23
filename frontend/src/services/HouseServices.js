import { api } from "../utils/api";

export class HouseServices {
  static async getHouses() {
    const response = await api.get("/house");

    return response.data;
  }

  static async getHouseById(id) {
    const response = await api.get(`/house/${id}`);

    return response.data;
  }

  static async updateHouse(houseId, payload) {
    const response = await api.put(`/house/${houseId}`, payload);

    return response.data;
  }
}
