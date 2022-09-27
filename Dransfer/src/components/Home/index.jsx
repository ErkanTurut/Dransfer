import React from "react";
import { useSigner } from "wagmi";
import Header from "./header";
import { useToken } from "wagmi";
function Home(props) {
  const { setShowModal, showModal } = props;

  return (
    <>
      <Header showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

export default Home;
