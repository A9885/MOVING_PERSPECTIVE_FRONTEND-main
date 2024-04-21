import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Dropdown, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Input as TextInput, Select } from '../Antd';
import ModalComponent from '../Modal';
import axios from 'axios';
import config from '../../config';

const DataTable = ({children, tbody=[], tableHeader=true, setReloadPage, tableFooter=true, footerExtraClass ="", headerExtraClass="", filtered = false, onclickFilterHandel, tableWrapClass="table-responsive"}) => {

    const [viewUser, setViewUser] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [deleteUserId, setDeleteUserId] = useState({});


    const handleCancel = () => {
        setViewUser(false);
        setDeleteUser(false);
    }
    console.log("datatable" );
    const handleDeleteUser = async (userId) => {
        try {
            const response = await axios.delete(`${config.API_BASE_URL}/api/contact/${userId}`);
            console.log(response.data);
            setReloadPage(true);

        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
    }

  return (
    <>
        <div className="datatable dt-bootstrap4 no-footer">
            {tableHeader && 
            <div className={` ${headerExtraClass}`}>
                <Row className="justify-between g-2 mb-3">
                    <Col xs={7} sm={6} md={4} className="text-start">
                        <div id="DataTables_Table_0_filter" className="dataTables_filter">
                            <div className='datatable_search'>
                                <div className='form-group mb-0'>
                                    <label className='position-relative'>
                                        <Form.Control size="sm" placeholder="Type in to Search" aria-controls="DataTables_Table_0" />
                                        <div className='datatable_search_icon position-absolute'>
                                            <em className='icon icon-search'/>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            }
            <div className={`datatable-wrap ${tableWrapClass}`}>
                {/* {children} */}
                <table className="table align-middle table-nowrap mb-0">
                    <thead>
                        <tr>
                        <th className="w-60">Sr.</th>
                        <th>User name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Subject</th>
                        <th>message</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tbody.map((item, index) => {
                            return <>
                            <tr>
                                <td scope="col">{index + 1}</td>
                                <td scope="col">
                                    <h5 className="fs-15 font-md my-1"><Link to='' className="link-secondary">{item?.name}</Link></h5>
                                </td>
                                <td scope="col">{item?.email}</td>
                                <td scope="col">{item?.phone}</td>
                                <td scope="col">{item?.subject}</td>
                                <td scope="col"><p className='text-truncate'>{item?.message.substring(0, 60)}...</p></td>
                                <td scope="col">
                                    <div className='d-flex align-items-center'>
                                        <Link to="" className='avatar avatar-sm me-2' onClick={() => {setViewUser(true); setUserDetails(item)}}>
                                            <em className="icon icon-eye" />
                                        </Link>
                                        <Link to="" className='avatar avatar-sm' onClick={() => {setDeleteUser(true); setDeleteUserId(item)}}>
                                            <em className="icon icon-trash" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        </>
                    })}
                    </tbody>
                    </table>
            </div>
            {tableFooter && 
            <div className={` ${footerExtraClass}`}>
                <Row className="align-items-center mt-3">
                    <Col xs="7" sm="12" md="9">
                        <div className="datatable_paginate" >
                            <ul className="pagination mb-0">
                                <li className="paginate_button page-item previous disabled">
                                    <Link to="#" aria-controls="DataTables_Table_0" className="page-link"><em className='icon-back-ios' /></Link>
                                </li>
                                <li className="paginate_button page-item active">
                                    <Link to="#" aria-controls="DataTables_Table_0" className="page-link">1</Link>
                                </li>
                                <li className="paginate_button page-item">
                                    <Link to="#" aria-controls="DataTables_Table_0" className="page-link">2</Link>
                                </li>
                                <li className="paginate_button page-item next">
                                    <Link to="#" aria-controls="DataTables_Table_0" className="page-link"><em className='icon-forward-ios' /></Link>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs="5" sm="12" md="3" className="text-start text-md-end">
                        <div className="text-muted mb-0 fs-14 datatable_info">1 -10 of 10</div>
                    </Col>
                </Row>
            </div>
            }
        </div>

        <ModalComponent 
            show={viewUser}
            onHide={handleCancel}
        >
            <>
            <ul className='list-unstyled mb-0 ps-0'>
                <li className='d-flex align-items-center justify-content-start'>
                    <p className='fs-15 w-25 font-bd my-1'>Name </p>
                    <p className='mb-0 text-start ms-3'>{userDetails.name}</p>
                </li>
                <li className='d-flex align-items-center justify-content-start'>
                    <p className='fs-15 w-25 font-bd my-1'>Email </p>
                    <p className='mb-0 text-start ms-3'>{userDetails.email}</p>
                </li>
                <li className='d-flex align-items-center justify-content-start'>
                    <p className='fs-15 w-25 font-bd my-1'>Phone </p>
                    <p className='mb-0 text-start ms-3'>{userDetails.phone}</p>
                </li>
                <li className='d-flex align-items-center justify-content-start'>
                    <p className='fs-15 w-25 font-bd my-1'>Subject </p>
                    <p className='mb-0 text-start ms-3'>{userDetails.subject}</p>
                </li>
                <li className='d-flex align-items-start justify-content-start'>
                    <p className='fs-15 w-25 font-bd my-1'>Message </p>
                    <p className='text-start w-75 mb-0 ms-3'>{userDetails.message}</p>
                </li>
            </ul>
            </>
        </ModalComponent>

        <ModalComponent 
            show={deleteUser}
            onHide={handleCancel}
        >
            <>
                <h4 className='text-center mb-5'>
                    Are you sure you want delete to this user permanantly ?
                </h4>

                <div className='d-flex align-items-center justify-content-center'>
                    <button className='btn btn-light me-3' onClick={() => setDeleteUser(false)}>
                        No
                    </button>
                    <button className='btn btn-primary' onClick={() => {setDeleteUser(false); handleDeleteUser(deleteUserId.id)}}>
                        Yes
                    </button>
                </div>
            </>
        </ModalComponent>
    </>

  )
}

export default DataTable;