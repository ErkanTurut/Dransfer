import React from "react";

import Header from "./header";

function Home(props) {
  const { setShowModal, showModal } = props;
  return (
    <>
      <Header showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

export default Home;
