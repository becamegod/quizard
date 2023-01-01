import React, { useState, useEffect } from "react";
import { Card, Dropdown, List, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

export default function ListSlide({
  presentation,
  selectedId,
  handleSelectedSlide,
  handleOnClickDeleteSlideButton
}) {
  const [slides, setSlides] = useState(presentation.slides);
  const [newSelectedID, setnewSelectedID] = useState(selectedId);

  const handleOnClick = (index) => {
    setnewSelectedID(index);
    handleSelectedSlide(index);
  };

  useEffect(() => {
    setSlides(presentation.slides);
    setnewSelectedID(selectedId);
  }, [presentation, selectedId, slides]);

  const getSelectedClass = (id) => (newSelectedID === id ? "selected" : "");

  let img;

  if (slides[newSelectedID]) {
    return (
      <List
        className="list-slide"
        dataSource={slides}
        renderItem={(item, index) => {
          switch (item.type) {
            case "Heading":
              img = (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  preserveAspectRatio="xMidYMid meet"
                  width="36"
                  height="36"
                  viewBox="0 0 48 48"
                >
                  <rect
                    fill="rgb(59, 64, 74)"
                    y="18.05"
                    width="48"
                    height="10.15"
                    rx="1.26"
                  />
                  <rect
                    fill="rgb(194, 196, 199)"
                    x="5.54"
                    y="30.05"
                    width="36.92"
                    height="4.62"
                    rx="1.3"
                  />
                </svg>
              );
              break;
            case "Paragraph":
              img = (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  preserveAspectRatio="xMidYMid meet"
                  width="36"
                  height="36"
                  viewBox="0 0 48 48"
                >
                  <rect
                    fill="rgb(194, 196, 199)"
                    x="3.93"
                    y="11.04"
                    width="40.92"
                    height="8.66"
                    rx="1.26"
                  />
                  <rect
                    fill="rgb(59, 64, 74)"
                    y="22.31"
                    width="48"
                    height="13.38"
                    rx="1.26"
                  />
                </svg>
              );
              break;
            default:
              img = (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  preserveAspectRatio="xMidYMid meet"
                  width="36"
                  height="36"
                  viewBox="0 0 48 48"
                >
                  <rect
                    x="32.73"
                    y="17.04"
                    width="11.4"
                    height="25.25"
                    fill="rgb(233, 234, 235)"
                  />
                  <rect
                    x="3.87"
                    y="26.22"
                    width="11.4"
                    height="16.06"
                    fill="rgb(59, 64, 74)"
                  />
                  <rect
                    x="18.3"
                    y="4.31"
                    width="11.4"
                    height="37.97"
                    fill="rgb(194, 196, 199)"
                  />
                  <rect y="42.28" width="48" height=".99" fill="#000000" />
                </svg>
              );
              break;
          }
          let disabled = false;
          if (slides.length === 1) {
            disabled = true;
          }
          const items = [
            {
              label: (
                <Typography.Text style={{ color: "red" }} disabled={false}>
                  Delete <DeleteOutlined />
                </Typography.Text>
              ),
              key: `Delete ${index.toString()}`
            }
          ];
          return (
            <Dropdown
              menu={{
                items,
                onClick: handleOnClickDeleteSlideButton,
                disabled
              }}
              trigger={["contextMenu"]}
            >
              <List.Item
                className={`slide-container ${getSelectedClass(index)}`}
                onClick={() => handleOnClick(index)}
                key={index}
              >
                <div className="number">{index + 1}</div>
                <Card className="slide" hoverable style={{ justify: "center" }}>
                  {img}
                </Card>
              </List.Item>
            </Dropdown>
          );
        }}
      />
    );
  }
}

ListSlide.propTypes = {
  presentation: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    slides: PropTypes.arrayOf(PropTypes.shape({})).isRequired
  }).isRequired,
  selectedId: PropTypes.number.isRequired,
  handleSelectedSlide: PropTypes.func.isRequired,
  handleOnClickDeleteSlideButton: PropTypes.func.isRequired
};
