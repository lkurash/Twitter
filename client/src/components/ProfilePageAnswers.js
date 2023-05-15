import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "..";
import { getCommentsByUser } from "../hhtp/twitsApi";
import UserComments from "./UserComments";

const ProfilePageAnswers = observer(() => {
  const { comments } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    getCommentsByUser(id).then((data) => comments.setComments(data));
  });

  return (
    <div className="twits">
      <UserComments />
    </div>
  );
});

export default ProfilePageAnswers;
