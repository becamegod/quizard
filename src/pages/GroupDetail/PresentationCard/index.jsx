import {
  BarChartOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Modal,
  notification,
  Row,
  Space,
  Table,
  Typography
} from "antd";
import moment from "moment/moment";
import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "antd/lib/typography/Title";
import constants from "../../../utils/constants";
import Presentations from "../../../api/presentations";
import CreateButton from "./CreateButton";
import LoadingIcon from "../../../components/LoadingIcon";

function timeDifference(previous) {
  return moment.utc(previous).local().startOf("seconds").fromNow();
}

export default function PresentationCard() {
  const { groupId } = useParams();
  const [presentations, setPresentations] = useState([]);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [selection, setSelection] = useState(null);
  const [stage, setStage] = useState(0);
  const navigate = useNavigate();

  const removePresentation = async () => {
    try {
      await Presentations.delete(selection.id);
      setStage(0);
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
    navigate(constants.editPresentationUrl(groupId, id));
  };

  const onView = (id) => {
    navigate(constants.joinPresentationUrl(id));
  };

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
      title: "Owner",
      key: "owner",
      dataIndex: "owner",
      render: (text) => (
        <Typography.Text type="secondary">{text}</Typography.Text>
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
      render: (_, record) => (
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
      )
    }
  ];

  useEffect(() => {
    async function fetchData() {
      const { data } = await Presentations.list(groupId);
      setPresentations(data.presentations);
      setStage(1);
    }
    if (stage === 0) {
      fetchData();
    }
  }, [groupId, stage]);

  const loading = (
    <Col>
      <LoadingIcon />
    </Col>
  );

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

  const content = stage === 1 ? list : loading;
  const createButton =
    stage === 1 ? (
      <Col span={12}>
        <Row justify="end" align="middle" gutter={[20, 0]}>
          <Col>
            <CreateButton groupId={groupId} />
          </Col>
        </Row>
      </Col>
    ) : null;

  return (
    <Card className="group-member-card">
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
      <Row style={{ marginBottom: "24px" }}>
        <Col span={12}>
          <Row justify="start">
            <Title>Presentations</Title>
          </Row>
        </Col>
        {createButton}
      </Row>
      <Row justify="center" style={{ marginBottom: "32px" }}>
        {content}
      </Row>
    </Card>
  );
}
