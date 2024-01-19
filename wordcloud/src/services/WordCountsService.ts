import { AxiosResponse } from "axios";
import { BaseService } from "./base/BaseService";
import { IResultDTO } from "../dto/IResultDTO";

export class WordCountService extends BaseService {
  constructor() {
    super('wordcloud');
  }

  async getWordCounts(userToken: string): Promise<AxiosResponse<IResultDTO[]>> {
    try {
      const response = await this.axios.get<IResultDTO[]>(`/${userToken}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
}