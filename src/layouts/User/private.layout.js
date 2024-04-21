import React from "react";
import { Outlet} from "react-router-dom";

function PrivateLayout() {
  return (
      <div>
            <h2>User Header</h2>
            <Outlet />
            <h2>User Footer</h2>
      </div>
  );
}

export default PrivateLayout;
