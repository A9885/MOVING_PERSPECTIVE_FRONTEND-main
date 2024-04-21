import React from "react";
import Spinner from "react-bootstrap/Spinner";

function GlobalLoader() {
  return (
    <>
    <div className="loader position-fixed text-center vh-100 w-100 d-flex align-items-center justify-content-center">
      <div>
        <img src='/images/logo.svg' className="d-block mb-4" alt='logo' />
        <Spinner animation="border" variant="dark"  />
      </div>
    </div>
    </>
  );
}
export default GlobalLoader;
