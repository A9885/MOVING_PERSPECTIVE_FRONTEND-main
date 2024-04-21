import React, { useEffect, useState } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { Upload, Form } from "antd";
import { useField } from "formik";
import { useTranslation } from "react-i18next";
import ImgCrop from "antd-img-crop";

// import { useDispatch, useSelector } from "react-redux";
// import { logger, modalNotification } from "../../../utils";
// import {
//   selectUserData,
//   // updateUserData,
// } from "../../../redux/AuthSlice/index.slice";
// import { AdminProfileServices } from "../../../services";
import { ImageElement } from "../..";
import config from "../../../config";

function UploadInput({
  applyImageCropper = true,
  label = "",
  apiEndPoints,
  name,
  defaultImageUrl,
  aspect,
  children,
  callUpdateApi,
  // mediaUrl,]
  imageType,
  stepTwoImage,
  validateFileType = ["image/jpeg", "image/png", "image/jpg"],
  setUploadLoading,
  button,
  changeFunc,
  // defaultKey,
  ...rest
}) {
  // const { t } = useTranslation();

  // const dispatch = useDispatch();
  // const userData = useSelector(selectUserData);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [field, meta, helpers] = useField(name);
  const configs = { ...field, ...rest };
  if (meta && meta.touched && meta.error) {
    configs.error = true;
    configs.helperText = meta.error;
  }

  // useEffect(() => {
  //   if (defaultImageUrl) {
  //     setImageUrl(defaultImageUrl);
  //   }
  // }, [defaultImageUrl]);

  // useEffect(() => {
  //   if (defaultKey) {
  //     setImageUrl("");
  //   }
  // }, [defaultKey]);

  // const getBase64 = (img, callback) => {
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => callback(reader.result));
  //   reader.readAsDataURL(img);
  // };

  // const beforeUpload = (file) => {
  //   const isJpgOrPng = validateFileType.includes(file.type);

  //   if (!isJpgOrPng) {
  //     modalNotification({
  //       type: "error",
  //       message: `${
  //         // applyImageCropper
  //         // ?
  //         t("text.common.imageOnlyMessage")
  //         //   :
  //         // "Please Upload Either Pdf , Docx or Doc"
  //       }`,
  //     });
  //   }

  //   const isLt2M = file.size / 1024 / 1024 < 10;

  //   if (!isLt2M) {
  //     if (applyImageCropper) {
  //       modalNotification({
  //         type: "error",
  //         message: `${
  //           applyImageCropper && t("text.common.imageSizeExceedingMessage")
  //         }`,
  //       });
  //     }
  //   }

  //   return isJpgOrPng && isLt2M;
  // };

  // const submit = async (basePath) => {
  //   try {
  //     let bodyData = {};
  //     bodyData.profileImage = basePath;
  //     const res = await AdminProfileServices.updateProfileImagServices(
  //       bodyData
  //     );
  //     const { success, data } = res;
  //     if (success) {
  //       let updatesUserData = { ...userData };
  //       updatesUserData.profileImageUrl = data.profileImageUrl;
  //       dispatch(
  //         updateUserData({
  //           ...updatesUserData,
  //         })
  //       );
  //     }
  //   } catch (error) {
  //     logger(error);
  //   }
  // };

  // const handleChange = (info) => {
  //   if (info.file.status === "uploading") {
  //     setLoading(true);
  //     if (setUploadLoading) {
  //       setUploadLoading(true);
  //     }
  //   } else {
  //     const { status, response } = info.file;
  //     if (status === "done") {
  //       getBase64(info.file.originFileObj, (url) => {
  //         setLoading(false);
  //         setImageUrl(url);
  //         if (setUploadLoading) {
  //           setUploadLoading(false);
  //         }
  //       });
  //       if (applyImageCropper) {
  //         modalNotification({
  //           type: "success",
  //           message: "Image uploaded successfully",
  //         });
  //         helpers.setValue(response.data.basePath);
  //         if (userData?.userRole?.role?.role === "admin") {
  //           submit(response.data.basePath);
  //         }
  //       } else {
  //         modalNotification({
  //           type: "success",
  //           message: `${info.file.name} uploaded successfully`,
  //         });
  //         if (imageType) {
  //           helpers.setValue(response.data.basePath);
  //         } else {
  //           helpers.setValue({
  //             url: response.data.url,
  //             name: info.file.name,
  //             path: response.data.basePath,
  //           });
  //         }
  //         // mediaUrl({
  //         //   url: response.data.url,
  //         //   name: info.file.name,
  //         //   path: response.data.basePath,
  //         // });
  //       }
  //     } else if (status === "error") {
  //       setLoading(false);
  //       modalNotification({
  //         type: "error",
  //         message:
  //           info?.file?.response?.message ||
  //           info?.file?.response?.error?.message,
  //         description: `${info.file.name} file upload failed. ${info.file.response.detail}`,
  //       });
  //     }
  //   }
  // };
//   const handleFileUpload = (event) => {
//     const headers = {
//         'Content-Type': 'multipart/form-data',
//     };
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
//         const imgLink = response.data; // If the response contains data
//     })
//     .catch(error => {
//         console.error(`Error: ${error.response.status} - ${error.response.data}`);
//     });
// }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        <div className="my-auto text-center">
          <span className="icon-camera" />
          <div className="font-sm txt">+ Upload Image</div>
        </div>
      </div>
    </div>
  );
  return applyImageCropper ? (
    <Form.Item
      label={label}
      className="flex-col"
      name={name}
      help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
      validateStatus={configs.error ? "error" : "success"}
    >
      <ImgCrop quality={1} aspect={aspect}>
        {button ? (
          <Upload
            name={name}
            type="file"
            listType="picture"
            className="avatar-uploader"
            showUploadList={false}
            action={apiEndPoints}
            // beforeUpload={beforeUpload}
            onChange={changeFunc}
            disabled={loading}
            {...rest}
          >
            {children}
          </Upload>
        ) : (
          <Upload
            name={name}
            type="file"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            action={apiEndPoints}
            // beforeUpload={beforeUpload}
            // onChange={handleChange}
            disabled={loading}
            {...rest}
          >
            {imageUrl ? (
              loading ? (
                <LoadingOutlined />
              ) : (
                <img
                  src={imageUrl}
                  alt="avatar"
                  className="img-fluid w-100 h-100 rounded-circle"
                  style={{
                    // width: '100%',
                    height: "100%",
                  }}
                />
              )
            ) : (
              uploadButton
            )}
            {children}
          </Upload>
        )}
      </ImgCrop>
    </Form.Item>
  ) : (
    <Form.Item
      className="flex-col"
      name={name}
      help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
      validateStatus={configs.error ? "error" : "success"}
    >
      <label>{label}</label>
      <Upload
        name={name}
        type="file"
        listType="picture-card"
        className="avatar-uploader"
        // className="full-width-md text-center"
        showUploadList={false}
        action={apiEndPoints}
        // beforeUpload={beforeUpload}
        // onChange={handleChange}
        {...rest}
      >
        <div className="ant-upload-icon">
          {loading ? (
            <LoadingOutlined />
          ) : (
            <>
              {imageUrl ? (
                <ImageElement
                  previewSource={imageUrl}
                  alt="avatar"
                  className="full-width-md text-center"
                />
              ) : (
                <>
                  <PlusOutlined /> <p>Upload</p>
                </>
              )}
            </>
          )}
        </div>

        {children}
      </Upload>
    </Form.Item>
  );
}

export default UploadInput;
