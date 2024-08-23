import { api } from "../utils/api";

export class AuthServices {
  static async signIn(data) {
    const { username, password } = data;

    const response = await api.post("/signin", {
      username,
      password,
    });

    return response.data;
  }
}
