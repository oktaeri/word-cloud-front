import React, { useState } from "react";
import { UploadService } from "../services/UploadService";

const UploadComponent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [minimumCount, setMinimumCount] = useState<number>(0);
  const [filterCommonWords, setFilterCommonWords] = useState<boolean>(false);
  const [customWords, setCustomWords] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const uploadService = new UploadService();

      try {
        await uploadService.uploadFile(file, minimumCount, filterCommonWords, customWords);
        console.log("File uploaded successfully!");
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <br />
      <label>Minimum Count: </label>
      <input type="number" value={minimumCount} onChange={(e) => setMinimumCount(Number(e.target.value))} />
      <br />
      <label>Filter Common Words: </label>
      <input type="checkbox" checked={filterCommonWords} onChange={(e) => setFilterCommonWords(e.target.checked)} />
      <br />
      <label>Custom Words: </label>
      <input type="text" value={customWords} onChange={(e) => setCustomWords(e.target.value)} />
      <br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadComponent;
