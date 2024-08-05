import React from "react";

const SkeltonLoader = ({ width, height, marginTop, marginBottom }) => {
  return (
    <div className="card">
      <div
        className="cover-image-skeleton"
        style={{
          width: width,
          height: height,
          marginTop: marginTop,
          marginBottom,
        }}
      ></div>
    </div>
  );
};

export default SkeltonLoader;
