import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input as TextInput, ImageElement, SectionHeading, VideComponent, GlobalLoader, AntTextArea } from '../../../components';
import { Container, Row, Col, Tabs, Tab, Nav } from 'react-bootstrap';
import { Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/virtual';
import 'swiper/css/navigation';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import config from '../../../config';
import axios from 'axios';
import AOS from 'aos';
import modalNotification from '../../../utils/notification';

function HomePage() {

  const [loading, setLoading] = useState(true);
  const [topBanner, setTopBanner] = useState({});
  const [serviceCard, setServiceCard] = useState({});
  const [clientCard, setClientCard] = useState({});
  const [galleryData, setGalleryData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [year, setYear] = useState("2023");
  const [searchValue, setSearchValue] = useState("cateloge");

    function getCurrentYear() {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      setYear(currentYear);
    }

  useEffect(() => {
    getCurrentYear();
  },[])

  const whatwedoImg = [
    'img-1.jpg',
    'img-2.jpg',
    'img-4.jpg',
    'img-5.jpg',
    'img-3.jpg',
    'img-6.jpg',
    'img-7.jpg',
    'img-8.jpg'
  ]
  const columnElements = Array.from({ length: 3 }, () => []);

  whatwedoImg.forEach((item, index) => {
    const columnIndex = index % 3;
    columnElements[columnIndex].push(item);
  });

  const slides = [
    'slide-1.png',
    'slide-1.png',
    'slide-1.png',
    'slide-1.png',
    'slide-1.png',
  ]
  const breakpoints = {
    280: {
      slidesPerView: 1,
    },
    425: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  })

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const response = await axios.post(`${config.API_BASE_URL}/api/contact/save_detail`, values);
      const { resCode, message } = response.data;
      if (resCode == 200) {
        modalNotification({
          type: "success",
          message
        })
        // resetForm();
        setSubmitting(true);
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('Error submitting form. Please try again.');
    } finally {
      setSubmitting(false);
    }
    setLoading(false);
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });

  const fetchData = async (url, setDataCallback) => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/${url}`);
      console.log("Values", response);
      const { resCode, data } = response;
      setDataCallback(data.data);
    } catch (error) {
      console.log(`${url} data fetching unsuccessful.`);
    }
  };
  
  useEffect(() => {
    fetchData('home_banner', setTopBanner);
    fetchData('service', setServiceCard);
    fetchData('client ', setClientCard);
    fetchData('gallery/get_all_category ', setGalleryData);
    fetchData(`gallery/search/${searchValue}`, setSelectedCategory);
  }, []);

  useEffect(() => {
    // Initialize AOS
    AOS.init(
      {
        duration: 800,
        easing: 'ease-in-out',
        once: true,
      }
    );
  }, []);

  
  return (
    <main className='homePage'>
      {/* <Header /> */}
      {loading ?
        (<GlobalLoader />) : (
          <>
            <section className='bannerSec'>
              <div className='bannerSec_video position-relative'  data-aos="fade-up">
                <VideComponent previewSource={topBanner?.link} />
                {/* <img src={topBanner.link} className='img-fluid' alt="img-banner"/> */}
                <div className='bannerSec_head position-absolute w-100 text-center'>
                  <ImageElement source="logo.svg" className='img-fluid' alt="banner-logo"/>
                  <h1>{topBanner?.title}</h1>
                  <p>{topBanner?.description}</p>
                </div>
                <a href='#serviceSec' className='link link-light text-decoration-none'>Discover More...</a>
              </div>
              {/* <Link to="https://drive.google.com/drive/folders/1Ht_TMJ7XpF3XltwHAvrd_86dXicvPUYm" target='_blank' className='btn btn-primary rounded-0 btnFixed'>Execution</Link> */}
            </section>
            <section className='servicesSec py-100' id="serviceSec">
              <Container>
                <div className='max-1200'>
                  <SectionHeading headingText='Services' data-aos="fade-up"/>
                  <p className="commonHead_subtitle mb-0" data-aos="fade-up">Moving Perpsective aka MP4MOV is a team of individuals from professionally and socially diverse backgrounds.
                    This offers you a wide range of creative perspectives which are unique per se. We operate all across India and
                    abroad with the assistance of our fierce and versatile crew partners.</p>

                  <div className='cardSec position-relative'>
                    <div className="cardSec_after"></div>
                    <div className='cardSec_inner'>
                      <Row className='customRow'>
                        {serviceCard.map((item, index) => {
                          return (
                            <>
                              <Col sm={6}>
                                <div className='cardSec_box' data-aos="fade-up">
                                  <img src={item.link} className='img-fluid w-100' alt="Content creation" />
                                  <div className='cardSec_box_cnt'>
                                    <h2>{item.title}</h2>
                                    <p>{item.description}</p>
                                  </div>
                                </div>
                              </Col>
                            </>
                          )
                        })}
                      </Row>
                    </div>
                    <div className="cardSec_before"></div>
                    <div>
                      <a href='#sliderSec' className='link text-decoration-none'>Learn more about us...</a>
                    </div>
                  </div>
                </div>
              </Container>
            </section>

            <section className='whatweDo py-100' id="whatweDo">
              <Container>
                <div className='max-1200'>
                  <SectionHeading headingText='What we do' extraclassName='commonHead-light' data-aos="fade-up" />
                  <div className='whatweDo_images masonry-layout'>
                    <Row className='g-2'>
                      <Col md={9}>
                        <Row className='g-2'>
                          <Col md={7}>
                            <div className='whatweDo_images-hvr position-relative'>
                              <ImageElement source='img-1.jpg' className='img-fluid' alt='img-1' />
                              <p className='whatweDo_images-text position-absolute mb-0'>Image</p>
                            </div>
                            <Row className='g-2'>
                              <Col sm={6}>
                                <div className='whatweDo_images-hvr position-relative'>
                                  <ImageElement source='img-2.jpg' className='img-fluid' alt='img-2' />
                                  <p className='whatweDo_images-text position-absolute mb-0'>Image</p>
                                </div>
                              </Col>
                              <Col sm={6}>
                                <div className='whatweDo_images-hvr position-relative'>
                                  <ImageElement source='img-3.jpg' className='img-fluid' alt='img-3' />
                                  <p className='whatweDo_images-text position-absolute mb-0'>Image</p>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                          <Col md={5}>
                            <div className='whatweDo_images-hvr position-relative'>
                              <ImageElement source='img-5.jpg' className='img-fluid img-5' alt='img-5' />
                              <p className='whatweDo_images-text position-absolute mb-0'>Image</p>
                            </div>
                          </Col>
                        </Row>
                        <Row className='g-2'>
                          <Col sm={4}>
                            <div className='whatweDo_images-hvr position-relative'>
                              <ImageElement source='img-4.jpg' className='img-fluid img-4' alt='img-4' />
                              <p className='whatweDo_images-text position-absolute mb-0'>Image</p>
                            </div>
                          </Col>
                          <Col sm={8}>
                            <div className='whatweDo_images-hvr position-relative'>
                              <ImageElement source='img-6.jpg' className='img-fluid img-6' alt='img-6' />
                              <p className='whatweDo_images-text position-absolute mb-0'>Image</p>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <Col md={3}>
                        <div className='whatweDo_images-hvr position-relative'>
                          <ImageElement source='img-7.jpg' className='img-fluid img-7' alt='img-7' />
                          <p className='whatweDo_images-text position-absolute mb-0'>Image</p>
                        </div>
                        <div className='whatweDo_images-hvr position-relative'>
                          <ImageElement source='img-8.jpg' className='img-fluid' alt='img-8' />
                          <p className='whatweDo_images-text position-absolute mb-0'>Image</p>
                        </div>
                      </Col>
                    </Row>

                  </div>
                </div>
              </Container>
            </section>

            <section className='sliderSec py-100' id="sliderSec">
              <div className='max-1200'>
                <SectionHeading headingText='Gallery' data-aos="fade-up"/>
              </div>
              <Tab.Container id="left-tabs-example" defaultActiveKey="cateloge">
                <div className="userTab">                 
                  <Nav variant="tabs" className='sliderSec_tab'>
                    {galleryData.map((item) => {
                      return(
                        <>
                          <Nav.Item>
                            <Nav.Link className="fs-15" eventKey={item.category} onClick={() => setSearchValue(item.category)}>{item.category}</Nav.Link>
                          </Nav.Item>
                        </>
                      )
                    })}
                  </Nav>
                </div>

                <div>
                  <Tab.Content>
                  {galleryData.map((item) => {
                    return(
                      <Tab.Pane eventKey={item.category} className="my-4">
                        <div className='row g-2 w-100'>
                          <div className='col-md-4'>
                            <div className='sliderSec_left'>
                              <ImageElement source='slider-left1.jpg' className='img-fluid' alt='slider-left1' />
                              <h2>Clip</h2>
                              <ImageElement source='slider-left2.jpg' className='img-fluid' alt='slider-left2' />
                            </div>
                          </div>
                          <div className='col-xxl-7 col-md-8'>
                            <Swiper
                              direction={'vertical'}
                              loop= {true}
                              modules={[Virtual, Navigation]}
                              spaceBetween={0}
                              slidesPerView={1.8}
                              centeredSlides={true}
                              navigation={true}
                              virtual
                            >
                              {selectedCategory.map((slideContent, index) => (
                                <SwiperSlide key={slideContent.category} virtualIndex={index}>
                                  <img src={slideContent.link} alt="img"/>
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          </div>
                        </div>
                      </Tab.Pane>
                    )})}
                  </Tab.Content>
                </div>

              </Tab.Container>

              {/* <Tabs
                defaultActiveKey="reel"
                id="uncontrolled-tab-example"
                className="sliderSec_tab mb-3"
              >
                {galleryData.map((slideContent, index) => {
                  return(
                    <>
                      <Tab eventKey={slideContent.category} title={slideContent.category}>
                        <div className='row g-2 w-100'>
                          <div className='col-md-4'>
                            <div className='sliderSec_left'>
                              <ImageElement source='slider-left1.jpg' className='img-fluid' alt='slider-left1' />
                              <h2>Clip</h2>
                              <ImageElement source='slider-left2.jpg' className='img-fluid' alt='slider-left2' />
                            </div>
                          </div>
                          <div className='col-xxl-7 col-md-8'>
                            <Swiper
                              direction={'vertical'}
                              loop= {true}
                              modules={[Virtual, Navigation]}
                              spaceBetween={0}
                              slidesPerView={1.8}
                              centeredSlides={false}
                              navigation={true}
                              virtual
                            >
                              {galleryData.map((slideContent, index) => (
                                <SwiperSlide key={slideContent} virtualIndex={index}>
                                  <img src={`/images/${slideContent}`} alt="img"/>
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          </div>
                        </div>
                      </Tab>
                    </>
                  )
                })}
              </Tabs> */}
            </section>

            <section className='clientSec py-100'>
              <Container>
                <div className='max-1200'>
                  <SectionHeading headingText='Clients' data-aos="fade-up"/>
                  <div>
                    <Swiper
                      spaceBetween={50}
                      slidesPerView={3}
                      onSlideChange={() => console.log('slide change')}
                      onSwiper={(swiper) => console.log(swiper)}
                      breakpoints={breakpoints}
                    >
                      {
                        clientCard.map((item) => {
                          return (
                            <SwiperSlide>
                              <div className='clientSec  position-relative'>
                                {/* <ImageElement source='client-img-shape.svg' className='img-fluid' alt='client-img-shape' /> */}
                                <div className='clientSec_card clientSec_card_client'>
                                  <img src={item.link} className='img-fluid' alt='client-img-shape' />
                                </div>
                              </div>
                            </SwiperSlide>
                          )
                        })
                      }
                    </Swiper>
                  </div>
                </div>
              </Container>
            </section>

            <section className='contactSec py-100'>
              <Container>
                <div className='max-1200'>
                  <SectionHeading headingText='contact' extraclassName='commonHead-light' data-aos="fade-up" />
                </div>
                <div className='contactSec_from'>
                  <Row>
                    <Col md={8}>
                      <h2>CONTACT US</h2>
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        enableReinitialize={true}
                        onSubmit={handleSubmit}
                      >
                        {(props) => {
                          return (
                            <Form>
                              <Row>
                                <Col xl={5} md={6} data-aos="fade-up">
                                  <div className='form-group'>
                                    <TextInput
                                      id="name"
                                      name="name"
                                      type="text"
                                      placeholder='Name'
                                      className='form-control'
                                      setFieldValue={props.handleChange}
                                    />
                                  </div>
                                </Col>
                                <Col xl={5} md={6} className='offset-xl-2' data-aos="fade-up">
                                  <div className='form-group'>
                                    <TextInput
                                      id="email"
                                      name="email"
                                      type="email"
                                      placeholder='Email'
                                      className='form-control'
                                      setFieldValue={props.handleChange}
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col xl={5} md={6} data-aos="fade-up">
                                  <div className='form-group'>
                                    <TextInput
                                      id="phone"
                                      name="phone"
                                      type="text"
                                      placeholder='Mobile No.'
                                      className='form-control'
                                      setFieldValue={props.handleChange}
                                    />
                                  </div>
                                </Col>
                                <Col xl={5} md={6} className='offset-xl-2' data-aos="fade-up">
                                  <div className='form-group'>
                                    <TextInput
                                      id="subject"
                                      name="subject"
                                      type="text"
                                      placeholder='Subject'
                                      className='form-control'
                                      setFieldValue={props.handleChange}
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <div className='form-group' data-aos="fade-up">
                                <AntTextArea
                                  id="message"
                                  name="message"
                                  type="text"
                                  placeholder='Message'
                                  className='form-control'
                                  setFieldValue={props.handleChange}
                                />
                              </div>
                              <button to='#' type='submit' className='submit'>Submit</button>
                            </Form>
                          )
                        }}
                      </Formik>
                    </Col>
                    <Col xxl={3} md={4} className='offset-xxl-1 mt-md-0 mt-4' data-aos="fade-up">
                      <h2>reach US</h2>

                      <div className='contactSec_from_cnt'>
                        <h3>Moving Perspective</h3>
                        <p>Mobile: <a href='tel:+918319581393' className='text-decoration-none'>+918319581393</a></p>
                        <p>Email :<a href='mailto:projects@mp4mov.com' className='text-decoration-none'>projects@mp4mov.com</a></p>
                      </div>

                      <div className='contactSec_from_cnt'>
                        <h3>Office Address:</h3>
                        <p>Sector 45, Gurugram, Haryana 122003</p>
                      </div>

                      <div className='contactSec_from_cnt'>
                        <h3>Contact Time:</h3>
                        <p>Monday to Saturday <br />(10:00 AM - 06:00PM)</p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
            </section>

            <section className='mapSec'>
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d56128.05646856632!2d77.065245!3d28.449310000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18dc634e8939%3A0x1e21350dbb33406f!2sMoving%20Perspective%20LLP!5e0!3m2!1sen!2sin!4v1702406826135!5m2!1sen!2sin" width="100%" height="100%" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </section>

            <footer className='footer'>
              <Container>
                <div className='max-1200'>
                  <div className='footer_cnt d-flex align-items-center justify-content-between py-xxl-4 py-2'>
                    <ImageElement source='logo.svg' className='logo' />
                    <div>
                      <p className='mb-0'>Developed by Arroz Solutions<br />
                        Copyright © <span>{year}</span> <strong>Moving Perspective LLP</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </Container>
            </footer>
          </>
        )
      }

    </main>
  )
}

export default HomePage;