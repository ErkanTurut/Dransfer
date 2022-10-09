//const IPFS = require("ipfs-http-client");
import React from "react";
import axios from "axios";
import FormData from "form-data";

const projectId = import.meta.env.VITE_PROJECT_ID;
const projectSecret = import.meta.env.VITE_PROJECT_SECRET;

const pin_rm = async (_path) => {
  const res = await axios
    .post("https://ipfs.infura.io:5001/api/v0/pin/rm", "", {
      params: {
        arg: _path,
      },
      auth: {
        username: projectId,
        password: projectSecret,
      },
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
  console.log(res.data.Pins);
};

const pin_ls = async () => {
  const res = await axios
    .post("https://ipfs.infura.io:5001/api/v0/pin/ls", "", {
      params: {
        type: "recursive",
      },
      auth: {
        username: projectId,
        password: projectSecret,
      },
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
  const path = Object.keys(res.data.Keys);
  for (let i = 0; i < path.length; i++) {
    pin_rm(path[i]);
  }
};

//pin_ls();

const ipfsAdd = async (
  _files,
  setProgress,
  setIsSent,
  isDirWrap,
  isPinned,
  isOnlyhash
) => {
  console.log(_files);
  const form = new FormData();

  for (var key in _files) {
    const blob = await new Blob([_files[key].result]);
    await form.append("path", blob, _files[key].path);
  }

  const res = await axios
    .post("https://ipfs.infura.io:5001/api/v0/add", form, {
      params: {
        "wrap-with-directory": isDirWrap,
        recursive: true,
        pin: isPinned,
        "only-hash": isOnlyhash,
      },
      auth: {
        username: projectId,
        password: projectSecret,
      },
      transformResponse: [
        function (data) {
          data = JSON.parse("[" + data.split("}\n{").join("},{") + "]");
          return data;
        },
      ],
      onUploadProgress: (progressEvent) => {
        setIsSent(false);
        const totalLength = progressEvent.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader("content-length") ||
            progressEvent.target.getResponseHeader(
              "x-decompressed-content-length"
            );
        if (totalLength !== null) {
          setProgress(Math.round((progressEvent.loaded * 100) / totalLength));
        }
      },
    })
    .catch(function (error) {
      setIsSent(null);
      setProgress(0);
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      return null;
    });
  //console.log(res);
  //setIsSent(true);
  console.log(res);
  return res.data[res.data.length - 1].Hash;
  //dagResolve(res.data[res.data.length - 1].Hash);
};

const dagResolve = async (_hash) => {
  const res = await axios
    .post("https://ipfs.infura.io:5001/api/v0/dag/get", "", {
      params: {
        arg: _hash,
      },
      auth: {
        username: projectId,
        password: projectSecret,
      },
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
  console.log(res.data);
};

const ipfsCat = async (_hash) => {
  const res = await axios
    .post("https://ipfs.infura.io:5001/api/v0/cat", "", {
      params: {
        arg: _hash,
      },
      auth: {
        username: projectId,
        password: projectSecret,
      },
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
  console.log(res.data);
};

const get = async (_hash) => {
  const res = await axios
    .post("https://ipfs.infura.io:5001/api/v0/get", "", {
      params: {
        arg: _hash,
        output: "./",
      },
      auth: {
        username: projectId,
        password: projectSecret,
      },
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
  console.log(res.data);
};

const ipfsPinAdd = async (_hash) => {
  const res = await axios
    .post("https://ipfs.infura.io:5001/api/v0/pin/add", "", {
      params: {
        arg: _hash,
      },
      auth: {
        username: projectId,
        password: projectSecret,
      },
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
  console.log(res);
};

const ipfsPinRm = async (_hash) => {
  const res = await axios
    .post("https://ipfs.infura.io:5001/api/v0/pin/rm", "", {
      params: {
        arg: _hash,
      },
      auth: {
        username: projectId,
        password: projectSecret,
      },
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
  console.log(res);
};

export default ipfsAdd;
