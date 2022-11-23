import { Image } from "antd";
import PropTypes from "prop-types";
import React from "react";

export default function SocialIcon({ src }) {
  return (
    <div className="social-item">
      <Image preview={false} className="social-icon" src={src} />
    </div>
  );
}

SocialIcon.propTypes = {
  src: PropTypes.string.isRequired
};
