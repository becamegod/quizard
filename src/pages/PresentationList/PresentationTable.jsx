import React, { useEffect, useState } from "react";
import {
  BarChartOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  Col,
  Table,
  Button,
  notification,
  Space,
  Typography,
  Modal,
  Row
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
        description: `presentation ${selection.name} removed`,
        duration: 2
      });
    } catch (error) {
      notification.error({
        message: "Presentation remove failed",
        description: `please try again later`,
        duration: 2
      });
    }
    setRemoveModalVisible(false);
  };

  const onEdit = (id) => {
    console.log(id);
    navigate(constants.editPresentationUrl(id));
  };

  const onView = (id) => {
    navigate(constants.joinPresentationUrl(id));
  };
  useEffect(() => {
    async function fetchData() {
      const { data } = await Presentations.listOwnedPresentation(category);
      setPresentations(data.presentations);
    }
    fetchData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Row align="middle" gutter={[8, 0]}>
          <Col>
            {/* <Avatar size="24" src="" icon={<UserOutlined />} /> */}
            <BarChartOutlined />
          </Col>
          <Col>
            <Typography.Text strong style={{ color: "#0E86D4" }}>
              {text}
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
        return (
          <Space size="middle" direction="horizontal">
            <Button
              shape="round"
              onClick={() => onView(record.id)}
              // hidden={!permission(record)}
            >
              <EyeOutlined />
            </Button>
            <Button
              shape="round"
              onClick={() => onEdit(record.id)}
              // hidden={!permission(record)}
            >
              <EditOutlined />
            </Button>
            <Button
              danger
              shape="round"
              onClick={() => {
                setSelection(record);
                setRemoveModalVisible(true);
              }}
              // hidden={!permission(record)}
            >
              <DeleteOutlined />
            </Button>
          </Space>
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
