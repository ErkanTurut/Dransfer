import { rejects } from "assert";
import { useEffect } from "react";

function uploadFile(file,onProgress){
    const url = "......"
    return new Promise((res,rej)=>{
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url)

        xhr.onload = ()=> {
            res("url - where cloudinary saved the file")
        }
        xhr.onerror = (event) => rejects(event);
        xhr.upload.onprogress = (event) => {
            if(event.lengthComputable){
                const percentage = (event.loaded/event.total)*100;
                onProgress(Math.round(percentage))
            }
        }
        const formData = FormData();
        formData.append('file', file)
        formData.append('key', key)
        xhr.send(FormData)
    })
}

const singleFileUpload = (file) => {
  useEffect(() => {
    function upload(){
        const url = await uploadFile(file)
    }
    upload()
  }, []);
  return <div>nothing</div>;
};

export default singleFileUpload;
