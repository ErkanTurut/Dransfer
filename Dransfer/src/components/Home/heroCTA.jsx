import React from "react";

const HeroCTA = () => {
  return (
    <div className="col-md-6 text-center text-md-start d-print-flex d-md-flex d-lg-flex d-xl-flex d-xxl-flex justify-content-center align-items-center order-last order-sm-last justify-content-md-start align-items-md-center order-md-first order-lg-first justify-content-xl-end order-xl-first order-xxl-first mb-4">
      <div style={{ height: "250px" }}>
        <p className="fw-bold text-success mb-2 linear-wipe">
          Decentralized transfer
        </p>
        <h2 className="fw-bold">Better ingredients, better pizza </h2>
        <p className="my-3">
          IPFS is a distributed file system that seeks to connect all computing
          devices with the same system of files.
        </p>
        <button className="btn btn-success" type="button">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default HeroCTA;
