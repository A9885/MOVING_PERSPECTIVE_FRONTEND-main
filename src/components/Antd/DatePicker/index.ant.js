import React from "react";
import { DatePicker as AntDatePicker } from "antd";
// import { useField } from "formik";
// import { dateFormatter } from "../../../utils";

function DatePicker({
  name,
  icon = "",
  setFieldValue,
  onSelectChange,
  extraClassName,
  placeholder,
  requiredDateTimeFormat,
  allowClear = false,
  hasEvent = false,
  dateFormate = "DD-MM-YYYY",
  ...rest
}) {
  // const [field, meta, helpers] = useField(name);
  // // const [field, meta] = useField(name);

  // const config = { ...field, ...rest };
  // if (meta && meta.touched && meta.error) {
  //   config.error = true;
  //   config.helperText = meta.error;
  // }

  // const handleChangeDate = (value) => {
  //   helpers.setValue(
  //     dateFormatter(value, requiredDateTimeFormat || dateFormate)
  //   );
  //   helpers.setError("");
  //   helpers.setTouched(false);
  // };

  return (
    <>
      {hasEvent ? (
        <AntDatePicker
          format={dateFormate}
          allowClear={allowClear}
          {...rest}
          placeholder={placeholder}
          suffixIcon={icon}
        />
      ) : (
        <AntDatePicker
          format={dateFormate}
          allowClear={allowClear}
          {...rest}
          placeholder={placeholder}
          // onChange={handleChangeDate}
          suffixIcon={icon}
        />
      )}
    </>
  );
}

export default DatePicker;
