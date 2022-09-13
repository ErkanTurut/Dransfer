import Item from "./item";

function Transfers() {
  const files = [
    {
      title: "test",
      date: "2021-10-10",
      size: "10MB",
      status: true,
      hash: "QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ",
    },
    {
      title: "test",
      date: "2021-10-10",
      size: "10MB",
      status: false,
      hash: "QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ",
    },
  ];
  return (
    <section className="py-5 mt-5">
      <div className="container py-5">
        <div className="row mb-4 mb-lg-5">
          <div className="col-md-8 col-xl-6 text-center mx-auto">
            <h2 className="fw-bold">Transfers</h2>
            <p className="text-muted w-lg-50">
              No matter the project, our team can handle it.&nbsp;
            </p>
          </div>
        </div>
        <div className="row justify-content-center align-items-start">
          <div className="col-lg-9 col-xl-8 col-xxl-7">
            <div
              className="card"
              style={{
                background: "var(--bs-body-color)",
                borderRadius: "10px",
              }}
            >
              <div className="card-body">
                <ul
                  className="nav d-flex justify-content-between"
                  style={{ marginBottom: "25px", paddingBottom: "0px" }}
                >
                  <li className="nav-item d-flex justify-content-start align-items-center">
                    <h4
                      className="fw-semibold text-dark"
                      style={{ marginBottom: "0px" }}
                    >
                      Files
                    </h4>
                  </li>
                  <li
                    className="nav-item d-flex"
                    style={{
                      paddingLeft: "0px",
                      gap: "0.5em",
                      marginLeft: "10px",
                    }}
                  >
                    <button
                      className="btn btn-dark btn-sm shadow-none"
                      type="button"
                      style={{ borderRadius: "10px" }}
                    >
                      Sent
                    </button>
                    <button
                      className="btn btn-outline-dark btn-sm shadow-none"
                      type="button"
                      style={{ borderRadius: "10px" }}
                    >
                      Received
                    </button>
                  </li>
                </ul>
                {files.length > 0 ? (
                  <ul
                    className="list-group text-break text-start"
                    style={{
                      gap: "0.5em",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    {files.map((file) => {
                      return (
                        <Item
                          title={file.title}
                          date={file.date}
                          size={file.size}
                          status={file.status}
                          hash={file.hash}
                        />
                      );
                    })}
                  </ul>
                ) : (
                  <span
                    className="d-flex flex-column flex-grow-1 justify-content-center align-items-center align-items-lg-center text-black"
                    style={{ gap: "10px" }}
                  >
                    <img
                      src="src/assets/img/capypasta.svg"
                      style={{ width: "200px" }}
                    />
                    noting...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Transfers;
