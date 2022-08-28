//const IPFS = require("ipfs-http-client");
import axios from "axios";
import FormData from "form-data";
import { Buffer } from "buffer";
import * as fs from "fs";

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

const ipfsAdd = async (_files) => {
  const form = new FormData();

  for (var key in _files) {
    const blob = await new Blob([_files[key].result]);
    await form.append("path", blob, _files[key].path);
  }

  const res = await axios
    .post("https://ipfs.infura.io:5001/api/v0/add", form, {
      params: {
        "wrap-with-directory": true,
        recursive: true,
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
        const totalLength = progressEvent.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader("content-length") ||
            progressEvent.target.getResponseHeader(
              "x-decompressed-content-length"
            );
        if (totalLength !== null) {
          return Math.round((progressEvent.loaded * 100) / totalLength);
        }
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
  console.log(
    "Here is your directory \n https://dransfer.infura-ipfs.io/ipfs/" +
      res.data[res.data.length - 1].Hash
  );
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
        output: "./test.pdf",
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
