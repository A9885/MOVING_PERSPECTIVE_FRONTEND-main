import React, { useState, useEffect } from "react";
import { Outlet} from "react-router-dom";
import { AdminFooter, AdminHeader, AdminSidebar } from "../../components";

function AdminPrivateLayout() {
  useEffect(() => {
    setTimeout(() => {
      let navbar = document.querySelector(".header").clientHeight;
      let footer = document.querySelector(".footer").clientHeight;
      document.querySelector(".main-content").style.minHeight = `${window.innerHeight - (footer + 1)}px`;
      document.querySelector(".main-content").style.paddingTop = `${navbar + 1}px`;
    }, 300);
  }, []);
  const [isSidebarOpen, setIsLeftOpen] = useState(false);
  const openLeftSidebar = () => {
    setIsLeftOpen(!isSidebarOpen);
  };
  const closeLeftSidebar = () => {
    setIsLeftOpen(false);
  };  
  return (
      <>
        <AdminSidebar closeLeftSidebar={closeLeftSidebar}
        extraClassName={`${isSidebarOpen ? 'open' : ''}`}/>
        <div className="wrapper">
          <AdminHeader sideBarOpen={openLeftSidebar}/> 
            <div className="main-content">
              <div className="main-content-wrap">
                <Outlet />
              </div>
            </div>
          <AdminFooter />
        </div>
        <div 
          className={`overlay ${isSidebarOpen ? 'active' : ''}`} 
          onClick={closeLeftSidebar}>
        </div>
      </>
  );
}

export default AdminPrivateLayout;
