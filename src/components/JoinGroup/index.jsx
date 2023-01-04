import { Row, Space } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { React, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import groups from "../../api/groups";
import notifier from "../../utils/notifier";
import Loading from "../Loading";
import CenterBase from "../UI/CenterBase";

export default function JoinGroup() {
  const { url } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const join = async () => {
      try {
        const { data } = await groups.join(url);
        console.log("CAlled");
        navigate(`/groups/${data.groupId}`);
      } catch (error) {
        console.log(error);
        notifier.notifyError();
      }
    };
    join();
    return () => {};
  }, []);

  return (
    <CenterBase>
      <div>
        <Space direction="vertical">
          <Row className="expand">
            <Loading />
          </Row>
          <Row className="expand">
            <Paragraph style={{ color: "white" }}>Joining group</Paragraph>
          </Row>
        </Space>
      </div>
    </CenterBase>
  );
}
