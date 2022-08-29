import React from "react";

import CatchFile, { fileSize, removeFile } from "./catchFile";

const FileHandler = (props) => {
  const {
    maxSize,
    files,
    setFiles,
    errorFiles,
    setErrorFiles,
    setHandleNextClick,
  } = props;
  return (
    //file cacth component
    <div
      className="d-flex flex-column flex-grow-1 justify-content-between"
      method="post"
    >
      <div
        className="d-flex flex-column flex-grow-1 justify-content-between"
        style={{ height: "295px", paddingBottom: "0px" }}
      >
        <div className="flex-fill mb-3  ">
          <CatchFile
            maxSize={false}
            files={files}
            setFiles={setFiles}
            setErrorFiles={setErrorFiles}
            errorFiles={errorFiles}
          />
        </div>
        <div
          className="mb-3 scrollbar-primary box-shadow"
          style={{
            overflow: "auto",
            borderRadius: "10px",
            position: "static",
            maxHeight: "163px",
            boxShadow: "inset 0px -29px 15px rgba(0, 0, 0, 0.25)",
          }}
        >
          <ul
            className="list-group text-start flex-fill"
            style={{ padding: "0px", gap: "0.5em" }}
          >
            {files.map((data, i) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{
                  borderRadius: "10px",
                  background: "var(--bs-light)",
                }}
                key={i}
              >
                <div
                  className="d-flex flex-row align-items-center"
                  style={{
                    whiteSpace: "nowrap",
                    gap: "0.5em",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-64 0 512 512"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    className="fs-3"
                  >
                    {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
                    <path d="M320 464C328.8 464 336 456.8 336 448V416H384V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V416H48V448C48 456.8 55.16 464 64 464H320zM256 160C238.3 160 224 145.7 224 128V48H64C55.16 48 48 55.16 48 64V192H0V64C0 28.65 28.65 0 64 0H229.5C246.5 0 262.7 6.743 274.7 18.75L365.3 109.3C377.3 121.3 384 137.5 384 154.5V192H336V160H256zM88 224C118.9 224 144 249.1 144 280C144 310.9 118.9 336 88 336H80V368C80 376.8 72.84 384 64 384C55.16 384 48 376.8 48 368V240C48 231.2 55.16 224 64 224H88zM112 280C112 266.7 101.3 256 88 256H80V304H88C101.3 304 112 293.3 112 280zM160 240C160 231.2 167.2 224 176 224H200C226.5 224 248 245.5 248 272V336C248 362.5 226.5 384 200 384H176C167.2 384 160 376.8 160 368V240zM192 352H200C208.8 352 216 344.8 216 336V272C216 263.2 208.8 256 200 256H192V352zM336 224C344.8 224 352 231.2 352 240C352 248.8 344.8 256 336 256H304V288H336C344.8 288 352 295.2 352 304C352 312.8 344.8 320 336 320H304V368C304 376.8 296.8 384 288 384C279.2 384 272 376.8 272 368V240C272 231.2 279.2 224 288 224H336z" />
                  </svg>
                  <div className="d-flex flex-column justify-content-start align-items-start">
                    <h6
                      className="fw-bold"
                      style={{
                        maxWidth: "150px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {data.name}
                    </h6>
                    <p
                      style={{
                        maxWidth: "150px",
                        marginBottom: "0px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {fileSize(data.size)}
                    </p>
                  </div>
                </div>
                <button
                  className="btn btn-danger btn-sm d-flex d-xl-flex justify-content-xl-center align-items-xl-center"
                  type="button"
                  style={{
                    borderRadius: "8px",
                    padding: "3px",
                  }}
                  onClick={() => {
                    removeFile(data.result, files, setFiles);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-96 0 512 512"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    className="fs-3"
                  >
                    {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
                    <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="d-flex flex-grow-1 justify-content-between justify-content-xl-center align-items-xl-center"
        style={{ paddingTop: "0px", marginTop: "15px" }}
      >
        <button
          className="btn btn-primary btn-sm d-flex justify-content-center align-items-center d-block w-100"
          type="button"
          onClick={setHandleNextClick.toggle}
          disabled={files.length !== 0 ? false : true}
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-128 0 512 512"
            width="1em"
            height="1em"
            fill="currentColor"
          >
            {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
            <path d="M118.6 105.4l128 127.1C252.9 239.6 256 247.8 256 255.1s-3.125 16.38-9.375 22.63l-128 127.1c-9.156 9.156-22.91 11.9-34.88 6.943S64 396.9 64 383.1V128c0-12.94 7.781-24.62 19.75-29.58S109.5 96.23 118.6 105.4z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FileHandler;
