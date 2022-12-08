import React, { useState, useEffect } from "react";
import { Button, Card, Image, List } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

export default function ListSlide({
  presentation,
  handleSelectedSlide,
  handleOnClickDeleteSlideButton
}) {
  const [slides, setSlides] = useState(presentation.slides);
  const [selectedID, setSelectedID] = useState(0);

  const handleOnClick = (index) => {
    setSelectedID(index);
    handleSelectedSlide(index);
  };
  useEffect(() => {
    setSlides(presentation.slides);
  }, [presentation]);

  const getSelectedClass = (id) => (selectedID === id ? "selected" : "");
  return (
    <List
      className="list-slide"
      dataSource={slides}
      renderItem={(item, index) => (
        <div className="slide-card">
          <List.Item
            className={`slide-container ${getSelectedClass(index)}`}
            onClick={() => handleOnClick(index)}
            key={index + 1}
          >
            <div className="number">{index + 1}</div>
            <Card className="slide" hoverable>
              <Image
                className="slide-img"
                src="/img/slide.png"
                preview={false}
              />
            </Card>
          </List.Item>
          <Button
            type="primary"
            danger
            className="button-delete-slide round"
            onClick={() => handleOnClickDeleteSlideButton(index)}
          >
            <DeleteOutlined />
          </Button>
        </div>
      )}
    />
  );
}

ListSlide.propTypes = {
  presentation: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    slides: PropTypes.arrayOf(PropTypes.shape({})).isRequired
  }).isRequired,
  handleSelectedSlide: PropTypes.func.isRequired,
  handleOnClickDeleteSlideButton: PropTypes.func.isRequired
};
