import Axios, { AxiosInstance } from "axios";

export abstract class BaseService {
  protected axios: AxiosInstance;

  constructor(baseURL: string) {
    this.axios = Axios.create({
      baseURL: process.env.REACT_APP_API_URL + baseURL,
    });
  }
}
