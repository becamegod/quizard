import React, { useState } from "react";
import { Button, Card, Image, List } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

export default function ListSlide({ presentation, handleSelectedSlide }) {
  const [slides] = useState(presentation.slides);
  const [selectedID, setSelectedID] = useState(0);

  const handleOnClick = (item, index) => {
    setSelectedID(index);
    handleSelectedSlide(item);
  };

  const getSelectedClass = (id) => (selectedID === id ? "selected" : "");
  return (
    <List
      className="list-slide"
      dataSource={slides}
      renderItem={(item, index) => (
        <List.Item
          className={`slide-container ${getSelectedClass(index)}`}
          onClick={() => handleOnClick(item, index)}
          key={index + 1}
        >
          <div className="number">{index + 1}</div>
          <Card className="slide" hoverable>
            <Image className="slide-img" src="/img/slide.png" preview={false} />
          </Card>
          <Button type="primary" danger className="button-delete-slide round">
            <DeleteOutlined />
          </Button>
        </List.Item>
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
  handleSelectedSlide: PropTypes.func.isRequired
};
