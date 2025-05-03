import axios from "axios";
import { SERVER_URL } from "./apiConst";

const BaseAPI = {
  async getAuthHeaders() {
    let token = JSON.parse(localStorage.getItem("tokenJust"));
    if (!token) throw new Error("session not found");
    return {
      "Authorization": `Bearer ${token}`,
    };
  },
  getToken() {
    let token = JSON.parse(localStorage.getItem("tokenJust"));
    if (!token) throw new Error("session not found");
    return token;
  },
  async serverReq(
    method,
    url,
    isHeader,
    data = "",
    params = "",
    formData = ""
  ) {
    let axiosConfig = {
      method: method,
      url: SERVER_URL + url,
    };
    if (params) axiosConfig.params = params;

    if (formData) {
      axiosConfig.data = formData;
    } else if (data) axiosConfig.data = { data: data };

    if (isHeader) axiosConfig.headers = await this.getAuthHeaders();

    try {
      let result = await axios(axiosConfig);
      if (method === "get" || url === "/users/login") return result.data;
      if (!!result.data && Object.keys(result.data).length !== 0)
        return result.data;
      return { status: true, message: "success" };
    } catch (error) {
      if (error.code === "ERR_NETWORK") return { error: error.message };
      return { error: error.response.data.error };
    }
  },

  async getUser() {
    let result = await this.serverReq("get", "/users", true);
    if (result.error) throw new Error(result.error);
    let usrData = {
      ...result.data,
      password: "",
    };
    return usrData;
  },
  async login(login, passw) {
    let reqData = {
      email: login,
      password: passw.toString(),
    };
    let result = await this.serverReq("post", "/users/login", false, reqData);
    if (result.error) throw new Error(result.error);
    if (!result.token) throw new Error("no new session");

    let token = result.token;
    localStorage.setItem("Auth", "true");
    localStorage.setItem("tokenJust", JSON.stringify(token));
    return { status: true, role: result.role };
  },
  async logout() {
    let result = await this.serverReq("delete", "/users/logout", true);
    if (!result.error) {
      localStorage.setItem("Auth", "false");
      localStorage.removeItem("tokenJust");
    }
    return result;
  },
};
export default BaseAPI;
