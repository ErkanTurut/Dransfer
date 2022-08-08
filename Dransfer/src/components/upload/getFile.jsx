import { useCallback, useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

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
  const [validFiles, setValidFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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
      "image/gif",
      "image/x-icon",
    ];
    if (invalidTypes.indexOf(file.type) != -1) {
      return false;
    }
    return true;
  };

  const onDrop = useCallback((files) => {
    //console.log(files);

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(files[0]);
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onloadend = () => {
      const filesMap = files.map((file) => ({ file, result: reader.result }));
      setFiles((curr) => [...curr, ...filesMap]);
    };
  }, []);
  //console.log(files);
  const removeFile = (name) => {
    console.log(files);
    const filesIndex = files.findIndex((e) => e.name === name);

    files.splice(filesIndex, 1);
    // update selectedFiles array
    setFiles([...files]);
  };

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({ onDrop });

  //console.log(files);

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

  return (
    <div className="container">
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
                <div className="fw-bold">{data.file.name}</div>
                {fileSize(data.file.size)}
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFile(data.file.name)}
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
