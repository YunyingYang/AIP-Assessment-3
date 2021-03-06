import React from "react";
import spinner from "../../images/whalespinner.gif";

// show loading spinner
export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{
          width: "200px",
          height: "200px",
          margin: "auto",
          display: "block"
        }}
        alt="Loading..."
      />
    </div>
  );
};
