import axios from "axios";
import { CustomStorage } from "src/lib/Storage";
import { UserEndpoints } from "src/models";
import { loadAbort } from "src/utilities";

export class UserService {
  private static API_URL = `${import.meta.env.VITE_API_URL}/backpanel/users`;

  static getUsers(page: string, type: number, filter: string) {
    const controller = loadAbort();
    return {
      call: axios.get(
        `${this.API_URL}?page=${page}&type=${type}&filter=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static getInfo(id: number) {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${UserEndpoints.info}/${id}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static validateDocument(document: string) {
    const controller = loadAbort();
    return {
      call: axios.get(
        `${this.API_URL}/${UserEndpoints.validateDocument}/${document}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static save(user: Wieder) {
    const controller = loadAbort();
    return {
      call: axios.post(`${this.API_URL}/${UserEndpoints.save}`, user, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

}
