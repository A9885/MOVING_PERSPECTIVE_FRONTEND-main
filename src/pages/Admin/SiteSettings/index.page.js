import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Tab, Row, Col, Nav, Dropdown } from "react-bootstrap";
import { Input as TextInput, BreadcrumbComponent, CommonButton, DataTable, ImageElement, FormComponent, ModalComponent, FormComponentGallery, FormClient, GlobalLoader } from "../../../components";
import adminRouteMap from "../../../routeControl/adminRouteMap";
import { Upload } from "antd";
import axios from "axios";
import config from "../../../config";
import modalNotification from "../../../utils/notification";

function SiteSettings() {

  const [saveData, setSaveData] = useState({});
  const [clientData, setClientData] = useState({});
  const [serviceCard, setServiceCard] = useState([]);
  const [addService, setAddService] = useState(false);
  const [updateCard, setUpdateCard] = useState([]);
  const [getAllCate, setGetAllCate] = useState([]);
  const [deleteClient, setDeleteClient] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [createCard, setCreateCard] = useState([]);
  const [editClient, setEditClient] = useState(false);
  const [addCard, setAddCard] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(0);
  const [serviceDeleteItemId, setServiceDeleteItemId] = useState(0);
  const [deleteClientId, setDeleteClientId] = useState(0);
  const [searchValue, setSearchValue] = useState("cateloge");
  const [editGalleryModal, setEditGalleryModal] = useState(false);
  const [pageRefresh, setPageRefresh] = useState(false);
  const [addClient, setAddClient] = useState(false);
  const [editGalleryId, setEditGalleryId] = useState(0);

  const [buttonLoading, setButtonLoading] = useState(true);

  const [serviceDeleteModal, setServiceDeleteModal] = useState(false);

  const [endPoint, setEndPoint] = useState("");

  const breadcrumb = [
    {
      "path": `${adminRouteMap.DASHBOARD.path}`,
      "name": 'Dashboard'
    },
    {
      "path": '#!',
      "name": 'Site Settings'
    }
  ]
  const initialValues = {
    bannerTitle: '',
    bannerDesc: ''
  }

  const [cardUpdateModal, setCardUpdateModal] = useState(false);

  const hideCardModal = () => {
    setCardUpdateModal(false);
    setEditClient(false);
    setAddCard(false);
    setEditGalleryModal(false);
    setAddClient(false);
    setDeleteClient(false);
    setAddService(false);
    setServiceDeleteModal(false);
  }

  const fetchData = async (url, setDataCallback) => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/${url}`);
      const { resCode, data } = response;
      setDataCallback(data.data);
    } catch (error) {
      console.log(`${url} data fetching unsuccessful.`);
    }
  };

  const deleteItemFetch = async (id) => {
    try {
      const response = await axios.delete(`${config.API_BASE_URL}/api/gallery/item/${id}`);
      const { resCode, message } = response.data;
      if (resCode == 200) {
        modalNotification({
          type: "success",
          message
        })
        fetchData(`gallery/search/${searchValue}`, setSelectedCategory);
      }
    } catch (error) {
      console.log("data Deleted unsuccessful.");
    }
  };

  const serviceDeleteItemFetch = async (id) => {
    try {
      const response = await axios.delete(`${config.API_BASE_URL}/api/service/${id}`);
      const { resCode, message } = response.data;
      if (resCode == 200) {
        modalNotification({
          type: "success",
          message
        })
        setServiceDeleteModal(false);
        fetchData('service ', setServiceCard);
      }
    } catch (error) {
      console.log("data Deleted unsuccessful.");
    }
  };

  // const deleteClientFetch = async (id) => {
  //   try {
  //     const response = await axios.delete(`${config.API_BASE_URL}/api/gallery/item/${id}`);
  //     const { resCode, data } = response;
  //   } catch (error) {
  //     console.log("data Deleted unsuccessful.");
  //   }
  // };

  // const updateCardReq = async (values) => {
  //   try {
  //     const response = await axios.put(`${config.API_BASE_URL}/api/service/${id}`, values);
  //     const { resCode, data } = response;
  //     setUpdateCard(data.data);
  //     console.log("card data fetching successful.");
  //   } catch (error) {
  //     console.log("data fetching unsuccessful.");
  //   }
  // }
  useEffect(() => {
    fetchData('service ', setServiceCard);
    fetchData('client ', setUpdateCard);
    fetchData('create_new ', setCreateCard);
    fetchData('gallery/get_all_category ', setGetAllCate);
    fetchData(`gallery/search/${searchValue}`, setSelectedCategory);
    console.log("pageRefresh", pageRefresh);
  }, [searchValue, pageRefresh]);


  const [upload, setUpload] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append("files", file);

    console.log("formData", formData);
    console.log("file", file);

    axios.post(`${config.API_BASE_URL}/api/files_upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-rapidapi-host": "file-upload8.p.rapidapi.com",
        "x-rapidapi-key": "your-rapidapi-key-here",
      },
    })
      .then(response => {
        setButtonLoading(false);
        console.log('Image uploaded successfully!', response);
        const imgLink = response.data.url; // If the response contains data
        setUpload(imgLink);
        console.log("response.data.url", response.data.url);
      })
      .catch(error => {
        console.error(`Error: ${error.response.status} - ${error.response.data}`);
      });

  }

  const submit = async (values) => {
    // Set loading state to true to indicate the start of the request
    setLoading(true);
    console.log("1111111111111111111");
    try {
      console.log("22222222222222");
      values.link = upload;
      console.log("33333333333333");
      console.log(upload);
      console.log("4444444444444444", values);

      const response = await axios.post(`${config.API_BASE_URL}/api/client/create_new`, { ...values, title: "", description: "" });
      console.log("55555555555555");

      const { resCode, message } = response;
      console.log("666666666666666666666");

      if (resCode == 200) {
        console.log("7777777777777777777");

        modalNotification({

          type: "success",
          message
        })
        console.log("88888888888888888888");

        setAddClient(false);
        console.log("99999999999999999");

        fetchData('client ', setUpdateCard);
      }

    } catch (error) {
      console.error("Submit unsuccessful!", error);
    } finally {
      // Set loading state to false to indicate the end of the request, whether successful or not
      setAddClient(false);
      fetchData('client ', setUpdateCard);
      setLoading(false);
      // window.location.reload();
    }
  }
  const deleteClientdetail = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${config.API_BASE_URL}/api/client/${id}`);
      const { resCode, message } = response;
      if (resCode == 200) {
        modalNotification({
          type: "success",
          message
        })
        fetchData('client ', setUpdateCard);
        setDeleteClient(false);
        setLoading(false);
      }
    } catch (error) {
      console.log("data Deleted unsuccessful.");
    }
    fetchData('client ', setUpdateCard);
    setLoading(false);
  };

  const gallerySubmit = async (values) => {
    setLoading(true);
    if (endPoint == "gallery/create_new") {
      try {
        values.link = values.type == "Video" ? values.link : upload;
        console.log("values======================", values);
        const response = await axios.post(`${config.API_BASE_URL}/api/gallery/create_new`, values);
        const { resCode, message } = response.data;
        if (resCode == 200) {
          modalNotification({
            type: "success",
            message
          })
          setAddCard(false);
          fetchData(`gallery/search/${searchValue}`, setSelectedCategory);
        }
      } catch (error) {
        modalNotification({
          type: "error",
          message: error
        })
      }
    }
    if (endPoint == "gallery") {
      try {
        values.link = upload;
        const response = await axios.put(`${config.API_BASE_URL}/api/gallery/${editGalleryId}`, values);
        const { resCode, message } = response.data;
        if (resCode == 200) {
          modalNotification({
            type: "success",
            message
          })
          setEditGalleryModal(false);
          fetchData(`gallery/search/${searchValue}`, setSelectedCategory);
        }
      } catch (error) {
        console.log(`Unsuccess!`);
      }
    }
    setEditGalleryModal(false);
  }
  return (
    <>
      <div className="userDetails">
        <Tab.Container id="left-tabs-example" defaultActiveKey="overview">
          <Card className="">
            <Card.Header className="p-3">
              <div className="pageHeader">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="pagetitle">
                    <h1 className="title">Site Settings</h1>
                    <BreadcrumbComponent breadcrumb={breadcrumb} />
                  </div>
                </div>
              </div>
            </Card.Header>

            <Card.Body className="py-0">
              <div className="userTab">
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link className="fs-15" eventKey="overview">Top Banner</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="fs-15" eventKey="services">Services</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="fs-15" eventKey="clientSec">Client</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="fs-15" eventKey="gallerySec">Gallery</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </Card.Body>
          </Card>
          <div className="userDetails_tables">
            <Tab.Content>
              <Tab.Pane eventKey="overview">
                <div className="basicDetails p-0">
                  <Card className="h-100">
                    <Card.Header>
                      <h2 className="card-title mb-0">HomePage Banner</h2>
                    </Card.Header>
                    <Card.Body>
                      <div className="basicDetails_left">
                        <Row>
                          <Col lg={6}>
                            <FormComponent
                              initialValues={initialValues}
                              endPoint="topBanner"
                              title="Banner video"
                              buttonName="Save"
                            />
                          </Col>
                        </Row>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="services">
                <div className="basicDetails servicesSec p-0">
                  <Card className="h-100">
                    <Card.Header className="d-flex align-items-center justify-content-between">
                      <h2 className="card-title mb-0">Services Card Section</h2>
                      <button className="btn btn-primary" onClick={() => setAddService(true)}>Add Service</button>
                    </Card.Header>
                    <Card.Body>
                      <div className="basicDetails_left cardSec mt-0">
                        <form>
                          <Row className="g-xxl-4 g-3">

                            {serviceCard.map((item, id) => {
                              return (
                                <Col xxl={3} md={4} sm={6}>
                                  <div className='cardSec_box position-relative'>
                                    <img src={item.link} className='img-fluid w-100' alt="Content creation" />
                                    <div className='cardSec_box_cnt'>
                                      <h2>{item.title}</h2>
                                      <p>{item.description}</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <Link to='#!' className="cardBox_edit me-2 position-absolute" onClick={() => { setCardUpdateModal(true); setSaveData(item) }}>
                                        <em className="icon icon-edit" />
                                      </Link>
                                      <Link to="#" className="cardBox_edit cardBox_edit-dlt" onClick={() => { setServiceDeleteModal(true); setServiceDeleteItemId(item); setEndPoint(`service/${item.id}`) }}><em className="icon icon-trash" /></Link>
                                    </div>

                                  </div>
                                </Col>
                              )
                            })
                            }
                          </Row>
                        </form>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="clientSec">
                <div className="basicDetails p-0">
                  {/* <DataTable
                    headerExtraClass="px-3"
                    tableHeader={false}
                    tableFooter={false}
                    footerExtraClass="px-3"
                    tbody={updateCard}
                    filtered='true'
                  > */}
                  <Card className="h-100">
                    <Card.Header className="d-flex align-items-center justify-content-between">
                      <h2 className="card-title mb-0">Client card Section</h2>
                      <button className="btn btn-primary" onClick={() => { setAddClient(true); }}>Add Client</button>
                    </Card.Header>
                    {loading ? <GlobalLoader /> : (
                      <Card.Body className="p-0">
                        <div className="datatable">
                          <div className="datatable-wrap">
                            <table className="table align-middle table-nowrap mb-0">
                              <thead>
                                <tr>
                                  <th className="w-60">Sr.</th>
                                  <th>Client Image</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {updateCard.map((item, index) => {
                                  return (
                                    <>
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                          <div className="avatar avatar-lg flex-shrink-0 me-2 rounded">
                                            <img src={item.link} alt={item.type} className="avatar-img" />
                                          </div>
                                        </td>
                                        <td>
                                          <Link onClick={() => { setDeleteClient(true); setDeleteClientId(item.id) }}>
                                            <div className="avatar avatar-sm">
                                              <em className="icon icon-trash-alt" />
                                            </div>
                                          </Link>
                                        </td>
                                      </tr>
                                    </>
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </Card.Body>
                    )}
                  </Card>
                  {/* </DataTable> */}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="gallerySec">
                <div className="basicDetails p-0">
                  <Card className="h-100">
                    <Card.Header className="d-flex align-items-center justify-content-between">
                      <h2 className="card-title mb-0">Gallery Section</h2>
                      <button className="btn btn-primary" onClick={() => { setAddCard(true); setEndPoint("gallery/create_new") }}>Add Category</button>
                    </Card.Header>
                    <Card.Body className="">
                      <Tab.Container id="left-tabs-example" defaultActiveKey="cateloge">
                        <div className="userTab">
                          <Row>
                            <Col lg={6}>
                              <Nav variant="tabs">
                                {getAllCate.map((item) => {
                                  return (
                                    <>
                                      <Nav.Item>
                                        <Nav.Link className="fs-15" eventKey={item.category} onClick={() => setSearchValue(item.category)}>{item.category}</Nav.Link>
                                      </Nav.Item>
                                    </>
                                  )
                                })}
                              </Nav>
                            </Col>
                          </Row>
                        </div>

                        <div>
                          <Tab.Content>
                            <Tab.Pane eventKey={searchValue} className="my-4">
                              <Row className="g-4">
                                {selectedCategory.map((item, id) => {
                                  return (
                                    <Col md={3}>
                                      <div className="cardBox">
                                        <div className="cardBox_img">
                                          {
                                            item.type === "Image"
                                              ? <img src={item.link} className="img-fluid" alt={item.id} />
                                              : <video width="100%" height="250" controls>
                                                <source
                                                  src={item.link}
                                                  type="video/mp4"
                                                /></video>
                                          }
                                        </div>
                                        {/* <div className="cardBox_video">
                                          <video></video>
                                        </div> */}
                                        <div className="d-flex align-items-center">
                                          <Link to="#" className="cardBox_edit me-2" onClick={() => { setEditGalleryModal(true); setEditGalleryId(item.id); setEndPoint("gallery") }}><em className="icon icon-edit" /></Link>
                                          <Link to="#" className="cardBox_edit cardBox_edit-dlt" onClick={() => { setDeleteItem(true); setDeleteItemId(item); setEndPoint("gallery/create_new") }}><em className="icon icon-trash" /></Link>
                                        </div>
                                      </div>
                                    </Col>
                                  )
                                })}
                              </Row>
                            </Tab.Pane>
                          </Tab.Content>
                        </div>
                      </Tab.Container>
                    </Card.Body>
                  </Card>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>
      </div>

      <ModalComponent
        show={cardUpdateModal}
        onHide={hideCardModal}
        size="md"
      >
        <>
          <FormComponent
            data={saveData}
            endPoint="service/id"
            id={saveData.id}
            title="Image"
            buttonName="Update"
          />
        </>
      </ModalComponent>

      {/* Add service  */}
      <ModalComponent
        show={addService}
        onHide={hideCardModal}
        size="md"
      >
        <>
          <FormComponent
            // data={saveData}
            endPoint="service"
            // id={saveData.id}
            title="Image"
            loader={buttonLoading}
            buttonName="Add"
          />
        </>
      </ModalComponent>

      <ModalComponent
        show={editClient}
        onHide={hideCardModal}
        size="md"
      >
        <>
          <FormComponent
            data={clientData}
            endPoint="client"
            id={clientData.id}
          />
        </>
      </ModalComponent>


      {/* Gallery create category  */}
      <ModalComponent
        show={addCard}
        onHide={hideCardModal}
        size="md"
      >
        <>
          <FormComponentGallery
            endPoint="gallery/create_new"
            id={editGalleryId}
            onSubmit={gallerySubmit}
            handleFileUpload={handleFileUpload}
            loader={buttonLoading}
            buttonName="Update"
          />
        </>
      </ModalComponent>

      {/* Gallery Update category  */}
      <ModalComponent
        show={editGalleryModal}
        onHide={hideCardModal}
        size="md"
      >
        <>
          <FormComponentGallery
            endPoint="gallery"
            id={editGalleryId}
            onSubmit={gallerySubmit}
            handleFileUpload={handleFileUpload}
            loader={buttonLoading}
            buttonName="Update"
          />
        </>
      </ModalComponent>

      <ModalComponent
        show={deleteItem}
        onHide={hideCardModal}
      >
        <>
          <h4 className='text-center mb-5'>
            Are you sure you want delete to this Item ?
          </h4>

          <div className='d-flex align-items-center justify-content-center'>
            <button className='btn btn-light me-3' onClick={() => setDeleteItem(false)}>
              No
            </button>
            <button className='btn btn-primary' onClick={() => { setDeleteItem(false); deleteItemFetch(deleteItemId.id); setSearchValue(deleteItemId.category); setPageRefresh(true) }
            }>
              Yes
            </button>
          </div>
        </>
      </ModalComponent>

      {/* Services delete  */}
      <ModalComponent
        show={serviceDeleteModal}
        onHide={hideCardModal}
      >
        <>
          <h4 className='text-center mb-5'>
            Are you sure you want delete to this Item ?
          </h4>

          <div className='d-flex align-items-center justify-content-center'>
            <button className='btn btn-light me-3' onClick={() => setDeleteItem(false)}>
              No
            </button>
            <button className='btn btn-primary' onClick={() => { setDeleteItem(false); serviceDeleteItemFetch(serviceDeleteItemId.id); setSearchValue(serviceDeleteItemId.category); }
            }>
              Yes
            </button>
          </div>
        </>
      </ModalComponent>

      <ModalComponent
        show={deleteClient}
        onHide={hideCardModal}
      >
        <>
          <h4 className='text-center mb-5'>
            Are you sure you want delete to this Client ?
          </h4>

          <div className='d-flex align-items-center justify-content-center'>
            <button className='btn btn-light me-3' onClick={() => setDeleteItem(false)}>
              No
            </button>
            <button className='btn btn-primary' onClick={() => { setDeleteItem(false); deleteClientdetail(deleteClientId); setDeleteClient(false) }
            }>
              Yes
            </button>
          </div>
        </>
      </ModalComponent>


      <ModalComponent
        show={addClient}
        onHide={hideCardModal}
        size="md"
      >
        <>
          {/* <FormComponent
            data={clientData}
            endPoint="client"
            id={clientData.id}
          /> */}
          <FormClient endPoint="client/create_new" title="Image" buttonName="Add" onSubmit={submit} loader={buttonLoading} handleFileUpload={handleFileUpload} />
        </>
      </ModalComponent>
    </>
  )
}
export default SiteSettings;