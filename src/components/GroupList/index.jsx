import { React, useState, useEffect } from "react";
import { Row, Col, Pagination, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import GroupCard from "../GroupCard";
import groupService from "../../services/groups";

export default function GroupList({ category }) {
  const [stage, setStage] = useState(0);
  const [groups, setGroups] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState({
    category,
    page: 1,
    pageSize: 9
  });

  const changePage = (page) => {
    setFilter({ ...filter, page });
  };

  useEffect(() => {
    async function fetchGroups() {
      try {
        const { data } = await groupService.list(filter);
        setGroups(data);
        setTotalPages(Math.ceil(data.length / filter.pageSize));
        if (data.length === 0) {
          setStage(1);
        } else {
          setStage(2);
        }
      } catch (error) {
        if (error.response && error.response.status !== 401) {
          throw error;
        }
      }
    }
    if (stage === 0) {
      fetchGroups();
    }
  }, [filter, stage]);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 48, color: "red" }} spin />
  );

  switch (stage) {
    case 1:
      return (
        <Row justify="center">
          <Col>
            <h1>No groups found</h1>
          </Col>
        </Row>
      );
    case 2:
      return (
        <div>
          <Row
            justify="start"
            align="middle"
            gutter={[32, 32]}
            style={{
              marginBottom: "48px"
            }}
          >
            {groups.map((group) => (
              <Col key={group.groupId} span={8}>
                <GroupCard group={group} />
              </Col>
            ))}
          </Row>
          <Row justify="center">
            <Pagination
              simple
              defaultCurrent={filter.page}
              total={totalPages}
              onChange={changePage}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "10px"
              }}
            />
          </Row>
        </div>
      );
    default:
      return (
        <Row justify="center">
          <Col>
            <Spin size="large" indicator={antIcon} />
          </Col>
        </Row>
      );
  }
}

GroupList.propTypes = {
  category: PropTypes.string
};

GroupList.defaultProps = {
  category: "all"
};
