"use client"

import React from 'react';
import { useAppSelector } from '../store/reduxHooks';

type Props = {};

const Page = (props: Props) => {
  const isSmallDevice = useAppSelector((state) => state.device.isSmallDevice);
  return (
    <div>
      {isSmallDevice ? <p>Hello</p> : <p>Bye</p>}
    </div>
  );
};

export default Page;
