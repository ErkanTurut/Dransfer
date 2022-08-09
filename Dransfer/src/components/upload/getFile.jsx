import { useCallback, useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import capybara from "../../assets/capybara.svg";

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const Dropzone = () => {
  const [files, setFiles] = useState([]);
  const [errorFiles, setErrorFiles] = useState([]);

  const fileSize = (size) => {
    if (size == 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const fileType = (fileName) => {
    return (
      fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
      fileName
    );
  };

  const validateFile = (file) => {
    console.log(file);
    const invalidTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/x-icon",
    ];
    if (invalidTypes.indexOf(file.type) != -1) {
      return false;
    }
    return true;
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onloadend = async () => {
        if (validateFile(file)) {
          file.result = reader.result;
          //const filesMap = await acceptedFiles.map((file) => file);
          setFiles((curr) => [...curr, file]);
        } else {
          file.error = "This file type is not supported.";
          //const filesMap = await acceptedFiles.map((file) => file);
          setErrorFiles((curr) => [...curr, file]);
        }
      };
    });
  }, []);

  const removeFile = (name) => {
    const selectedFileIndex = files.findIndex((e) => e.name === name);
    files.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setFiles([...files]);
  };

  const removeError = (name) => {
    const selectedFileIndex = errorFiles.findIndex((e) => e.name === name);
    errorFiles.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setErrorFiles([...errorFiles]);
  };

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({ onDrop });

  /*
  useEffect(() => {
    let filteredArray = files.reduce((file, current) => {
      console.log(current.result);
      console.log(...file);

      const x = file.find((...item) => item.result === current.result);
      console.log(x);
      if (!x) {
        return file.concat([current]);
      } else {
        return file;
      }
    }, []);
    setValidFiles([...filteredArray]);
  }, [files]);
*/

  return (
    <div className="container">
      <ToastContainer
        className="p-2  overflow-hidden"
        position="top-start"
        style={{
          maxHeight: "300px",
          marginTop: "2em",
        }}
      >
        {errorFiles.map((data) => (
          <Toast
            className="m-4"
            onClose={() => removeError(data.name)}
            style={{ width: "20em" }}
          >
            <Toast.Header className="justify-content-between">
              <img
                src={capybara}
                className="rounded me-2"
                style={{ height: "3em" }}
                alt=""
              />
              {data.name}
            </Toast.Header>
            <Toast.Body>{data.error}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>

      <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps({})} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </Container>

      <Row
        as="div"
        className="overflow-auto"
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxHeight: "300px",
          marginTop: "10px",
        }}
      >
        <ListGroup as="ol" variant="flush" style={{ marginTop: "10px" }}>
          {files.map((data, i) => (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start shadow p-3 mb-2 bg-white rounded"
              key={i}
              style={{ textAlign: "left" }}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{data.name}</div>
                {fileSize(data.size)}
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFile(data.name)}
              >
                X
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
    </div>
  );
};

export default Dropzone;
/*
<div className="fileStatusBar" key={i}>
              <div>
                <div className="file-type-logo"></div>
                <div className="file-type">{fileType(data.name)}</div>
                <span
                  className={`file-name ${data.invalid ? "file-error" : ""}`}
                >
                  {data.name}
                </span>
                <span className="file-size">({fileSize(data.size)})</span>{" "}
                {data.invalid && (
                  <span className="file-error-message">({errorMessage})</span>
                )}
              </div>
              <div className="file-remove">X</div>
            </div>
*/
