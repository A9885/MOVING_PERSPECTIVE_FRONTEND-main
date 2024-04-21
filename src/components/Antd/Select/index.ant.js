import React, { useState } from "react";
import { Form, Select as AntSelect } from "antd";
import { useField } from "formik";

const { Option } = AntSelect;

export default function Select({
  name,
  icon,
  setFieldValue,
  // handleChangeSelect,3
  onSelect,
  arrayOfData = [],
  onSelectChange,
  extraClassName,
  placeholder,
  defaultValue,
  callback,
  otherOption,
  setCategory,
  ...rest
}) {

  const [other, setOther] = useState("category");
  const [newCategory, setNewCategory] = useState("");

  const [field, meta, helpers] = useField(name);

  const config = { ...field, ...rest };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  const handleChangeSelect = (value) => {
    helpers.setValue(value);
    helpers.setError("");
    helpers.setTouched(false);
    setOther(value);
    if (callback) {
      callback(value);
    }
  };

  // const onSearch = (value) => {
  //   console.log("search:", value);
  // };

  return (
    <>
      <Form.Item
        className="mb-0"
        label={rest?.label}
        help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
        validateStatus={config.error ? "error" : "success"}
      >
        {icon}
        {other == "other" ? (
          <input 
            id="cateName"
            name="cateName"
            placeholder="Enter Category Name"
            className="form-control"
            onChange={(e) => setCategory(e.target.value)}
          />
        ) : (
          <>
          <AntSelect
            size="large"
            {...field}
            {...rest}
            onChange={handleChangeSelect}
            // onSearch={onSearch}
            onSelect={onSelect}
            placeholder={placeholder}
            defaultValue={defaultValue}
          >
            {arrayOfData.map((item, id) => (
              <Option
                key={item?.id || item.category}
                // disabled={item?.disabled || false}
                value={item.category}
              >
                {/* {item?.name || `${item?.firstName}${" "}${item?.lastName}`} */}
                {item.category}
              </Option>
            ))}
            {(otherOption == "otherOption" && 
              <Option
                  key="new"
                  // disabled={item?.disabled || false}
                  value="new"
                >
                  {/* {item?.name || `${item?.firstName}${" "}${item?.lastName}`} */}
                  New
              </Option>
            )}
          </AntSelect>
          </>
        )}
      </Form.Item>
    </>
  );
}
