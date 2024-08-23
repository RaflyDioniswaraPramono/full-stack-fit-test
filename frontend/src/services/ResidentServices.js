import { api } from "../utils/api";

export class ResidentServices {
  static async addResident(data) {
    const response = await api.post("/resident", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  static async getResidents() {
    const response = await api.get("/resident");

    return response.data;
  }

  static async updateResidents(residentId, payload) {
    const response = await api.put(`/resident/${residentId}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }
}
