import React from "react";
import NotFound from "../../images/not-found.png";

export default () => {
  return (
    <div className="text-center">
      <h1 className="display-4 text-danger font-weight-bold">Page Not Found</h1>
      <p className="text-muted">
        Sorry, this page does not exist...&nbsp;&nbsp;
        <i className="fa fa-frown text-light" />
      </p>
      <p className="text-muted">
        This may be caused by user hasn't created the profile,
      </p>
      <p className="text-muted">or you just entered an invalid url.</p>
      <p>
        <img alt="" src={NotFound} style={{ width: "20%" }} />
      </p>
    </div>
  );
};
