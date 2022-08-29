import React, { useEffect } from "react";
import { useState } from "react";
import ipfsAdd from "../../upload/ipfs";
const Send = (props) => {
  const { files } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [link, setLink] = useState("");
  const [progress, setProgress] = useState(0);
  //ipfsAdd(files, setIsLoading, setLink, setProgress);

  useEffect(() => {
    ipfsAdd(files, setIsLoading, setLink, setProgress);
  }, [files]);

  return (
    <div
      className="d-flex flex-column flex-grow-1 justify-content-center align-items-center align-items-lg-center"
      style={{ gap: "10px" }}
    >
      <img
        className="img-fluid"
        src="./src/assets/img/capybara.svg"
        loading="auto"
        style={{ padding: "0px", paddingBottom: "0px", marginBottom: "15px" }}
        width={200}
      />
      {isLoading ? (
        <div style={{ width: "100%" }}>
          <p style={{ marginBottom: "0px", textAlign: "left" }}>
            To the moon...
          </p>
          <div
            className="progress"
            style={{
              width: "100%",
              height: "35px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <p className="text-center" style={{ marginBottom: "10px" }}>
            Here is your link !&nbsp;
            <a className="link-secondary" href="/">
              Again
            </a>
            <br />
          </p>
          <div className="d-flex">
            <input
              className="form-control"
              type="text"
              defaultValue={link}
              readOnly
              style={{ borderRadius: "10px", color: "var(--bs-dark)" }}
            />
            <button
              className="btn btn-success btn-sm"
              type="button"
              style={{ borderRadius: "10px", marginLeft: "10px" }}
              onClick={() => {
                navigator.clipboard.writeText(link);
              }}
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Send;
