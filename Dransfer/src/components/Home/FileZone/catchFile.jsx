import { useState } from "react";
import { Buffer } from "buffer";
import { useDropzone } from "react-dropzone";

export const fileType = (fileName) => {
  return (
    fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
    fileName
  );
};

export const fileSize = (_size) => {
  if (_size == 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(_size) / Math.log(k));
  return parseFloat((_size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const validateFile = (_file) => {
  //console.log(file);
  const invalidTypes = [];
  if (invalidTypes.indexOf(_file.type) != -1) {
    return false;
  }
  return true;
};

export const removeFile = (_result, _files, _setFiles) => {
  const selectedFileIndex = _files.findIndex((e) => e.result === _result);
  _files.splice(selectedFileIndex, 1);
  // update selectedFiles array
  _setFiles([..._files]);
};

export const removeError = (_name, _errorFiles, _setErrorFiles) => {
  const selectedFileIndex = _errorFiles.findIndex((e) => e.name === name);
  _errorFiles.splice(selectedFileIndex, 1);
  // update selectedFiles array
  _setErrorFiles([..._errorFiles]);
};

export const upload = (_files) => {
  const res = ipfsAdd(_files);
  console.log(res);
  res.then((r) => {
    console.log(r);
  });
};

export const totalSize = (_files) => {
  let total = 0;
  for (let i = 0; i < _files.length; i++) {
    total += _files[i].size;
  }
  return total;
};
const CatchFile = (props) => {
  //console.log(props);
  const { maxSize, files, setFiles, setErrorFiles } = props;

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    acceptedFiles.forEach(async (file) => {
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onloadend = async () => {
        //console.log(totalSize, file.size, maxSize);
        if (maxSize && totalSize(files) + file.size > maxSize) {
          console.log("ok");
          file.error = `You have exceeded the maximum size of ${fileSize(
            maxSize
          )}`;
          setErrorFiles((curr) => [...curr, file]);
        } else if (!validateFile(file)) {
          file.error = "This file type is not supported.";
          setErrorFiles((curr) => [...curr, file]);
        } else {
          file.result = await Buffer.from(reader.result);
          setFiles((curr) => [...curr, file]);
        }
      };
    });
  };
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <div
      className="form-control form-control-sm text-muted"
      style={{
        height: "100%",
        borderRadius: "10px",
      }}
      {...getRootProps({})}
    >
      <input {...getInputProps({})} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>
          Drag 'n' drop some files here, or click to select files
          <br />
          {maxSize ? <small>Maximum size of {fileSize(maxSize)} </small> : ""}
        </p>
      )}
      <p>{fileSize(totalSize(files))}</p>
    </div>
  );
};

export default CatchFile;
