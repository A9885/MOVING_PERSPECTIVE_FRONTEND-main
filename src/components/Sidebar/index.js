import React from "react";
import { Accordion } from "react-bootstrap";
import { Link, useResolvedPath } from "react-router-dom";
import adminRouteMap from "../../routeControl/adminRouteMap";
import { ImageElement } from "../UiElement";
// import adminRouteMap from '../../../routes/Admin/adminRouteMap';

function AdminSidebar({closeLeftSidebar, extraClassName}) {
  const {pathname} = useResolvedPath();

  return (
    <>
      <div className={`sidebar ${extraClassName}`}>
        <div className="navbar-brand text-white text-end">
            <Link to='#' onClick={closeLeftSidebar} className="closeLeftSidebar d-flex d-xl-none">
              <em className="icon icon-cross"/>
            </Link>
        </div>
        <div className="sidebar_menu">
          <Accordion className="bg-transparent rounded-0" defaultActiveKey={(pathname === adminRouteMap.DASHBOARD.path)}>
            <ul className="list-unstyled mainMenu">
              <li className="mainMenu-title">Menu</li>
              <Accordion.Item as="li" className="bg-transparent border-0" eventKey="0">
                <Accordion.Button className="accordion-button-normal">
                  <Link to={adminRouteMap.DASHBOARD.path} className={` ${ pathname === adminRouteMap.DASHBOARD.path ? "active" : "" }`}>
                      <span className="icon icon-dashboard" />                      
                      Dashboard
                  </Link>
                </Accordion.Button>
              </Accordion.Item>
              <Accordion.Item as="li" className="bg-transparent border-0" eventKey="1">
                <Accordion.Button className="accordion-button-normal">
                  <Link to={adminRouteMap.SITESETTINGS.path} className={` ${ pathname === adminRouteMap.SITESETTINGS.path ? "active" : "" }`}>
                      <span className="icon icon-setting" />                      
                      Site Settings
                  </Link>
                </Accordion.Button>
              </Accordion.Item>
            </ul>
          </Accordion>
        </div>
        <div className="sidebar_footer">
          {/* <img src="/assets/sidebar-img.svg" alt="sidebar" /> */}
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;
