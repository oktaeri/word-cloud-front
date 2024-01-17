import { BaseService } from "./base/BaseService";

export class UploadService extends BaseService {
  constructor() {
    super("upload");
  }

  uploadFile(file: File, minimumCount: number, filterCommonWords: boolean, customWords: string) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("minimum", String(minimumCount));
    formData.append("filterCommon", String(filterCommonWords));
    formData.append("customWords", customWords);

    return this.axios.post("", formData);
  }
}
