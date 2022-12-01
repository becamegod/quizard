import { React, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import groups from "../../services/groups";

export default function JoinGroup() {
  const { url } = useParams();
  let groupId = "";

  useEffect(() => {
    const res = groups.join(url);
    groupId = res.data.groupId;
  }, []);

  return <Navigate to={`/groups/${groupId}`} />;
}
