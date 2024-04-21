import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { GlobalLoader, Input as TextInput } from '../../../components';
import credential from '../../../config/data.json';
// import validation from "./validation";
import * as Yup from "yup";
import adminRouteMap from "../../../routeControl/adminRouteMap";
import modalNotification from "../../../utils/notification";

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const initialValues= {
    email: '', 
    password: ''
  }

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Password is Required'),
  });
  
  const handleLogin = async (values) => {
    console.log("loader", loader)
    setLoader(true);
    console.log("loader", loader)
    try{
      const user = await credential.find((u) => u.username === values.email && u.password === values.password);
      if (user) {
        setLoader(true);
        modalNotification({
          type: "success",
          message: "Login Successfully!",
        });
        localStorage.setItem("loginToken", true);
        setTimeout(() => {
          navigate(adminRouteMap.DASHBOARD.path);
        }, 2000);
      }
      setLoading(false);
    }catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // const handleSubmit = (values) => {
  //   console.log('Form data submitted:', values);
  // };
  return (
    <>
    {console.log("loading", loading)}
    {loading ? 
    <GlobalLoader /> : (
      <div className="authPage d-flex align-items-center justify-content-center">
        <Container>
          <div className="authPage_wrapper">
            <Row className="justify-content-center">
              <Col lg={6} md={8}>
                <div className="authPage_form p-lg-5 p-4">
                  <div className="">
                    <div className="authPage_form_head text-center">
                        <h2 className="font-size-18">Welcome Back !</h2>
                        <p className="text-muted">Sign in to continue to Moving perspective.</p>
                    </div>
                    <Formik
                      initialValues={initialValues}
                      onSubmit={handleLogin}
                      validationSchema={SignupSchema}
                      enableReinitialize
                    >
                      <Form className="auth-input">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <TextInput 
                              name="email"
                              type="text" 
                              className="form-control form-control-lg" 
                              id="email" 
                              placeholder="Enter email" 
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="password-input">Password</label>
                            <TextInput 
                              name="password"
                              type={showPassword ? "text" : "password"} 
                              className="form-control form-control-lg" 
                              placeholder="Enter password" 
                              icon={
                              <Link to="#" className="fieldicon-right" onClick={(e) => {e.preventDefault(); setShowPassword(!showPassword)}}>
                                {showPassword ? <em className="icon-eye-off" /> : <em className="icon-eye" />}
                              </Link>}
                            />
                        </div>
                        <div className="mt-4">
                          <button className="btn btn-lg btn-primary w-100" type="submit">Sign In</button>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </div>
              </Col> 
            </Row>
          </div>
        </Container>
      </div>
      )  
    }
    </>
  );
}

export default AdminLogin;
