import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";

import twitClient from "../http/twitClient";

import UserComments from "./UserComments";

const ProfilePageAnswers = observer(() => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);

  useEffect(() => {
    twitClient
      .getCommentsByUser(usersStore.userPage.id)
      .then((commentsByUser) => twitsStore.setTwits(commentsByUser));
  });

  return (
    <div className="twits">
      <UserComments/>
    </div>
  );
});

export default ProfilePageAnswers;
