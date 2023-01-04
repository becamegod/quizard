import { Image } from "antd";
import PropTypes from "prop-types";
import React from "react";

export default function SocialIcon({ src }) {
  const handleOnClick = async () => {
    window.location.href = "http://localhost:4000/auth/google";
  };
  return (
    <div className="social-item">
      <Image preview={false} src={src} onClick={handleOnClick} />
    </div>
  );
}

SocialIcon.propTypes = {
  src: PropTypes.string.isRequired
};
