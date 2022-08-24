const Header = ({}) => {
  return (
    <>
      <header className="bg-dark py-5">
        <div className="container py-3">
          <div className="row py-5">
            <div className="col-md-6 text-center text-md-start d-print-flex d-md-flex d-lg-flex d-xl-flex d-xxl-flex justify-content-center align-items-center order-last order-sm-last justify-content-md-start align-items-md-center order-md-first order-lg-first justify-content-xl-end order-xl-first order-xxl-first mb-4">
              <div style={{ height: "250px" }}>
                <p className="fw-bold text-success mb-2">Special Offer</p>
                <h2 className="fw-bold">
                  Envoie tes fichiers dans un univers décentralisé
                </h2>
                <p className="my-3">
                  Dictumst magna ultricies justo auctor. Gravida morbi etiam id,
                  magna lacinia augue.
                </p>
                <button className="btn btn-primary" type="button">
                  En apprendre plus
                </button>
              </div>
            </div>
            <div className="col-md-6 text-center mb-4">
              <div className="row d-flex justify-content-center">
                <div
                  className="col-lg-9 col-xl-8 col-xxl-7"
                  style={{ paddingLeft: "12px", paddingRight: "12px" }}
                >
                  <div className="card mb-0" style={{ overflow: "hidden" }}>
                    <div className="card-body p-sm-3">
                      <form
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
                              File size : <strong>23MB</strong>
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
                                        >
                                          <option value={12} selected>
                                            7 days
                                          </option>
                                          <option value={13}>1 month</option>
                                        </select>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="-64 0 512 512"
                                          width="1em"
                                          height="1em"
                                          fill="currentColor"
                                        >
                                          {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
                                          <path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z" />
                                        </svg>
                                      </div>
                                    </td>
                                    <td>0€</td>
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
                                    <td>0 €</td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                          <div className="form-check form-switch text-start">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="formCheck-2"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="formCheck-2"
                            >
                              Send a transfer by wallet
                            </label>
                          </div>
                          <input
                            className="form-control form-control"
                            type="text"
                            placeholder="Wallet address"
                            style={{ marginTop: "5px" }}
                            pattern="^0x[a-fA-F0-9]{40}$"
                          />
                          <textarea
                            className="form-control"
                            style={{ marginTop: "10px" }}
                            placeholder="Your message"
                            defaultValue={""}
                          />
                        </div>
                        <div
                          className="d-flex flex-grow-1 justify-content-between justify-content-xl-center align-items-xl-center"
                          style={{ paddingTop: "0px", marginTop: "15px" }}
                        >
                          <button
                            className="btn btn-primary btn-sm d-flex justify-content-center align-items-center d-block w-100"
                            type="submit"
                          >
                            Next
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="-128 0 512 512"
                              width="1em"
                              height="1em"
                              fill="currentColor"
                            >
                              {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
                              <path d="M118.6 105.4l128 127.1C252.9 239.6 256 247.8 256 255.1s-3.125 16.38-9.375 22.63l-128 127.1c-9.156 9.156-22.91 11.9-34.88 6.943S64 396.9 64 383.1V128c0-12.94 7.781-24.62 19.75-29.58S109.5 96.23 118.6 105.4z" />
                            </svg>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
