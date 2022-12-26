import axios from "axios";
import FormData from "form-data";

const projectId = "2CDMVDtBBlDw895YROyH9azDwCb";
const projectSecret = "8b7961627bdac977f7cfb3974e871b55";

const dag_put = async () => {
  const filesMetadata = [
    {
      data: {
        type: "object",
        properties: {
          name: { type: "string" },
          age: { type: "number" },
        },
      },
    },
  ];

  const form = new FormData();

  const buffer = Buffer.from(JSON.stringify(filesMetadata));
  filesMetadata.result = buffer;
  filesMetadata.path = "filesMetadata.json";

  const blob = new Blob([filesMetadata.result]);
  form.append("path", blob, filesMetadata.path);

  const res = await axios
    .post("https://ipfs.infura.io:5001/api/v0/dag/put", form, {
      params: {
        "wrap-with-directory": false,
        recursive: true,
        pin: true,
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
      return null;
    });
  //console.log(res);
  //setIsSent(true);
  console.log(res);
};

const dag_get = async (CID) => {
  const res = await axios
    .get("https://ipfs.infura.io:5001/api/v0/dag/get", {
      params: {
        arg: CID,
      },
      auth: {
        username: projectId,
        password: projectSecret,
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
};

dag_put();
