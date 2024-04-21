import React, { useState } from 'react';
import { Input as TextInput, AntTextArea as TextArea } from '../Antd';
import { Form, Formik } from "formik";
// import UploadInput from '../Antd/Upload/index.ant';
import axios from 'axios';
import config from '../../config';
import { GlobalLoader } from '../UiElement';
import modalNotification from '../../utils/notification';

function FormClient({ onSubmit, handleFileUpload, title, buttonName, loader }) {

    // const [upload, setUpload] = useState(null);

    // Initial form values
    const initialValues = {
        link:'',
    }
    
    // const handleFileUpload = (event) => {
    //     const file = event.target.files[0];
    //     // create a new FormData object and append the file to it
    //     const formData = new FormData();
    //     formData.append("files", file);

    //     console.log("formData", formData);
    //     console.log("file", file);

    //     axios.post(`${config.API_BASE_URL}/api/files_upload`, formData, {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //           "x-rapidapi-host": "file-upload8.p.rapidapi.com",
    //           "x-rapidapi-key": "your-rapidapi-key-here",
    //         },
    //       })
    //     .then(response => {
    //         console.log('Image uploaded successfully!', response);
    //         const imgLink = response.data.url; // If the response contains data
    //         setUpload(imgLink);
    //         console.log("response.data.url", response.data.url);
    //     })
    //     .catch(error => {
    //         console.error(`Error: ${error.response.status} - ${error.response.data}`);
    //     });

    // }

    return (
        <>
            {/* {loading ? <GlobalLoader /> : ( */}
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                >
                    {(props) => {
                        return (
                            <Form>
                                {/* Image Upload */}
                                <div className="form-group">
                                    <label className="form-label">{title}</label>
                                    <input 
                                        id="img" 
                                        name="img" 
                                        type="file" 
                                        className="form-control full-width-md text-center"  
                                        onChange={(e) => handleFileUpload(e)}
                                    />
                                </div>

                                {/* Update Button */}
                                <div className="mt-4 text-end">
                                    <button type="submit" className="btn btn-primary ms-auto" disabled={loader}>{buttonName}</button>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            {/* )} */}
        </>
    )
}

export default FormClient;
