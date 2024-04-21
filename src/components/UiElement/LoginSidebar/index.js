import React from "react";
import ImageElement from "../ImageElement";
import { Link, useLocation } from "react-router-dom";
import userRoutesMap from "../../../routeControl/userRouteMap";
import { Badge } from "react-bootstrap";

function LoginSidebar({setMenuToggle, menuToggle}) {
    const location = useLocation();
  const { pathname } = location;
  return (
    <>
       <div className={`menuSidebar vh-100 position-fixed ${menuToggle ? 'menuSidebar-open' : ''}`}>
            <div className="menuSidebar_logo">
                <Link to="#"><ImageElement source="logo-icon.svg" alt="loopity" /></Link>
            </div>
            <div className="menuSidebar_menu">
                <ul className="list-unstyled">
                    <li>
                        <Link to={userRoutesMap.ACTIVITY.path} onClick={() => setMenuToggle(false)} className={`${pathname === userRoutesMap.ACTIVITY.path || pathname === userRoutesMap.ACTIVITY_BLANK.path ? 'active' : ''}`}>
                            <div className="iconBox">
                                <ImageElement className="default" source="sidebar-icons/icon_activity.svg" alt="activity" />
                                <ImageElement className="active" source="sidebar-icons/icon_activity_active.svg" alt="activity" />
                                <Badge bg="light">02</Badge>
                            </div>
                            Activity
                        </Link>
                    </li>
                    <li>
                        <Link to={userRoutesMap.LOOPS.path} onClick={() => setMenuToggle(false)} className={`${pathname === userRoutesMap.LOOPS.path || pathname === userRoutesMap.LOOPS_BLANK.path || pathname ===  userRoutesMap.MANAGE_PARTICIPANTS.path ? 'active' : ''}`}>
                            <div className="iconBox">
                                <ImageElement className="default" source="sidebar-icons/icon_loops.svg" alt="loops" />
                                <ImageElement className="active" source="sidebar-icons/icon_loops_active.svg" alt="loops" />
                            </div>
                            Loops
                        </Link>
                    </li>
                    <li>
                        <Link to={userRoutesMap.CHAT.path} onClick={() => setMenuToggle(false)} className={`${pathname === userRoutesMap.CHAT.path || pathname === userRoutesMap.CHAT_BLANK.path ? 'active' : ''}`}>
                            <div className="iconBox">
                                <ImageElement className="default" source="sidebar-icons/icon_chat.svg" alt="chat" />
                                <ImageElement className="active" source="sidebar-icons/icon_chat_active.svg" alt="chat" />
                                {/* <Badge bg="light">99+</Badge> */}
                            </div>
                            Chat
                        </Link>
                    </li>
                    <li>
                        <Link to={userRoutesMap.CONTACT_LIST.path} onClick={() => setMenuToggle(false)} className={`${pathname === userRoutesMap.CONTACT_LIST.path ? 'active' : ''}`}>
                            <div className="iconBox">
                                <ImageElement className="default" source="sidebar-icons/icon_contact.svg" alt="contact" />
                                <ImageElement className="active" source="sidebar-icons/icon_contact_active.svg" alt="contact" />
                            </div>
                            Directory
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="menuSidebar_powered position-absolute">
                <h6>Powered by</h6>
                <ImageElement source="logo-sidebar.svg" alt="loopity"/>
            </div>
       </div>
       {menuToggle && <div onClick={() => setMenuToggle(false)} className="bgOverlay"/>}
    </>
  );
}

export default LoginSidebar;