import React, { useState } from 'react';
import { Input as TextInput, AntTextArea as TextArea } from '../Antd';
import { Form, Formik } from "formik";
// import UploadInput from '../Antd/Upload/index.ant';
import axios from 'axios';
import config from '../../config';
import { GlobalLoader } from '../UiElement';
import modalNotification from '../../utils/notification';
import * as Yup from 'yup';

function FormComponent({ endPoint, id, title="", buttonName, loader }) {

    // React state variables
    const [loading, setLoading] = useState(false);
    const [upload, setUpload] = useState(null);

    const [buttonLoading, setButtonLoading] = useState(true);

    // Initial form values
    const initialValues = {
        link:'',
        title: '',
        description: ''
    }

    const validationSchema = Yup.object({
        upload: Yup.string().required('file is Required'),
        title: Yup.string().required('title is Required'),
        description: Yup.string().required('description is Required'),
      });

    // Submit function triggered on form submission
    const submit = async (values) => {
        // Set loading state to true to indicate the start of the request
        setLoading(true);

        try {
            // Check the endpoint type to determine the API request
            if (endPoint === "topBanner") {
                // Make a PUT request to update the top banner
                values.link = upload;
                const res = await axios.put(`${config.API_BASE_URL}/api/home_banner`, values);
                console.log("Success data wow !");
            }

            if (endPoint === "service/id") {
                // Handle the case when the endpoint is "service"
             
                values.link = upload;
                console.log("values.upload", values);
                
                const response = await axios.put(`${config.API_BASE_URL}/api/service/${id}`, values);
                const {resCode, message} = response.data;
                if(resCode == 200){
                    modalNotification({
                        type: "success",
                        message: message
                    })
                    window.location.reload();
                }
                console.log("services cards submit");
            }

            if (endPoint === "client") {
                // Handle the case when the endpoint is "service"
                // console.log("client", client);
                values.link = upload;
                const response = await axios.put(`${config.API_BASE_URL}/api/client/${id}`, values);
                console.log("client cards submit");
            }

            if (endPoint === "create_new") {
                // Handle the case when the endpoint is "service"
                // console.log("client", client);
                values.link = upload;
                const response = await axios.post(`${config.API_BASE_URL}/api/client/create_new`, values);
                const {resCode, message} = response.data;
                if(resCode == 200){
                    modalNotification({
                        type: "success",
                        message: message
                    })
                }
                console.log("client cards Created");
            }
            
            if (endPoint === "service") {
                values.link = upload;
                const response = await axios.post(`${config.API_BASE_URL}/api/service`, values);
                const {resCode, message} = response.data;
                if(resCode == 200){
                    modalNotification({
                        type: "success",
                        message: message
                    })
                }
            }
        } catch (error) {
            // Log an error message if the submission is unsuccessful
            modalNotification({
                type: "error",
                message: error
            })
        } finally {
            // Set loading state to false to indicate the end of the request, whether successful or not
            setLoading(false);
        }
    }

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

        // axios.post(`${config.API_BASE_URL}/api/video_upload`, formData, {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //       "x-rapidapi-host": "file-upload8.p.rapidapi.com",
        //       "x-rapidapi-key": "your-rapidapi-key-here",
        //     },
        //   })
        // .then(response => {
        //     console.log('Image uploaded successfully!', response);
        //     const videoLink = response.data.url; // If the response contains data
        //     setUpload(videoLink);
        //     console.log("response.data.url", response.data.url);
        // })
        // .catch(error => {
        //     console.error(`Error: ${error.response.status} - ${error.response.data}`);
        // });
    }

    return (
        <>
            {loading ? <GlobalLoader /> : (
                <Formik
                    initialValues={initialValues}
                    onSubmit={submit}
                    enableReinitialize={true}
                    // validationSchema={validationSchema}
                >
                    {(props) => {
                        return (
                            <Form>
                                {/* Banner Video Upload */}
                                <div className="form-group">
                                    <label className="form-label">{title}</label>
                                    {/* <UploadInput
                                        className="full-width-md text-center"
                                        name="file"
                                        type="file"
                                        applyImageCropper={false}
                                        imageType
                                        changeFunc = {handleFileUpload}
                                    /> */}
                                    {endPoint === "topBanner"  ? 
                                        (<input
                                            id="videoLink"
                                            name="upload"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter banner video link"
                                            onChange={(e) => setUpload(e.target.value)}
                                        />) : 
                                        (<input 
                                            id="upload" 
                                            name="upload" 
                                            type="file" 
                                            className="form-control full-width-md text-center"  
                                            onChange={(e) => handleFileUpload(e)}
                                        />)
                                    }
                                </div>

                                {/* Banner Title Input */}
                                <div className="form-group">
                                    <label className="form-label">Title</label>
                                    <TextInput
                                        id="bannerTitle"
                                        name="title"
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter banner title here..."
                                        setFieldValue={props.handleChange}
                                    />
                                </div>

                                {/* Banner Description Textarea */}
                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <TextArea
                                        id="bannerDesc"
                                        name="description"
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter banner description here..."
                                        setFieldValue={props.handleChange}
                                    />
                                </div>

                                {/* Update Button */}
                                <div className="mt-4 text-end">
                                    <button type="submit" className="btn btn-primary ms-auto">{buttonName}</button>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            )}
        </>
    )
}

export default FormComponent;
