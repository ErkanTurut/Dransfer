import React, { useEffect, useState } from "react";
import { fileSize, totalSize } from "./catchFile";
import { useFeeData, useSigner, useContract } from "wagmi";
import ipfsAdd from "../assets/upload/ipfs";
import { Buffer } from "buffer";
import Send from "./send";
import { toast } from "react-toastify";
import DransferStorage from "../../../artifacts/contracts/Dransfer.sol/DransferStorage.json";
//import getCurrency from "../../utils/getCurrency";

const Settings = (props) => {
  const {
    files,
    setHandleNextClick,

    setFileSettings,
    fileSettings,
  } = props;

  const sizePrice = 5;
  const storagePrice = 2.45;

  const [hash, setHash] = useState("");
  const [progress, setProgress] = useState(0);
  const [isSent, setIsSent] = useState(null);

  const { data: signer } = useSigner();
  const contract = useContract({
    addressOrName: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    contractInterface: DransferStorage.abi,
    signerOrProvider: signer,
  });

  const { data } = useFeeData({
    chainId: 1,
    formatUnits: "gwei",
    watch: true,
    staleTime: 60_000,
    onError(error) {
      console.log("Error", error);
    },
  });

  const sending = async (fileSettings) => {
    const { title, description, storeInWallet, lockFile } = fileSettings;
    console.log(files);

    const filesHash = await ipfsAdd(
      files,
      setProgress,
      setIsSent,
      false, //wrap with directory
      false, //pin
      false //only hash
    );
    console.log(filesHash);

    if (!filesHash) {
      toast.error("Error uploading files");
      return;
    }

    let filesMetadata = {
      title: "Asset Metadata",
      type: "application/json",
      id: 0,
      files: {
        type: "string",
        value: filesHash,
      },
      propeties: {
        title: {
          type: "string",
          value: title,
        },
        description: {
          type: "string",
          value: description,
        },
      },
      settings: {
        storeInWallet: {
          type: "boolean",
          value: storeInWallet,
        },
        lockFile: {
          type: "boolean",
          value: lockFile,
        },
      },
      size: totalSize(files),
      date: Date.now(),
    };
    console.log(filesMetadata);

    const buffer = Buffer.from(JSON.stringify(filesMetadata));

    filesMetadata = new File(buffer, "filesMetadata.json");

    filesMetadata.result = buffer;
    filesMetadata.path = "filesMetadata.json";

    setProgress(0);
    const metadataHash = await ipfsAdd(
      [filesMetadata],
      setProgress,
      setIsSent,
      false, //wrap with directory
      false, //pin
      false //only hash
    );

    if (!metadataHash) {
      toast.error("Error uploading metadata");
      return;
    }

    setHash(metadataHash);
    setIsSent(true);
    // const filesSettings = {
    //   id: 0,
    //   hash: filesHash,
    //   title: title,
    //   description: message,
    //   locked: true,
    //   stored: storeInWalletCheck,
    //   //owner: "any",
    //   //files: File[];
    //   size: totalSize(files),
    //   date: Date.now(),
    // };
    // if (storeInWalletCheck) {
    //   if (!isConnected) {
    //     toast.warn("Please connect your wallet.");
    //     setShowModal(true);
    //   } else {
    //     ipfsAdd(files, setHash, setProgress, setIsSent);
    //   }
    // } else {
    //   ipfsAdd(files, setHash, setProgress, setIsSent);
    // }
  };

  useEffect(() => {
    if (isSent) {
      toast.success("File sent successfully.");
      if (fileSettings.storeInWalletCheck && hash.length > 0) {
        contract.store(hash).then((tx) => {
          toast.success("File added to wallet.");
        });
      }
    }
  }, [isSent]);

  return isSent != null ? (
    <Send
      fileSettings={fileSettings}
      isSent={isSent}
      hash={hash}
      progress={progress}
    />
  ) : (
    <div
      className="d-flex flex-column flex-grow-1 justify-content-between"
      method="post"
    >
      {fileSettings.storeInWalletCheck ? (
        <span className="badge bg-danger" style={{ position: "absolute" }}>
          {/* {Number(data.formatted.gasPrice).toFixed(2)} Gwei */}
        </span>
      ) : (
        ""
      )}

      <div
        className="d-flex flex-column flex-grow-1 justify-content-start"
        style={{ paddingBottom: "0px" }}
      >
        <div>
          <h4>Settings</h4>
          <h6 className="text-muted mb-2">
            File size : <strong>{fileSize(totalSize(files))}</strong>
          </h6>
          {/* <div className="table-responsive">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td>Size price</td>
                  <td>{sizePrice} €</td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <select
                        className="form-select"
                        style={{
                          borderWidth: "0px",
                          textAlign: "center",
                          width: "86.5px",
                          paddingRight: "0px",
                          paddingLeft: "0px",
                          paddingTop: "0px",
                          paddingBottom: "0px",
                          background: "var(--bs-body-bg)",
                        }}
                        defaultValue={12}
                      >
                        <option value={12}>7 days </option>
                        <option value={13}>1 month</option>
                      </select>
                    </div>
                  </td>
                  <td>{storagePrice} €</td>
                </tr>
              </tbody>
              <tfoot
                style={{
                  borderRadius: "0px",
                  borderTop: "2px dashed var(--ref-gray)",
                }}
              >
                <tr>
                  <td>Total price</td>
                  <td>{sizePrice + storagePrice} €</td>
                </tr>
              </tfoot>
            </table>
          </div> */}
        </div>
        <div className="form-check form-switch text-start">
          <input
            key={1}
            className="form-check-input"
            type="checkbox"
            id="formCheck-1"
            checked={fileSettings.storeInWallet}
            onChange={() =>
              setFileSettings({
                ...fileSettings,
                storeInWallet: !fileSettings.storeInWallet,
              })
            }
          />
          <label
            className="form-check-label"
            htmlFor="formCheck-1"
            style={{ baground: "var(--bs-light)" }}
          >
            Store the file in my wallet
          </label>
        </div>
        <div className="form-check form-switch text-start">
          <input
            key={2}
            className="form-check-input"
            type="checkbox"
            id="formCheck-2"
            checked={fileSettings.lockFile}
            onChange={() =>
              setFileSettings({
                ...fileSettings,
                lockFile: !fileSettings.lockFile,
              })
            }
          />
          <label
            className="form-check-label"
            htmlFor="formCheck-2"
            style={{ baground: "var(--bs-light)" }}
          >
            Lock the file
          </label>
        </div>
        <textarea
          className="form-control"
          style={{
            marginTop: "10px",
            resize: "none",
            height: "10px",
          }}
          placeholder="Title"
          maxLength="20"
          onChange={(e) =>
            setFileSettings({ ...fileSettings, title: e.target.value })
          }
          defaultValue={fileSettings.title}
        />
        <textarea
          className="form-control"
          style={{ marginTop: "10px", height: "100%" }}
          placeholder="Your message"
          maxLength="150"
          onChange={(e) =>
            setFileSettings({ ...fileSettings, description: e.target.value })
          }
          defaultValue={fileSettings.description}
        />
      </div>
      <div
        className="d-flex flex-grow-1 justify-content-between justify-content-xl-center align-items-xl-center"
        style={{ paddingTop: "0px", marginTop: "15px" }}
      >
        <button
          className="btn btn-outline-light btn-sm d-flex justify-content-center align-items-center align-items-lg-center d-block w-50"
          type="button"
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            marginRight: "10px",
          }}
          onClick={setHandleNextClick.toggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-128 0 512 512"
            width="1em"
            height="1em"
            fill="currentColor"
          >
            {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
            <path d="M137.4 406.6l-128-127.1C3.125 272.4 0 264.2 0 255.1s3.125-16.38 9.375-22.63l128-127.1c9.156-9.156 22.91-11.9 34.88-6.943S192 115.1 192 128v255.1c0 12.94-7.781 24.62-19.75 29.58S146.5 415.8 137.4 406.6z" />
          </svg>
          Return
        </button>
        <button
          className="btn btn-primary btn-sm d-flex justify-content-center align-items-center d-block w-100"
          type="button"
          onClick={() => {
            sending(fileSettings);
          }}
          disabled={isSent}
        >
          Send
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="1em"
            height="1em"
            fill="currentColor"
            style={{ marginLeft: "5px" }}
          >
            {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
            <path d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Settings;
