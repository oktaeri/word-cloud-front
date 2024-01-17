import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { WordCountService } from "../services/WordCountsService";
import { IResultDTO } from "../dto/IResultDTO";
import ReactWordcloud, { Scale } from "react-wordcloud";
import { StatusMessage } from "../dto/IStatusMessage";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

function WordCloudComponent() {
  const { userToken } = useParams<{ userToken?: string }>();
  const [wordCounts, setWordCounts] = useState<IResultDTO[]>([]);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!userToken) {
        console.error("User token not provided.");
        return;
      }

      const wordCloudService = new WordCountService();

      try {
        const response = await wordCloudService.getWordCounts(userToken);

        if (response.status === 202) {
          setStatusMessage({
            title: `We are still processing your word cloud. Your token: ${userToken}`,
            body: "The page will refresh automatically when your cloud is finished.",
            image: "/images/cat-gif.gif",
          });

          const intervalId = setInterval(async () => {
            const updatedResponse = await wordCloudService.getWordCounts(userToken);

            if (updatedResponse.status === 200) {
              clearInterval(intervalId);
              setStatusMessage(null);
              const fetchedWordCounts: IResultDTO[] = updatedResponse.data;
              setWordCounts(fetchedWordCounts);
              console.log("Word Counts:", fetchedWordCounts);
              window.location.reload();
            }
          }, 5000);
        } else if (response.status === 200) {
          const fetchedWordCounts: IResultDTO[] = response.data;
          setWordCounts(fetchedWordCounts);
          console.log("Word Counts:", fetchedWordCounts);
        } else {
          setStatusMessage({
            title: "Error fetching word counts.",
            body: "Please try again later.",
          });
        }
      } catch (error) {
        setStatusMessage({
          title: "Token not found.",
          body: `Please check it and try again: ${userToken}`,
        });
      }
    };

    fetchData();
  }, [userToken]);

  const options = {
    rotations: 0,
    scale: "log" as Scale,
  };

  return (
    <div className="container text-center">
      {statusMessage ? (
        <div>
          <h3 className="word-cloud-title">{statusMessage.title}</h3>
          <p>{statusMessage.body}</p>
          {statusMessage.image && (
            <div className="mb-3">
              <img src={statusMessage.image} alt="" className="cat-image" />
            </div>
          )}
          <Link to="/" className="btn btn-primary word-cloud-button">
            Home
          </Link>
        </div>
      ) : (
        <div>
          <h1 className="word-cloud-title">Result for: {userToken}</h1>
          <div className="word-cloud-container">
            <div className="word-cloud">
              <ReactWordcloud options={options} words={wordCounts} />
            </div>
          </div>
          <Link to="/" className="btn btn-primary word-cloud-button">
            Home
          </Link>
        </div>
      )}
    </div>
  );
}

export default WordCloudComponent;
