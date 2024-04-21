import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

function BreadcrumbComponent({
  breadcrumb = [],
  ...rest
}) {
  return (
    <>
      <Breadcrumb {...rest}>
        {breadcrumb.map((item, key) => {
          return item.path !== "#!" ? (
            <Breadcrumb.Item as="li" key={key}><Link to={item.path}>{key === 0 ? <em className="icon icon-dashboard"/> : ''}{item.name}</Link></Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item active key={key}>{item.name}</Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </>
  );
}

export default BreadcrumbComponent;
