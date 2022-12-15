import { React, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import groups from "../../api/groups";

export default function JoinGroup() {
  const [groupId, setGroupId] = useState("");
  const { url } = useParams();
  useEffect(() => {
    const api = async () => {
      const res = await groups.join(url);
      setGroupId(res.data.groupId);
    };
    api();
    return () => {};
  }, []);
  if (groupId === "") return <div>Joining group...</div>;
  return <Navigate to={`/groups/${groupId}`} />;
}
