import React, { useState, useEffect } from "react";
import { UploadService } from "../services/UploadService";
import ProgressBar from "./ProgressBar";
import { useNavigate } from "react-router-dom";
import { AxiosProgressEvent } from "axios";

import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

function UploadComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [minimumCount, setMinimumCount] = useState<string>("");
  const [filterCommonWords, setFilterCommonWords] = useState<boolean>(false);
  const [customWords, setCustomWords] = useState<string>("");
  const [showTokenInput, setShowTokenInput] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string>("");
  const [tokenError, setTokenError] = useState<string>("");
  const [fileError, setFileError] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number | undefined>(
    undefined
  );
  const navigate = useNavigate();

  useEffect(() => {
    tippy(".tooltip-trigger", {
      placement: "top",
      animation: "scale",
      content: (reference: Element) => reference.getAttribute("title") || "",
    });
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileError("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setFileError("File is required.");
      return;
    }

    const uploadService = new UploadService();

    try {
      const response = await uploadService.uploadFile(
        file,
        Number(minimumCount),
        filterCommonWords,
        customWords,
        (progressEvent: AxiosProgressEvent) => {
          const progress =
            ((progressEvent.loaded || 0) / (progressEvent.total || 1)) * 100;
          setUploadProgress(progress);
        }
      );

      const userToken = response.data;

      navigate(`/result/${userToken}`);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleViewResultClick = () => {
    setShowTokenInput(true);
  };

  const handleBackButton = () => {
    setShowTokenInput(false);
    setTokenError("");
  };

  const handleTokenSubmit = () => {
    if (!userToken) {
      setTokenError("Token is required.");
      return;
    }

    navigate(`/result/${userToken}`);
  };

  return (
    <div className="container content-container">
      <div className="text-center mb-5">
        <div className="transparent-image-container">
          <img src="/images/cloud.png" alt="cloud" height="100px" />
        </div>
        <h1 className="main-title">Welcome to WordCloud!</h1>
        {showTokenInput ? (
          <form className="needs-validation">
            <label className="form-label">Enter your token</label>
            <input
              required
              className={`form-control mb-3 ${tokenError && "is-invalid"}`}
              type="text"
              value={userToken}
              onChange={(e) => {
                setUserToken(e.target.value);
                setTokenError("");
              }}
            />
            <div className="invalid-feedback">{tokenError}</div>
            <button className="btn btn-secondary" onClick={handleBackButton}>
              Back
            </button>
            <button className="btn btn-primary" onClick={handleTokenSubmit}>
              Submit
            </button>
          </form>
        ) : (
          <p>
            Already generated a cloud?{" "}
            <button
              onClick={handleViewResultClick}
              className="btn btn-sm btn-primary"
            >
              View your result
            </button>
          </p>
        )}
      </div>

      {!showTokenInput && (
        <>
          <p className="pb-2 text-center">
            Upload your .txt file (up to 100MB) and get your Word Cloud now! :)
          </p>
          <div className="mb-3">
            {uploadProgress !== undefined && (
              <ProgressBar progress={uploadProgress} />
            )}
          </div>
          <div className="form-container mx-auto">
            <div className="form-group row mb-3">
              <label htmlFor="formFileLg" className="col-lg-4 col-form-label">
                Choose File
              </label>
              <div className="col-lg-8">
                <input
                  required
                  className={`form-control ${fileError && "is-invalid"}`}
                  type="file"
                  accept="text/plain"
                  id="formFileLg"
                  onChange={handleFileChange}
                />
                <div className="invalid-feedback">{fileError}</div>
              </div>
            </div>

            <div className="form-group row mb-3">
              <label
                htmlFor="flexCheckDefault"
                className="col-lg-4 col-form-label"
              >
                Filter Common Words{" "}
                <i
                  className="info-icon bi bi-info-circle tooltip-trigger"
                  title="Check to filter common words (the, an, a, at, ... )"
                ></i>
              </label>
              <div className="col-lg-8">
                <div className="form-check form-switch scaled-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    role="switch"
                    checked={filterCommonWords}
                    onChange={(e) => setFilterCommonWords(e.target.checked)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group row mb-3">
              <label
                htmlFor="floatingInput"
                className="col-lg-4 col-form-label"
              >
                Custom Words{" "}
                <i
                  className="info-icon bi bi-info-circle tooltip-trigger"
                  title="Add your own words to filter out (separated by commas)"
                ></i>
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  placeholder=""
                  id="floatingInput"
                  className="form-control"
                  value={customWords}
                  onChange={(e) => setCustomWords(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group row mb-3">
              <label htmlFor="minimumCount" className="col-lg-4 col-form-label">
                Minimum Count{" "}
                <i
                  className="info-icon bi bi-info-circle tooltip-trigger"
                  title="The minimum amount a word has to occur in the text to be included in the cloud"
                ></i>
              </label>
              <div className="col-lg-8">
                <input
                  className="form-control"
                  placeholder=""
                  id="minimumCount"
                  type="number"
                  value={minimumCount}
                  onChange={(e) => setMinimumCount(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <div className="col-lg-8 offset-lg-5">
                <button className="btn btn-primary" onClick={handleUpload}>
                  Upload
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UploadComponent;
