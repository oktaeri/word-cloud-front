import { BaseService } from "./base/BaseService";
import { IResultDTO } from "../dto/IResultDTO";

export class WordCountService extends BaseService {
    constructor() {
      super('wordcloud');
    }
  
    async getWordCounts(userToken: string): Promise<IResultDTO[]> {
      try {
        const response = await this.axios.get(`/${userToken}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching word counts:', error);
        throw error;
      }
    }
  }