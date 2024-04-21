import React, { useState, useEffect } from "react";
import { Card, Col, Dropdown, Row } from "react-bootstrap";
import { DataTable, ImageElement } from "../../../components";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../../config";

function Dashboard() {

  const [data, setData] = useState([]);
  const [reloadPage, setReloadPage] = useState(false);

  const fetchData = async () => {
    try {
      // Make a GET request to the API endpoint
      const response = await axios.get(`${config.API_BASE_URL}/api/contact/get_all`);
      // Update the state with the response data

      setData(response.data);
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  };


  useEffect(() => {
    fetchData();
    console.log("1");
  }, [reloadPage]);
  console.log("reloadPage", reloadPage);

  return (
    <>
      <Row className="g-4 mb-4">
        <Col xxl={6}>
          <Card className="mb-0 border-0 welcome-box h-100">
            <Card.Body className="px-4 px-xxl-5">
              <Row className="align-items-center">
                <Col>
                  <div className="title position-relative">
                    <h1 className="mb-3 fs-3"> Hey Buddy, <br />
                      Welcome to Moving Perspective
                    </h1>
                    <span className="d-block text-mute fs-16"> Here’s what happening with your Website today </span>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <div>
                <h5 className="title mb-0"> User Inqueries</h5>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <DataTable
                headerExtraClass="px-3"
                tableHeader={false}
                tableFooter={false}
                footerExtraClass="px-3"
                filtered='true'
                setReloadPage={setReloadPage}
                tbody={data.length === 0 ? [] : data.data}
              >
              </DataTable>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
