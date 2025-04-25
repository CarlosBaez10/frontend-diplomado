import axios from "axios";
import { CustomStorage } from "src/lib/Storage";
import { AuthEndpoints } from "src/models";
import { loadAbort } from "src/utilities";

export class AuthService {
  private static API_URL = `${import.meta.env.VITE_API_URL}/auth`;

  static login(email: string, password: string) {
    console.log(this.API_URL);
    const controller = loadAbort();
    return {
      call: axios.post(
        `${this.API_URL}/${AuthEndpoints.login}`,
        { email, password },
        { signal: controller.signal }
      ),
      controller,
    };
  }

  static validateEmail(email: string) {
    const controller = loadAbort();
    return {
      call: axios.post(
        `${this.API_URL}/${AuthEndpoints.validateEmail}`,
        { email },
        { signal: controller.signal }
      ),
      controller,
    };
  }

  static renew() {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${AuthEndpoints.renew}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }
}
