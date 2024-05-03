import React from 'react';
import Loader from './components/Loader';

type Props = {};

const loading = (props: Props) => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Loader />
    </div>
  );
};

export default loading; 