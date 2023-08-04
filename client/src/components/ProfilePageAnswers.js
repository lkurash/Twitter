import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "..";

import twitsApi from "../http/twitsApi";
import UserComments from "./UserComments";

const ProfilePageAnswers = observer(() => {
  const { commentsStore } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    twitsApi
      .getCommentsByUser(id)
      .then((commentsByUser) => commentsStore.setComments(commentsByUser));
  });

  return (
    <div className="twits">
      <UserComments />
    </div>
  );
});

export default ProfilePageAnswers;
