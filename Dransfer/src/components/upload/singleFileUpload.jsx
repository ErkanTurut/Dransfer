import { useEffect } from "react";

function uploadFile(file, onProgress) {
  const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
  const key = "docs_upload_example_us_preset";
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.onload = () => {
      res("url - where cloudinary saved the file");
    };
    xhr.onerror = (evt) => rej(evt);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentage));
      }
    };
    const formData = FormData();
    formData.append("file", file);
    formData.append("upload_preset", key);
    xhr.send(FormData);
  });
}

const singleFileUpload = (file) => {
  useEffect(() => {
    async function upload() {
      const url = await uploadFile(file);
    }
    upload();
  }, []);
  return <div>nothing</div>;
};

export default singleFileUpload;
