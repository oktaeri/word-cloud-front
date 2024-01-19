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
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(
    null
  );

  const [renderAsList, setRenderAsList] = useState<boolean>(false);
  const [renderAsCloud, setRenderAsCloud] = useState<boolean>(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState<boolean>(false);

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
            const updatedResponse = await wordCloudService.getWordCounts(
              userToken
            );

            if (updatedResponse.status === 200) {
              clearInterval(intervalId);
              setStatusMessage(null);
              const fetchedWordCounts: IResultDTO[] = updatedResponse.data;
              setWordCounts(fetchedWordCounts);
            }
          }, 5000);
        } else if (response.status === 200) {
          const fetchedWordCounts: IResultDTO[] = response.data;
          setWordCounts(fetchedWordCounts);
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

  const handleListButton = () => {
    setCopiedToClipboard(false);
    setRenderAsList(true);
    setRenderAsCloud(false);
  };

  const handleCloudButton = () => {
    setCopiedToClipboard(false);
    setRenderAsCloud(true);
    setRenderAsList(false);
  };

  const handleCopyToClipboardButton = () => {
    navigator.clipboard.writeText(JSON.stringify(wordCounts, null, " "));
    setCopiedToClipboard(true);
  };

  const options = {
    rotations: 0,
    scale: "log" as Scale,
  };

  return (
    <div className="container text-center content-container">
      {statusMessage ? (
        <div>
          <div className="transparent-image-container">
            <img src="/images/cloud.png" alt="cloud" height="100px" />
          </div>
          <h3 className="word-cloud-title main-title">{statusMessage.title}</h3>
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
          <div className="transparent-image-container">
            <img src="/images/cloud.png" alt="cloud" height="100px" />
          </div>
          <h1 className="word-cloud-title main-title">Your result is ready!</h1>
          <h4 className="pb-2">Token: {userToken}</h4>
          <p>You can view your result as a JSON list or a word cloud</p>
          {!renderAsCloud && !renderAsList ? (
            <p>Please choose which format you'd like to see</p>
          ) : (
            <p>
              You can change the format anytime, just click on the button! :)
            </p>
          )}
          <div>
            <button
              className="btn btn-primary m-2 word-cloud-button"
              onClick={handleListButton}
            >
              List
            </button>
            <button
              className="btn btn-primary word-cloud-button"
              onClick={handleCloudButton}
            >
              Cloud
            </button>
            <Link to="/" className="btn btn-secondary word-cloud-button m-2">
              Home
            </Link>
          </div>
          {renderAsList && (
            <div className="json-container container d-flex flex-row-reverse align-items-start p-3 mb-3">
              <button
                className="btn btn-light btn-sm copy-btn flex-row "
                onClick={handleCopyToClipboardButton}
              >
                Copy
              </button>
              {copiedToClipboard && (
                <span className="text-success px-2 copy-text pt-1">
                  Copied!
                </span>
              )}
              <div className="container text-start flex-row">
                <pre>{JSON.stringify(wordCounts, null, " ")}</pre>
              </div>
            </div>
          )}
          {renderAsCloud && (
            <div className="word-cloud-container">
              <div className="word-cloud">
                <ReactWordcloud options={options} words={wordCounts} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WordCloudComponent;
