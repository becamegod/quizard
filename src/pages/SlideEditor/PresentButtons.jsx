import { CaretRightOutlined } from "@ant-design/icons";
import { Dropdown, Form, Modal, Radio, Space } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import groups from "../../api/groups";
import notifier from "../../utils/notifier";

export default function PresentButtons({ onPresent }) {
  const [showModal, setShowModal] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!showModal) return;
    const getData = async () => {
      try {
        const { data } = await groups.list({ category: "owned" });
        setGroupList(data.groups);
      } catch (error) {
        console.log(error);
        notifier.notifyError();
      }
    };
    getData();
  }, [showModal]);

  const onSubmit = (values) => {
    onPresent(values.groupId);
  };

  return (
    <>
      <Modal
        centered
        title="Select a group to present"
        open={showModal}
        onCancel={() => setShowModal(false)}
        okText="Present"
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={onSubmit}>
          <Form.Item name="groupId">
            <Radio.Group buttonStyle="solid" className="expand">
              <Space direction="vertical" className="expand">
                {groupList.map((group) => (
                  <Radio.Button
                    className="expand content-height select-group-button"
                    value={group.id}
                    key={group.groupId}
                  >
                    <Title level={4}>{group.name}</Title>
                    <Paragraph type="secondary">{group.description}</Paragraph>
                  </Radio.Button>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      <Dropdown.Button
        type="primary"
        menu={{
          items: [
            {
              key: "1",
              label: "Present in a group"
            }
          ],
          onClick: () => setShowModal(true)
        }}
        onClick={onPresent}
      >
        <CaretRightOutlined />
        Public Present
      </Dropdown.Button>
    </>
  );
}

PresentButtons.propTypes = {
  onPresent: PropTypes.func.isRequired
};
