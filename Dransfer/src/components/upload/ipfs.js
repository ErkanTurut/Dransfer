//const IPFS = require("ipfs-http-client");
import { create, globSource } from "ipfs-http-client";
import * as fs from "fs";
import axios from "axios";
import FormData from "form-data";
import { Buffer } from "buffer";

const projectId = "2CDMVDtBBlDw895YROyH9azDwCb";
const projectSecret = "8b7961627bdac977f7cfb3974e871b55";

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const pin_rm = async (_path) => {
  const res = await axios
    .post("https://ipfs.infura.io:5001/api/v0/pin/rm", "", {
      params: {
        arg: _path,
      },
      headers: {
        Authorization: auth,
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
      headers: {
        Authorization: auth,
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

  //console.log(fs.readFileSync(`./test/text.txt`));
  console.log(_files);
  //console.log(Object.keys(_files));

  for (let i = 0; i < _files.length; i++) {
    //console.log(Object.keys(new Int8Array(_files[i].result)));
    console.log(Buffer.from(Object.keys(new Int8Array(_files[i].result))));
    //console.log(_files[i].result);
    //const data = fs.readFileSync(`./test/${dir[i]}`);
    form.append(
      "path",
      Buffer.from(Object.keys(new Int8Array(_files[i].result))),
      _files[i].path
    );
  }
  console.log(form);

  //metadata is optional

  // const res = await axios
  //   .post("https://ipfs.infura.io:5001/api/v0/add", form, {
  //     params: {
  //       "wrap-with-directory": true,
  //       recursive: true,
  //     },
  //     headers: {
  //       Authorization: auth,
  //     },
  //   })
  //   .catch(function (error) {
  //     if (error.response) {
  //       // Request made and server responded
  //       console.log(error.response.data);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       console.log(error.request);
  //     } else {
  //       // Something happened in setting up the request that triggered an Error
  //       console.log("Error", error.message);
  //     }
  //   });

  // console.log(res.data);
};

ipfsAdd();

export default ipfsAdd;
