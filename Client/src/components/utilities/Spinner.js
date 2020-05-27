import React from "react";

export default function Spinner() {
  return (
    <div className="d-flex justify-content-center ">
      <div
        className="spinner-grow  "
        style={{ width: "20rem", height: "20rem" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
