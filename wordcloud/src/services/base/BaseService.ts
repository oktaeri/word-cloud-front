import Axios, { AxiosInstance } from "axios";

export abstract class BaseService {
  protected axios: AxiosInstance;

  constructor(baseURL: string) {
    this.axios = Axios.create({
      baseURL: "http://localhost:8080/api/v1/" + baseURL,
    });
  }
}
