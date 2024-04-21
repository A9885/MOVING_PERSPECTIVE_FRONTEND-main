// import { MoreOutlined } from "@ant-design/icons";
// import CryptoJS from "crypto-js";
// import moment from "moment";
// import { Link } from "react-router-dom";
// import dayjs from "dayjs";
// import JSpdf from "jspdf";
// import html2canvas from "html2canvas";
// import { ActionDropdown, AntDropdown } from "../components";
// import config from "../config";
// import modalNotification from "./notification";

// let localeData = require("dayjs/plugin/localeData");
// let utc = require("dayjs/plugin/utc");
// let timezone = require("dayjs/plugin/timezone");
// let isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
// let isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
// let isBetween = require("dayjs/plugin/isBetween");

// dayjs.extend(localeData);
// dayjs.extend(utc);
// dayjs.extend(timezone);
// dayjs.extend(isSameOrBefore);
// dayjs.extend(isSameOrAfter);
// dayjs.extend(isBetween);

// export const defaultCountryCode = "+44";

// const getItem = (path, label, key, icon, children, withAuth) => {
//   if (children) {
//     return { label, key, icon, children, path, withAuth };
//   }
//   return { label, key, icon, path, withAuth };
// };

// export const getHeaderData = (arr) => {
//   if (arr instanceof Array) {
//     return arr.reduce((prev, item) => {
//       if (item?.belongsToHeader) {
//         if (item.children instanceof Array) {
//           const children = item.children.reduce(
//             (prevElement, currentSubChild) => {
//               if (currentSubChild?.belongsToHeader) {
//                 prevElement.push(
//                   getItem(
//                     currentSubChild?.path,
//                     currentSubChild?.name,
//                     currentSubChild?.key,
//                     currentSubChild?.icon,
//                     "",
//                     currentSubChild?.withAuth
//                   )
//                 );
//               }
//               return prevElement;
//             },
//             []
//           );
//           prev.push(
//             getItem(
//               item?.path,
//               item?.name,
//               item?.key,
//               item?.icon,
//               children,
//               item?.withAuth
//             )
//           );
//         } else {
//           prev.push(
//             getItem(
//               item?.path,
//               item?.name,
//               item?.key,
//               item?.icon,
//               "",
//               item?.withAuth
//             )
//           );
//         }
//       }
//       return prev;
//     }, []);
//   }
//   return [];
// };
// export const totalTimeDifference = (createdAt, updatedAt) => {
//   let startTime = moment(createdAt);

//   let endTime = moment(updatedAt);

//   let difference = startTime.from(endTime);
//   return difference;
// };
// export const getFooterLink = (arr) => {
//   if (arr instanceof Array) {
//     return arr.reduce((prev, item) => {
//       if (item?.belongsToFooter) {
//         if (item.children instanceof Array) {
//           const children = item.children.reduce(
//             (prevElement, currentSubChild) => {
//               if (currentSubChild?.belongsToFooter) {
//                 prevElement.push(
//                   getItem(
//                     currentSubChild?.path,
//                     currentSubChild?.name,
//                     currentSubChild?.key,
//                     currentSubChild?.icon,
//                     "",
//                     item?.withAuth
//                   )
//                 );
//               }
//               return prevElement;
//             },
//             []
//           );
//           prev.push(
//             getItem(
//               item?.path,
//               item?.name,
//               item?.key,
//               item?.icon,
//               children,
//               item?.withAuth
//             )
//           );
//         } else {
//           prev.push(
//             getItem(
//               item?.path,
//               item?.name,
//               item?.key,
//               item?.icon,
//               "",
//               item?.withAuth
//             )
//           );
//         }
//       }
//       return prev;
//     }, []);
//   }
//   return [];
// };

// export const removeSessionStorageToken = () => {
//   if (sessionStorage.getItem(`${config.NAME_KEY}:token`)) {
//     sessionStorage.setItem(`${config.NAME_KEY}:token`, null);
//   }
// };

// export const setSessionStorageToken = (token) => {
//   sessionStorage.setItem(
//     `${config.NAME_KEY}:token`,
//     CryptoJS.AES.encrypt(token, `${config.NAME_KEY}-token`).toString()
//   );
// };

// export const removeLocalStorageToken = (navigate) => {
//   if (localStorage.getItem(`${config.NAME_KEY}:token`)) {
//     localStorage.setItem(`${config.NAME_KEY}:token`, null);
//   }
//   if (navigate) {
//     navigate("/");
//   }
// };

// export const getSessionStorageToken = () => {
//   const ciphertext = sessionStorage.getItem(`${config.NAME_KEY}:token`);
//   if (ciphertext) {
//     const bytes = CryptoJS.AES.decrypt(ciphertext, `${config.NAME_KEY}-token`);
//     return bytes.toString(CryptoJS.enc.Utf8);
//   }
//   return false;
// };

// export const setLocalStorageToken = (token) => {
//   localStorage.setItem(
//     `${config.NAME_KEY}:token`,
//     CryptoJS.AES.encrypt(token, `${config.NAME_KEY}-token`).toString()
//   );
// };

// export const getLocalStorageToken = () => {
//   const token = localStorage.getItem(`${config.NAME_KEY}:token`);
//   if (token) {
//     const bytes = CryptoJS?.AES?.decrypt(token, `${config.NAME_KEY}-token`);
//     return bytes?.toString(CryptoJS.enc.Utf8);
//   }
//   return false;
// };

// export const getLocalStorageLanguage = () => {
//   const language = localStorage.getItem(`${config.NAME_KEY}:language`);
//   if (language) {
//     return ["en", "hi"].includes(language) ? language : config.DEFAULT_LANGUAGE;
//   }
//   return config.DEFAULT_LANGUAGE;
// };

// export const getCompleteUrl = (url) => {
//   return url;
// };

// export function decodeQueryData(data) {
//   return JSON.parse(
//     `{"${decodeURI(data)
//       .replace(/"/g, '\\"')
//       .replace(/&/g, '","')
//       .replace(/=/g, '":"')
//       .replace("?", "")}"}`
//   );
// }

// export const navigateWithParam = (data, navigate, pathname) => {
//   const searchParams = new URLSearchParams(data).toString();
//   navigate(`${pathname}?${searchParams}`);
// };

// export function getSortType(data) {
//   return data === "ASC" ? "asc" : "desc";
// }

// export function dateFormatter(params, format) {
//   return params
//     ? moment(params)
//         .tz(moment.tz.guess())
//         .format(format ?? config.DATE_FORMAT)
//     : "";
// }

// export function dayJsDateFormatter(params, format) {
//   return params
//     ? dayjs(params)
//         .tz(dayjs.tz.guess())
//         .format(format ?? config.DATE_FORMAT)
//     : "";
// }

// export function dayJsFormatter(params) {
//   return dayjs(params);
// }

// export function dayJsFormatFormatter(params, format) {
//   return dayjs(params, format);
// }

// export function dateFormatterWithFormat(param, oldFormat, newFormat) {
//   return moment(param, oldFormat).format(newFormat);
// }

// export function filterDateFormatter(param, format) {
//   return moment(param).format(format);
// }
// export function encoder(code) {
//   return window.btoa(code);
// }
// export function decoder(str) {
//   // return window.atob(code);
//   if (str === "" || str?.trim() === "") {
//     return false;
//   }
//   try {
//     return window.atob(str);
//   } catch (err) {
//     modalNotification({
//       type: "error",
//       message: "No data found",
//     });
//     return false;
//   }
// }
// export function momentDateFormatter(param, format) {
//   return moment(param, format);
// }

// export const momentTimeFormatter = (param) => {
//   return moment(param);
// };

// export const convertToMinutes = (hours, min = 0) => {
//   let minutes = hours * 60;

//   return minutes + min;
// };

// export const getTime = (startTime, endTime) => {
//   let arr = [];

//   for (
//     let time = dayJsFormatter(startTime);
//     time <= dayJsFormatter(endTime);
//     time.add(1, "hour")
//   ) {
//     arr.push(dayJsDateFormatter(time, "HH:mm"));
//   }
//   return arr;
// };

// export const getTimeByShift = (
//   data,
//   hours,
//   minutes,
//   date,
//   withRange = false
// ) => {
//   let morning = [];
//   let afternoon = [];
//   let night = [];
//   let shiftobj = {};
//   if (withRange) {
//     data.forEach((item) => {
//       let nextTime = momentTimeFormatter(`${date} ${item}`)
//         .add(
//           // convertToMinutes(duration, minute) - (duration ? minute : 0),
//           convertToMinutes(hours, minutes),
//           "minutes"
//         )
//         .format("HH:mm");
//       if (item <= "11:55") {
//         morning.push(`${item} - ${nextTime}`);
//       } else if (item <= "16:55") {
//         afternoon.push(`${item} - ${nextTime}`);
//       } else {
//         night.push(`${item} - ${nextTime}`);
//       }
//     });
//   } else {
//     data.forEach((item) => {
//       if (item <= "11:55") {
//         morning.push(item);
//       } else if (item <= "16:55") {
//         afternoon.push(item);
//       } else {
//         night.push(item);
//       }
//     });
//   }

//   shiftobj = {
//     morning,
//     afternoon,
//     night,
//   };
//   return shiftobj;
// };

// export const getDisabledTimeSlot = (data, date, duration, minute = 0) => {
//   let arr = [];
//   if (data?.[date]?.length > 0) {
//     data?.[date].forEach((item) => {
//       let nextTime = momentTimeFormatter(`${date} ${item}`)
//         .add(
//           // convertToMinutes(duration, minute) - (duration ? minute : 0),
//           convertToMinutes(duration, minute) - 5,
//           "minutes"
//         )
//         .format("DD-MM-YYYY HH:mm");
//       let previousTime = momentTimeFormatter(`${date} ${item}`)
//         .subtract(
//           // convertToMinutes(duration, minute) - (duration ? minute : 0),
//           convertToMinutes(duration, minute) - 5,
//           "minutes"
//         )
//         .format("DD-MM-YYYY HH:mm");
//       for (
//         let time = momentDateFormatter(`${previousTime}`, "DD-MM-YYYY HH:mm");
//         time <= momentDateFormatter(`${nextTime}`, "DD-MM-YYYY HH:mm");
//         time.add(5, "minutes").format("HH:mm")
//       ) {
//         if (data?.[date].includes(dateFormatter(time, "HH:mm")) === false) {
//           arr.push(dateFormatter(time, "HH:mm"));
//         }
//       }
//     });
//   }

//   let unique = [...new Set(arr)];
//   return unique;
// };

// export function readMoreTextShow(
//   data,
//   showMoreText,
//   extraReadClass,
//   title = "Read More"
// ) {
//   if ([undefined, null, false].includes(data)) {
//     return <></>;
//   }
//   if (data?.length < 50) {
//     return <>{data}</>;
//   }

//   return (
//     <p className="mb-0">
//       {data.substring(0, 45)}...
//       {showMoreText ? (
//         <Link
//           to="/"
//           onClick={(e) => {
//             e.preventDefault();
//             showMoreText({ data });
//           }}
//           className={`ms-1 ${extraReadClass}`}
//         >
//           <strong>{title}</strong>
//           {/* {t("common.readMore")} */}
//         </Link>
//       ) : (
//         ""
//       )}
//     </p>
//   );
// }

// export function PhoneNumber({ countryCode, contactNumber }) {
//   if (countryCode && contactNumber) {
//     return <>{`${countryCode}-${contactNumber}`}</>;
//   }
//   return <span className="center">-</span>;
// }

// export function otpRegex() {
//   let regex = /^[0-9]+$/;
//   return regex;
// }

// export function phoneRegex() {
//   let regex =
//     /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
//   return regex;
// }

// export const getSideBarData = (arr) => {
//   if (arr instanceof Array) {
//     return arr.reduce((prev, item) => {
//       if (item?.belongsToSidebar) {
//         if (item.children instanceof Array) {
//           const children = item.children.reduce(
//             (prevElement, currentSubChild) => {
//               if (currentSubChild?.belongsToSidebar) {
//                 prevElement.push(
//                   getItem(
//                     currentSubChild?.path,
//                     currentSubChild?.name,
//                     currentSubChild?.key,
//                     currentSubChild?.icon,
//                     ""
//                   )
//                 );
//               }
//               return prevElement;
//             },
//             []
//           );
//           prev.push(
//             getItem(item?.path, item?.name, item?.key, item?.icon, children)
//           );
//         } else {
//           prev.push(getItem(item?.path, item?.name, item?.key, item?.icon));
//         }
//       }
//       return prev;
//     }, []);
//   }
//   return [];
// };

// export const getSideBarActiveKey = (arr, activePath) => {
//   let activeKey = 0;
//   if (arr?.length > 0) {
//     arr.forEach((item, key) => {
//       if (item?.children) {
//         item.children.forEach((e) => {
//           if (e.path.includes(activePath)) {
//             activeKey = key;
//           }
//         });
//       } else if (item.path.includes(activePath)) {
//         activeKey = key;
//       }
//     });
//   }

//   return activeKey;
// };

// export function handlePreview({ files }) {
//   const [file] = files;
//   if (file) {
//     return URL.createObjectURL(file);
//   }
// }

// export const setSessionStorage = (keyName, formData) => {
//   let stringData = JSON.stringify(formData);
//   sessionStorage.setItem(
//     `${config.NAME_KEY}:${keyName}`,
//     CryptoJS.AES.encrypt(stringData, `${config.NAME_KEY}-${keyName}`).toString()
//   );
// };

// export const getSessionStorage = (keyName) => {
//   const cipherText = sessionStorage.getItem(`${config.NAME_KEY}:${keyName}`);
//   if (cipherText) {
//     const bytes = CryptoJS.AES.decrypt(
//       cipherText,
//       `${config.NAME_KEY}-${keyName}`
//     );
//     return JSON.parse(bytes?.toString(CryptoJS.enc.Utf8));
//   }
//   return false;
// };

// export const removeSessionStorage = (keyName) => {
//   if (sessionStorage.getItem(`${config.NAME_KEY}:${keyName}`)) {
//     sessionStorage.setItem(`${config.NAME_KEY}:${keyName}`, "");
//   }
// };

// export const getCharLeft = (char, maxChar) => {
//   if (char && maxChar) return maxChar - char.length;
//   else return maxChar;
// };

// export const clearSessionStorage = () => {
//   sessionStorage.clear();
// };

// export const generateTimeSlot = (
//   timeSlotData,
//   durationHour = 2,
//   durationMinute = 30
// ) => {
//   let dateSlot = [];
//   Object.keys(timeSlotData).map((date) => {
//     let timeSlot = [];
//     timeSlotData[date].map((item) => {
//       let toTime = momentTimeFormatter(`${date} ${item}`)
//         .add(convertToMinutes(durationHour, durationMinute), "minutes")
//         .format("HH:mm");
//       timeSlot.push({
//         from_time: item,
//         to_time: toTime,
//       });
//     });
//     dateSlot.push({
//       date,
//       slots: timeSlot,
//     });
//   });
//   return dateSlot;
// };

// export const generateEditTimeSlot = (data) => {
//   let dateData = {};
//   data.map((e) => {
//     dateData = { ...dateData, [e.date]: e.slots.map((z) => z.from_time) };
//   });
//   return dateData;
// };

// export const generateEditAvailableTimeSlot = (data, selectDate) => {
//   let availableSlot = [];
//   data.forEach((e) => {
//     if (e.date === selectDate) {
//       e.slots.forEach((z) => {
//         if (z.availablity !== 1) {
//           availableSlot.push(z.from_time);
//         }
//       });
//     }
//   });
//   return availableSlot;
// };

// export const phoneNumberField = (e) => {
//   let ASCIICode = e.which ? e.which : e.keyCode;
//   if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
//     e.preventDefault();
//   }
// };

// export const phoneField = (e) => {
//   let ASCIICode = e.which ? e.which : e.keyCode;
//   if (ASCIICode === 107 || ASCIICode === 109 || ASCIICode === 69) {
//     e.preventDefault();
//   }
// };

// export const downloadPdf = (url) => {
//   const link = document.createElement("a");
//   link.href = url;
//   link.download = "Invoice.pdf";
//   link.target = "_blank";
//   link.click();
// };

// export const getPercentage = (value, percentage) => {
//   return (value / 100) * percentage;
// };
// export const makeValidLink = (data) => {
//   let link = `${data?.search("http") < 0 ? `http://${data}` : `${data}`}`;
//   return link;
// };
// export const getAddGoogleCalenderUrl = (bookingTitle, bookingDate, toTime) => {
//   let timeDate = `${dateFormatter(
//     bookingDate,
//     "YYYYMMDDTHHmmss"
//   )}Z/${dateFormatter(bookingDate, "YYYYMMDDT")}${toTime?.replace(/:/g, "")}`;
//   return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${bookingTitle}&dates=${timeDate}`;
// };

// export const agoDateTime = (addHour, addType, format, date = "") => {
//   let getCurrentTime = momentTimeFormatter(date || new Date());
//   return getCurrentTime.add(addHour, addType).format(format);
// };

// export const arrayDataToString = (data) => {
//   let uniqueData = [...new Set(data)];
//   let newData = "";
//   if (uniqueData) {
//     uniqueData?.map((item, key) => {
//       return uniqueData?.length !== key + 1
//         ? (newData += `${item}, `)
//         : (newData += `${item}.`);
//     });
//   }
//   return data ? newData : "-";
// };

// export const experienceCount = (data) => {
//   if (data !== undefined) {
//     let checkData = data.find((d) => {
//       return d.search(/[+]/gi) > 0;
//     });
//     // console.log(data,checkData)
//     // if (data.length === 1) {
//     //   let exp = "";

//     //   return (exp = data[0]);
//     // } else
//     if (checkData) {
//       return checkData;
//     }
//     // else {
//     //   data.map((item,key)=>{

//     //     let text = item.replace(/[&\/\\#,()$~%'":*?<>{}!]/gi, '')
//     //     // console.log(text,text.match(/\d{1,} year/gi))
//     //     if(text.search(/[+]/gi) > 0){
//     //       exp = text
//     //     }else if(text.search(/[month]/gi) === -1){
//     //       console.log(data)
//     //      exp = text
//     //     }
//     //   })
//     //   return exp

//     // }
//   }
//   // return text
// };

// export const dateTimeFormatter = (date, format) => {
//   return date ? moment(date).local().format(format) : "-";
// };

// export const showDateInBrowser = (data) => {
//   try {
//     return moment(data)
//       .add(moment.duration(5.3, "hours"))
//       .format("ddd, MMM D, YYYY hh:mm A");
//   } catch (error) {
//     return moment(data).format("DD/MM/YYYY hh:mm A");
//   }
// };
// export const checkValidData = (data) => {
//   return data || "-";
// };
// export const checkValidCount = (data) => {
//   return <>{data || 0}</>;
// };

// export const checkValidPrice = (data) => {
//   return (
//     <>
//       <sup>$</sup> {parseFloat(data || 0).toFixed(2)}
//     </>
//   );
// };

// export function ImageElement({
//   previewSource = "",
//   source,
//   alt = "image",
//   ...rest
// }) {
//   let pattern = /^\//g;
//   return (
//     <>
//       {previewSource ? (
//         <img src={previewSource} alt={alt} {...rest} />
//       ) : (
//         <img
//           src={`${config.IMAGE_URL}/${source?.replace(pattern, "")}`}
//           alt={alt}
//           {...rest}
//         />
//       )}
//     </>
//   );
// }
// export function commasFormatter(data) {
//   return data.join(", ");
// }

// export const actionFormatter = (options) => {
//   return (
//     <>
//       <ActionDropdown options={options} />
//     </>
//   );
// };

// export function PhoneNumberCountry({ countryCode, contactNumber }) {
//   let code = "";
//   if (countryCode !== null) {
//     if (countryCode.toString().includes("+")) code = countryCode;
//     else code = `+${countryCode}`;
//   }
//   if (countryCode !== null && contactNumber !== null) {
//     return <>{`${code}-${contactNumber}`}</>;
//   } else if (countryCode === null && contactNumber !== null) {
//     return <>{`${contactNumber}`}</>;
//   } else return "-";
// }

// export const serialNumberFormatter = (page, sizePerPage, index) => {
//   return (page - 1) * sizePerPage + index + 1;
// };

// export const linkFormatter = (name, link = "#", extraClassName = "") => {
//   return (
//     <Link className={`${extraClassName}`} to={link}>
//       {name}
//     </Link>
//   );
// };

// export const nameFormatter = (firstName, lastName) => {
//   return (
//     <>
//       {firstName
//         ? ` ${
//             firstName.charAt(0)?.toUpperCase() + firstName?.slice(1)
//           } ${" "} ${
//             (lastName &&
//               lastName.charAt(0)?.toUpperCase() + lastName?.slice(1)) ||
//             ""
//           }`
//         : "-"}
//     </>
//   );
// };

// export const textFormatter = (data) => {
//   return data ? data?.charAt(0)?.toUpperCase() + data.slice(1) : "";
// };

// export const months = {
//   January: "01",
//   February: "02",
//   March: "03",
//   April: "04",
//   May: "05",
//   June: "06",
//   July: "07",
//   August: "08",
//   September: "09",
//   October: "10",
//   November: "11",
//   December: "12",
// };

// export function DropdownFormatter(items) {
//   return (
//     <>
//       <AntDropdown
//         sideBarData={items}
//         placement="bottomRight"
//         icon={<MoreOutlined />}
//       />
//     </>
//   );
// }

// // export function readMoreTextShow(data, showMoreText) {
// //   if ([undefined, null, false].includes(data)) {
// //     return <></>;
// //   }
// //   if (data.props) {
// //     if (data.props.children.length < 50) {
// //       return <>{data}</>;
// //     }
// //   } else if (data.length < 50) {
// //     return <>{data}</>;
// //   }
// //   return (
// //     <p className="mb-0">
// //       {data.props
// //         ? data.props.children.type === "br"
// //           ? " - "
// //           : data.props.children.substring(0, 50)
// //         : data.substring(0, 50)}

// //       {data.props ? (data.props.children.type === "br" ? " " : "... ") : "..."}

// //       {showMoreText ? (
// //         <Link
// //           to="/"
// //           onClick={(e) => {
// //             e.preventDefault();
// //             showMoreText({ data });
// //           }}
// //         >
// //           Read More
// //           {/* {t("common.readMore")} */}
// //         </Link>
// //       ) : (
// //         ""
// //       )}
// //     </p>
// //   );
// // }

// export const getMonths = () => {
//   return dayjs.months("MM");
// };

// export const getDateOfMonth = (month, year) => {
//   return Array.from(
//     { length: dayjs(`${year}-${month}-01`).daysInMonth() },
//     (_, i) => i + 1
//   );
// };

// export const getTimeFromDiff = (startDate, endDate) => {
//   return Array.from({ length: endDate.diff(startDate, "hour", true) }, (_, i) =>
//     dayJsFormatter().hour(i).minute(0).second(0).format("hh:mm A")
//   );
// };

// export const getListOfDays = (year, month) => {
//   const list = [];
//   // let date = moment(`${year}-${month}-01`).format("YYYY-MM-DD");
//   const from = moment(`${year}-${month}-01`).format("YYYY-MM-DD");
//   const to = moment(`${year}-${month}-01`).add(1, "months");
//   for (let m = moment(from); m.isBefore(to); m.add(1, "days")) {
//     list.push(m.format("DD"));
//   }
//   return list;
// };

// export const getDisabledSlot = (list, selectSlot) => {
//   let arr = [];
//   list.forEach((item) => {
//     let previousTime = dayJsFormatter(item?.startTime)
//       .subtract(selectSlot, "hours")
//       .format("YYYY-MM-DD HH:mm:ss");
//     let slots = Array.from(
//       {
//         length: dayJsFormatter(item?.startTime).diff(
//           previousTime,
//           "hour",
//           true
//         ),
//       },
//       (_, i) =>
//         dayJsFormatFormatter(previousTime, "YYYY-MM-DD HH:mm:ss")
//           .add(i + 1, i === 1 ? "hour" : "hours")
//           .format("hh:mm A")
//     );
//     let nextSlot = Array.from(
//       {
//         length:
//           dayJsFormatter(item?.endTime).diff(item?.startTime, "hour", true) - 1,
//       },
//       (_, i) =>
//         dayJsFormatFormatter(item?.startTime, "YYYY-MM-DD HH:mm:ss")
//           .add(i + 1, i === 1 ? "hour" : "hours")
//           .format("hh:mm A")
//     );
//     arr.push([...new Set([...slots, ...nextSlot])]);
//   });
//   return arr.flat(100);
// };

// export const fileIcon = {
//   pdf: { file: "pdf-file.svg", type: "pdf" },
//   txt: { file: "txt-file.svg", type: "txt" },
//   doc: { file: "doc-file.svg", type: "doc" },
//   docx: { file: "doc-file.svg", type: "docx" },
//   pptx: { file: "ppt-file.svg", type: "pptx" },
//   ppt: { file: "ppt-file.svg", type: "ppt" },
// };

// export const cancelationPolicy = {
//   flexible:
//     "If the renter cancels less than 24 hours before trip start, the full amount is non-refundable.",
//   moderate:
//     "If the renter cancels less than 5 days in advance, 50% of the base fees for remaining days will be refunded.",
//   strict:
//     "If renter cancels less than 7 days in advance, the full amount is not refunded.",
// };

// export const status = {
//   completed: { spanClass: "badge-success", logo: "checkmark" },
//   rejected: { spanClass: "badge-cancel", logo: "close" },
//   pending: { spanClass: "badge-pending", logo: "pending" },
// };

// export const exportToPdf = (fileName, fileId) => {
//   // const pdfDownloader = () => {
//   //   let elem = document.getElementById(`${fileId}`);
//   //   elem.scrollIntoView();
//   //   h2c(elem).then((canvas) => {
//   //     const img = canvas.toDataURL("image/png", 1);

//   //     let imgWidth = 150;
//   //     let imgHeight = (canvas.height * imgWidth) / canvas.width;

//   //     const pdf = new JSpdf("p", "mm");
//   //     let position = 10;

//   //     pdf.addImage(img, "PNG", 0, position, imgWidth, imgHeight, 100);

//   //     pdf.save(`${fileName}.pdf`);
//   //   });
//   // };
//   // return pdfDownloader;
//   function generatePDF() {
//     const input = document.getElementById(`${fileId}`);

//     html2canvas(input, {
//       logging: true,

//       letterRendering: 1,

//       scale: 2,

//       windowWidth: 1440,

//       useCORS: true,
//     }).then((canvas) => {
//       let imgData = canvas.toDataURL("image/png");

//       let imgWidth = 210;

//       let pageHeight = 295;

//       let imgHeight = (canvas.height * imgWidth) / canvas.width;

//       let heightLeft = imgHeight;

//       // eslint-disable-next-line new-cap

//       let doc = new JSpdf("p", "mm");

//       let position = 0;

//       doc.addImage(imgData, "jpeg", 0, position, imgWidth, imgHeight);

//       heightLeft -= pageHeight;

//       while (heightLeft >= 0) {
//         position = heightLeft - imgHeight;

//         doc.addPage();

//         doc.addImage(imgData, "jpeg", 0, position, imgWidth, imgHeight);

//         heightLeft -= pageHeight;
//       }

//       doc.save(`${fileName}.pdf`);
//     });
//   }
//   return generatePDF;
// };

// export function handleKey(e) {
//   let ASCIICode = e.keyCode;
//   if (
//     ASCIICode === 37 ||
//     ASCIICode === 38 ||
//     ASCIICode === 39 ||
//     ASCIICode === 40 ||
//     ASCIICode === 69 ||
//     ASCIICode === 46 ||
//     ASCIICode === 107 ||
//     ASCIICode === 109 ||
//     ASCIICode === 110 ||
//     ASCIICode === 190
//   ) {
//     e.preventDefault();
//   }
// }
