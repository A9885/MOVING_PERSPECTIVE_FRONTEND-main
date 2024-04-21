import { MoreOutlined } from "@ant-design/icons";
import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function ActionDropdown({ options }) {
  function getButton(data) {
    let element;
    if (data.action === "redirect") {
      element = <Link to={data.path}>{data.name}</Link>;
    } else if (data.action === "modal") {
      element = (
        <a href={data.path} rel="noreferrer" target="_blank" download>
          {data.name}
        </a>
      );
    } else if (data.action === "confirm") {
      element = (
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            data.onClickHandle();
          }}
        >
          {data.name}
        </Link>
      );
    }

    return element;
  }
  return (
    <Dropdown className="">
      <Dropdown.Toggle as="a">
        <MoreOutlined />
      </Dropdown.Toggle>
      <Dropdown.Menu drop="up">
        {options.map((item, key) => {
          return (
            <>
              <Dropdown.Item as="div" key={key}>
                {getButton(item)}
              </Dropdown.Item>
            </>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ActionDropdown;
