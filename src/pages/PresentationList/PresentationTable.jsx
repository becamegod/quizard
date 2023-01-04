import React, { useEffect, useState } from "react";
import {
  BarChartOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  TeamOutlined
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import {
  Col,
  Table,
  Button,
  notification,
  Space,
  Typography,
  Modal,
  Row,
  Dropdown
} from "antd";
import PropTypes from "prop-types";
import moment from "moment/moment";
import constants from "../../utils/constants";
import Presentations from "../../api/presentations";

function timeDifference(previous) {
  return moment.utc(previous).local().startOf("seconds").fromNow();
}

export default function PresentationTable({ category }) {
  const [presentations, setPresentations] = useState([]);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [selection, setSelection] = useState(null);
  const navigate = useNavigate();

  const removePresentation = async () => {
    try {
      await Presentations.delete(selection.id);
      notification.success({
        message: "Presentation removed successfully",
        description: `Presentation: ${selection.name} removed`,
        duration: 2
      });
      const newPresentations = [...presentations];
      const indexOfRemovedElement = newPresentations.findIndex(
        (presentation) => presentation.id === selection.id
      );
      newPresentations.splice(indexOfRemovedElement, 1);
      setPresentations(newPresentations);
    } catch (error) {
      notification.error({
        message: "Presentation remove failed",
        description: `please try again later`,
        duration: 2
      });
    }
    setRemoveModalVisible(false);
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await Presentations.getPresentations({ category });
      setPresentations(data.presentations);
    }
    fetchData();
  }, []);

  const handleMenuClick = (e) => {
    const [action, id] = e.key.split(" ");
    switch (action) {
      case "Edit": {
        navigate(constants.editPresentationUrl(id));
        break;
      }
      case "Collaborator": {
        navigate(constants.collaboratorsPresentationUrl(id));
        break;
      }
      case "Delete": {
        const record = presentations.find(
          (presentation) => presentation.id === id
        );
        setSelection(record);
        setRemoveModalVisible(true);
        break;
      }
      default: {
        navigate(constants.joinPresentationUrl(id));
        break;
      }
    }
  };

  const columns = [
    {
      title: "Name",
      key: "name",
      render: (record) => (
        <Row align="middle" gutter={[8, 0]}>
          <Col>
            {/* <Avatar size="24" src="" icon={<UserOutlined />} /> */}
            <BarChartOutlined />
          </Col>
          <Col>
            <Link
              to={constants.editPresentationUrl(record.id)}
              style={{ fontWeight: "600", color: "#0E86D4" }}
            >
              {record.name}
            </Link>
          </Col>
        </Row>
      )
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      render: (owner) => (
        <Row align="middle" gutter={[8, 0]}>
          <Col>
            <Typography.Text strong style={{ color: "black" }}>
              {owner.name}
            </Typography.Text>
          </Col>
        </Row>
      )
    },
    {
      title: "Modified",
      key: "modified",
      dataIndex: "modified",
      render: (text) => (
        <Typography.Text type="secondary">
          {timeDifference(text)}
        </Typography.Text>
      )
    },
    {
      title: "Created",
      key: "created",
      dataIndex: "created",
      render: (text) => (
        <Typography.Text type="secondary">
          {timeDifference(text)}
        </Typography.Text>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const items = [
          {
            label: (
              <Typography.Text style={{ width: "100%" }}>
                <EditOutlined /> Edit
              </Typography.Text>
            ),
            key: `Edit ${record.id}`
          }
        ];
        if (category === "owned") {
          items.push(
            {
              label: (
                <Typography.Text>
                  <TeamOutlined /> Collaborators
                </Typography.Text>
              ),
              key: `Collaborator ${record.id}`
            },
            {
              type: "divider"
            },
            {
              label: (
                <Typography.Text style={{ color: "red" }}>
                  <DeleteOutlined /> Delete
                </Typography.Text>
              ),
              key: `Delete ${record.id}`
            }
          );
        }
        return (
          <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            trigger={["click"]}
          >
            <Button shape="round" onClick={(e) => e.preventDefault()}>
              <Space>
                <EllipsisOutlined />
              </Space>
            </Button>
          </Dropdown>
        );
      }
    }
  ];

  const list = (
    <Col span={24}>
      <Table
        dataSource={presentations}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey="id"
      />
    </Col>
  );
  return (
    <>
      <Modal
        title="Remove presentation"
        open={removeModalVisible}
        onOk={() => removePresentation()}
        onCancel={() => {
          setRemoveModalVisible(false);
        }}
      >
        <p>Are you sure to remove this presentation?</p>
      </Modal>
      <Row justify="center" style={{ marginBottom: "32px" }}>
        {list}
      </Row>
    </>
  );
}

PresentationTable.propTypes = {
  category: PropTypes.string
};

PresentationTable.defaultProps = {
  category: "owned"
};
