import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WordCloudService } from "../services/WordCloudService";
import { IResultDTO } from "../dto/IResultDTO";

// Example component
function WordCloudComponent() {
  const { userToken } = useParams<{ userToken?: string }>();
  const [wordCounts, setWordCounts] = useState<IResultDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(userToken);
      if (!userToken) {
        console.error("User token not provided.");
        return;
      }

      const wordCloudService = new WordCloudService();

      try {
        const fetchedWordCounts: IResultDTO[] =
          await wordCloudService.getWordCounts(userToken);
        setWordCounts(fetchedWordCounts);
        console.log("Word Counts:", fetchedWordCounts);
      } catch (error) {
        console.error("Error fetching word counts:", error);
      }
    };

    fetchData();
  }, [userToken]);

  return (
    <div>
      <h1>Word Cloud Counts</h1>
      {userToken && <p>User Token: {userToken}</p>}
      <ul>
        {wordCounts.map((result, index) => (
          <li key={index}>
            Word: {result.word}, Count: {result.count}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WordCloudComponent;
