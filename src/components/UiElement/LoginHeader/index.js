// import React from "react";
// import { Dropdown, Nav, Navbar, Tab, Row, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import {ImageElement , ModalComponent, ChatSearchBar, Switch} from "../../../components";
// import { useState } from "react";
// import userRoutesMap from "../../../routeControl/userRouteMap";
// import CreateWorkSpace from "../CreateWorkSpace";

// function LoginHeader({setMenuToggle, menuToggle, logout}) {
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [loopStepModal, setCreateWorkspace] = useState(false);
//   const [current, setCurrent] = useState(0);
//   const hideLoopStepModal = () => {
//     setCreateWorkspace(false);
//     setTimeout(() => {
//       setCurrent(0);
//     }, 500);
//   };
//   return (
//     <>
//       <header className="loginHeader">
//         <Navbar bg="light" fixed="top">
//             <div className="navIcon me-3 me-xl-0"><Link to="#" onClick={() => setMenuToggle(!menuToggle)} className="menuIcon d-xl-none"><span className="icon-menu-bar" /></Link></div>
//             <ChatSearchBar setCreateWorkspace={setCreateWorkspace} searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
//             <Navbar.Collapse id="basic-navbar-nav">
//               <Nav className="ms-auto">
//                 <ul className="list-inline d-flex align-items-center mb-0">
//                   <li className="navIcon searchIcon">
//                     <Link to="#" onClick={() => setSearchOpen(true)}><span className="icon-search" /></Link>
//                   </li>
//                   <li>
//                     <Dropdown className="profile">
//                       <Dropdown.Toggle as="a" className="d-flex align-items-center" id="dropdown-basic">
//                         <div className="profile_blk position-relative">
//                           <div className="profile_blk_img"><ImageElement className="img-fluid" source="user.png" alt="profile"/></div>
//                           <span className="status"><em className="icon-check" /></span>
//                         </div>
//                         <span>Jonas Merchant</span>
//                       </Dropdown.Toggle>
//                       <Dropdown.Menu className="dropdown-menu-end">
//                         {/* <div className="tooltip__arrow"></div> */}
//                         <div className="userInfo d-flex align-items-center">
//                             <div className="userAvatar userAvatar-lg">
//                               <ImageElement source="user.png"/>
//                             </div>
//                             <div className="userInfo_cnt">
//                               <h3>Jonas Merchant</h3>
//                               <p>jonasmerchant@gmail.com</p>
//                               <Dropdown className="statusDrop d-inline-block">
//                                 <Dropdown.Toggle as="a" className="d-inline-flex align-items-center" id="dropdown-basic">
//                                   <span className="available">Available</span>
//                                 </Dropdown.Toggle>
//                                 <Dropdown.Menu className="dropdown-menu-end">
//                                   <Link className="dropdown-item" onClick={document.body.click()} to="#"><span className="statusDot statusDot-available" />Available</Link>
//                                   <Link className="dropdown-item" onClick={document.body.click()} to="#"><span className="statusDot statusDot-busy" />Busy</Link>
//                                   <Link className="dropdown-item" onClick={document.body.click()} to="#"><span className="statusDot statusDot-dnd" />Do not disturb</Link>
//                                   <Link className="dropdown-item" onClick={document.body.click()} to="#"><span className="statusDot statusDot-away" />Appear away</Link>
//                                 </Dropdown.Menu>
//                               </Dropdown>
//                             </div>
//                         </div>
//                         <Dropdown.Divider />
//                         <Link className="dropdown-item" onClick={document.body.click()} to={userRoutesMap.PROFILE.path}>
//                           <span className="icon-user"><em className="path1"/><em className="path2"/></span>My Account
//                         </Link>
//                         <Link className="dropdown-item" onClick={document.body.click()} to={userRoutesMap.LOGIN.path}><span className="icon-logout"><em className="path1"/><em className="path2"/></span>Logout</Link>
//                         {/* <Link className="dropdown-item" onClick={document.body.click()} to={userRoutesMap.PROFILE.path}><span className="icon-credit-card"><em className="path1"/><em className="path2"/></span>Subscription Plans </Link> */}
//                         {/* <Dropdown.Divider /> */}
//                         {/* <Link className="dropdown-item" onClick={document.body.click()} to={userRoutesMap.PROFILE.path}><span className="icon-password"><em className="path1"/><em className="path2"/></span>Change Password</Link> */}
//                         {/* <Link className="dropdown-item" onClick={() => setSettings(true)}><span className="icon-setting"><em className="path1" /><em className="path2" /></span>Settings</Link> */}
//                         {/* <Link className="dropdown-item" onClick={document.body.click()} to={userRoutesMap.LOGIN.path}><span className="icon-logout"><em className="path1"/><em className="path2"/></span>Logout</Link> */}
//                       </Dropdown.Menu>
//                     </Dropdown>
//                   </li>
//                 </ul>
//               </Nav>
//             </Navbar.Collapse>
//         </Navbar>
//       </header>
//       <CreateWorkSpace
//         current={current}
//         loopStepModal={loopStepModal}
//         hideLoopStepModal={hideLoopStepModal}
//         setCurrent={setCurrent}
//         extraClass='addParticipants'
//       />
//     </>
//   );
// }

// export default LoginHeader;