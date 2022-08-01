import { useCallback, useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import singleFileUpload from "./singleFileUpload";

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

  /*
  const onDrop = useCallback((acceptedFiles) => {
    const filesMap = acceptedFiles.map((file) => ({ file, errors: [] }));
    setFiles((curr) => [curr, ...filesMap]);
  }, []);
  */

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        console.log(file);
        // Do whatever you want with the file contents
        const filesMap = acceptedFiles.map((file) => file);
        setFiles((curr) => [curr, ...filesMap]);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  console.log(files);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({ onDrop });

  //console.log(files);

  return (
    <div className="container">
      <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps({})} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
        <aside>
          <h4>Files</h4>
          {files.map((fileWrapper) => (
            <singleFileUpload file={fileWrapper.file} />
          ))}
        </aside>
      </Container>
    </div>
  );
};

export default Dropzone;
