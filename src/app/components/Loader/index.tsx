"use client";
import React from "react";
import { TailSpin } from "react-loader-spinner";

type Props = {};

const Loader = (props: Props) => {
  return (
    <TailSpin
      visible={true}
      height="80"
      width="80"
      color="#ffe301"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
