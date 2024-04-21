import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Tabs, Tab } from "react-bootstrap";
// import adminRouteMap from '../../../routes/Admin/adminRouteMap';
// import AdmindetailsSidebar from "../AdminSidebar";
import ImageElement from "../UiElement/ImageElement";
import adminRouteMap from "../../routeControl/adminRouteMap";
import modalNotification from "../../utils/notification";

function AdminHeader({sideBarOpen}) {

  const [isOpen, setIsOpen] = useState(false);
  const openSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if(isOpen){
      document.body.classList.add('overflow-hidden');
    }else{
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

const handleStorageClear = () => {
  console.log("test123654");
  localStorage.setItem('loginToken', false);
  modalNotification({
    type: "success",
    message: "Logout Successfully!",
  });
}
  return (
    <>
      <header className="header">
        <div className="d-flex align-items-center justify-content-between  w-100 h-100">
          <div className="nk-header-brand d-xl-none me-auto d-flex align-items-center">
            <div to="#" className="toggleLeftSidebar me-2 me-lg-3 d-flex" onClick={sideBarOpen}>
              <em className="icon icon-align-left"/>
            </div>
            <Link to={adminRouteMap.DASHBOARD.path} className="logo">
              <img src="/images/logo.svg" className="img-fluid" alt="logo"/>
            </Link>
          </div>
          <div>
            <Link to={adminRouteMap.DASHBOARD.path} className="logo d-none d-xl-block">
              <img src="/images/logo.svg" className="img-fluid" alt="logo"/>
            </Link>
          </div>
          
          <div className="d-flex align-items-center h-100">
            <Link to={adminRouteMap.LOGIN.path} 
              onClick={handleStorageClear} 
              className="header_signout d-inline-flex align-items-center justify-content-center"><em className="icon icon-arrow-from-right"/> Sign out</Link>
          </div>
        </div>
        <div 
          className={`overlay ${isOpen ? 'active' : ''}`} 
          onClick={closeSidebar}>
        </div>
      </header>
    </>
  );
}

export default AdminHeader;
