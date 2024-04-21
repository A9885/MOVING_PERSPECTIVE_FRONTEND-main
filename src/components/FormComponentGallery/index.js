import React, { useEffect, useState } from 'react';
import { Input as TextInput, AntTextArea as TextArea, Select } from '../Antd';
import { Formik, Form } from 'formik';
import axios from 'axios';
import config from '../../config';

function FormComponentGallery( {data, endPoint, id, handleFileUpload, onSubmit, loader, buttonName} ) {
  
const fileType = [
    {
      id: 1,
      category: "Image"
    },
    {
      id: 2,
      category: "Video"
    }
  ]
  const [category, setCategory] = useState();
  const [upload, setUpload] = useState("");

  const initialValues = {
    category:'',
    type:'',
    link:''
  }

  const fetchData = async (url, setDataCallback) => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/${url}`);
      const { resCode, data } = response;
      console.log("response", data.data);
      setDataCallback(data.data);
    } catch (error) {
      console.log(`${url} data fetching unsuccessful.`);
    }
  };

  useEffect(() => {
    fetchData('gallery/get_all_category', setCategory);
  }, []);

//   const handleFileUpload = (event) => {
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

  // const submit = async (values) => {
  //   setLoading(true);
  //   if(endPoint == "gallery/create_new"){
  //     try {
  //       values.link = upload;
  //       const response = await axios.post(`${config.API_BASE_URL}/api/gallery/create_new`, values);
  //     } catch (error) {
  //       console.log(`data fetching unsuccessful.`);
  //     }
  //   }
  //   if(endPoint == "gallery"){
  //     try {
  //       values.link = upload;
  //       const response = await axios.put(`${config.API_BASE_URL}/api/gallery/${id}`, values);
  //     } catch (error) {
  //       console.log(`Unsuccess!`);
  //     }
  //   }
  // }
  const [selectedValue, setSelectedValue] = useState("Image");
  const handleChange = (value) => {
    setSelectedValue(value);
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {(props) => {
          return(
            <>
            <Form>
              <div className='form-group'>
                <label className='form-label'>Select Category</label>
                <Select 
                  name="category"
                  arrayOfData={category}
                  placeholder="Select Category"
                  setFieldValue={props.handleChange}
                  otherOption="otherOption"
                  setCategory={setCategory}
                />
              </div>

              <div className='form-group'>
                <label className='form-label'>Select File Type</label>
                <Select 
                  name="type"
                  arrayOfData={fileType}
                  onSelect={handleChange}
                  placeholder="Select File type"
                  setFieldValue={props.handleChange}
                  value={selectedValue}
                />
              </div>
              {selectedValue === 'Image'  ? (
                <div className='form-group'>
                  <label className='form-label'>Upload Image</label>
                  <input 
                    id="upload" 
                    name="link" 
                    type="file" 
                    className="form-control full-width-md text-center"  
                    onChange={(e) => handleFileUpload(e)}
                  />
                </div>
              ) : (
                <div className='form-group'>
                  <label className='form-label'>Url of Video</label>
                  <TextInput  
                    id="vdoUpload"
                    name="link"
                    type="text"
                    className="form-control"
                    placeholder="Enter video link"
                    setFieldValue={props.handleChange}
                  />
                </div>
              )}
              {/* Update Button */}
                <div className="mt-4 text-end">
                  <button type="submit" className="btn btn-primary ms-auto" disabled={selectedValue === 'Video' ? false : loader}>{buttonName}</button>
                </div>
              </Form>
            </>
          )
        }}
      </Formik>
    </>
  )
}

export default FormComponentGallery;