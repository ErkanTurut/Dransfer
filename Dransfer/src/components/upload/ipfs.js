//const IPFS = require("ipfs-http-client");
import { create, globSource } from "ipfs-http-client";
import * as fs from "fs";
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

const ipfsAdd = async (_files) => {
  const form = new FormData();
  // form.append("path", data, "test2.txt");
  //form.append("path", data2, "test3.txt");
  //form.append("path", data3);
  //const dir = fs.readdirSync("./test");

  console.log(_files);
  //console.log(Object.keys(_files));

  for (var key in _files) {
    //console.log(Object.keys(new Int8Array(_files[i].result)));
    //console.log(Buffer.from(Object.keys(new Int8Array(_files[i].result))));
    //console.log(new Int8Array(_files[i].result));
    // console.log(new Blob(Object.keys(new Int8Array(_files[i].result))));
    //console.log(_files[i].result);
    //const data = fs.readFileSync(`./test/${dir[i]}`);
    //   console.log("ok");
    //   form.append(
    form.append(
      "path",
      new Blob(new Int8Array(_files[key].result)),
      _files[key].path
    );
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
  // const dataArray = JSON.parse("[" + res.data.split("}\n{").join("},{") + "]");
  // console.log(
  //   `https://dransfer.infura-ipfs.io/ipfs/${
  //     dataArray[dataArray.length - 1].Hash
  //   }`
  // );
};

export default ipfsAdd;
