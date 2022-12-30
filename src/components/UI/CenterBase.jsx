import PropTypes from "prop-types";
import React from "react";

export default function CenterBase({ children }) {
  return <div className="center-base">{children}</div>;
}

CenterBase.propTypes = {
  children: PropTypes.element.isRequired
};
