import { React, useState, useEffect } from "react";
import { Row, Col, Pagination } from "antd";
import PropTypes from "prop-types";
import GroupCard from "../GroupCard";
import groupService from "../../services/groups";

export default function GroupList({ category }) {
  const [groups, setGroups] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState({
    category,
    page: 1,
    pageSize: 9
  });

  const changePage = (page) => {
    console.log(page);
    setFilter({ ...filter, page });
  };

  useEffect(() => {
    groupService.list(filter).then((res) => {
      console.log(res);
      setGroups(res.data);
      setTotalPages(groups.length / filter.pageSize);
    });
  }, [filter]);

  if (groups.length === 0) {
    return (
      <Row justify="center">
        <Col>
          <h1>No groups found</h1>
        </Col>
      </Row>
    );
  }

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
}

GroupList.propTypes = {
  category: PropTypes.string
};

GroupList.defaultProps = {
  category: "all"
};
