import React, { useState } from "react";
import { Card, Image, List } from "antd";

const mockData = [
  {
    option1: "a",
    option2: "b"
  },
  {
    option1: "a",
    option2: "b"
  },
  {
    option1: "a",
    option2: "b"
  },
  {
    option1: "a",
    option2: "b"
  },
  {
    option1: "a",
    option2: "b"
  },
  {
    option1: "a",
    option2: "b"
  }
];

export default function ListSlide() {
  const [elements] = useState(mockData);
  const [selectedID, setSelectedID] = useState(0);

  const handleOnClick = (id) => {
    console.log("click");
    setSelectedID(id);
  };

  const getSelectedClass = (id) => (selectedID === id ? "selected" : "");
  return (
    <List
      className="list-slide"
      dataSource={elements}
      renderItem={(item, index) => (
        <List.Item
          className={`slide-container ${getSelectedClass(index)}`}
          onClick={() => handleOnClick(index)}
          key={index + 1}
        >
          <div className="number">{index + 1}</div>
          <Card className="slide" hoverable>
            <Image className="slide-img" src="/img/slide.png" preview={false} />
          </Card>
        </List.Item>
      )}
    />
  );
}
