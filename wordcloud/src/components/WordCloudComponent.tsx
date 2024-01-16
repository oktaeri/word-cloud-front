import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WordCountService } from "../services/WordCountsService";
import { IResultDTO } from "../dto/IResultDTO";
import ReactWordcloud from "react-wordcloud";

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

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

      const wordCloudService = new WordCountService();

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
        <ReactWordcloud words={wordCounts}/>
  );
}

export default WordCloudComponent;
