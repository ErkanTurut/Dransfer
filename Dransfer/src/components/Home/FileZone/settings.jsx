import React from "react";
import { fileSize, totalSize } from "./catchFile";
import { useFeeData } from "wagmi";
import { useAccount } from "wagmi";
const Settings = (props) => {
  const {
    maxSize,
    files,
    setStoreInWalletCheck,
    storeInWalletCheck,
    setHandleNextClick,
    setIsSendings,
    isSendings,
    showModal,
    setShowModal,
  } = props;

  const { address, isConnected, isDisconnected } = useAccount();

  const { data, isError, isLoading } = useFeeData({
    chainId: 1,
    formatUnits: "gwei",
    watch: true,
    staleTime: 2_000,
    onError(error) {
      console.log("Error", error);
    },
  });

  const sending = (storeInWalletCheck) => {
    if (storeInWalletCheck) {
      if (!isConnected) {
        setShowModal(true);
      } else {
        setIsSendings(true);
      }
    } else {
      setIsSendings(true);
    }
  };

  return (
    <div
      className="d-flex flex-column flex-grow-1 justify-content-between"
      method="post"
    >
      <div
        className="d-flex flex-column flex-grow-1 justify-content-start"
        style={{ paddingBottom: "0px" }}
      >
        <div>
          <h4>Settings</h4>
          <h6 className="text-muted mb-2">
            File size : <strong>{fileSize(totalSize(files))}</strong>
          </h6>
          <div className="table-responsive">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td>Size price</td>
                  <td>0 €</td>
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
                  <td>0€</td>
                </tr>
                {storeInWalletCheck ? (
                  <tr>
                    <td>Gas fee</td>
                    <td>{Number(data.formatted.gasPrice).toFixed(2)} Gwei</td>
                  </tr>
                ) : (
                  ""
                )}
              </tbody>
              <tfoot
                style={{
                  borderRadius: "0px",
                  borderTop: "2px dashed var(--ref-gray)",
                }}
              >
                <tr>
                  <td>Total price</td>
                  <td>0 €</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="form-check form-switch text-start">
          <input
            key={1}
            className="form-check-input"
            type="checkbox"
            id="formCheck-2"
            checked={storeInWalletCheck}
            onChange={() => setStoreInWalletCheck(!storeInWalletCheck)}
          />
          <label
            className="form-check-label"
            htmlFor="formCheck-2"
            style={{ baground: "var(--bs-light)" }}
          >
            Store the file in my wallet
          </label>
        </div>
        {/* {storeInWalletCheck ? (
          <input
            className="form-control"
            type="text"
            placeholder="Wallet address"
            style={{ marginTop: "5px" }}
            pattern="^0x[a-fA-F0-9]{40}$"
            required
          />
        ) : (
          ""
        )} */}

        <textarea
          className="form-control"
          style={{ marginTop: "10px", height: "100%" }}
          placeholder="Your message"
          defaultValue={""}
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
            sending(storeInWalletCheck);
          }}
          disabled={isSendings}
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
