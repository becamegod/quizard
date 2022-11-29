import { React, useState, useEffect } from "react";
import { Row, Col, Pagination } from "antd";
import PropTypes from "prop-types";
import GroupCard from "../GroupCard";
import groupService from "../../services/groups";

// group list with 9 groups
// const groupList = [
//   {
//     id: 1,
//     name: "Group 1",
//     description: "This is group 1",
//     members: 10,
//     maxMembers: 5
//   },
//   {
//     id: 2,
//     name: "Group 2",
//     description: "This is group 2",
//     members: 10,
//     maxMembers: 5
//   },
//   {
//     id: 3,
//     name: "Group 3",
//     description: "This is group 3",
//     members: 10,
//     maxMembers: 5
//   },
//   {
//     id: 4,
//     name: "Group 4",
//     description: "This is group 4",
//     members: 10,
//     maxMembers: 5
//   },
//   {
//     id: 5,
//     name: "Group 5",
//     description: "This is group 5",
//     members: 10,
//     maxMembers: 5
//   },
//   {
//     id: 6,
//     name: "Group 6",
//     description: "This is group 6",
//     members: 10,
//     maxMembers: 5
//   },
//   {
//     id: 7,
//     name: "Group 7",
//     description: "This is group 7",
//     members: 10,
//     maxMembers: 5
//   },
//   {
//     id: 8,
//     name: "Group 8",
//     description: "This is group 8",
//     members: 10,
//     maxMembers: 5
//   },
//   {
//     id: 9,
//     name: "Group 9",
//     description: "This is group 9",
//     members: 10,
//     maxMembers: 5
//   }
// ];

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
      setTotalPages(Math.ceil(res.total / filter.pageSize));
      // setGroups(groupList);
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
