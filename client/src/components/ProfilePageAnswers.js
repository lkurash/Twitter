import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";

import twitsApi from "../http/twitsApi";

import UserComments from "./UserComments";

const ProfilePageAnswers = observer(() => {
  const { usersStore } = useContext(Context);
  const { commentsStore } = useContext(Context);

  useEffect(() => {
    twitsApi
      .getCommentsByUser(usersStore.userPage.id)
      .then((commentsByUser) => commentsStore.setComments(commentsByUser));
  });

  return (
    <div className="twits">
      <UserComments />
    </div>
  );
});

export default ProfilePageAnswers;
