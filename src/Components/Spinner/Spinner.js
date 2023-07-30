import React from "react";
import { ScaleLoader } from "react-spinners";

import './Spinner.scss'

const Spinner = () => {
  return (
    <div className="sweet-loading">
      <ScaleLoader
        height={35}
        width={4}
        radius={2}
        margin={2}
        //size={150}
        color={"#0b0c2e"}
        loading={true}
      />
    </div>
  );
};

export default Spinner;

