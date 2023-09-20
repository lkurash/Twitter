import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../..";

import userClient from "../../http/userClient";

import PublicProfileUser from "../../components/PublicProfileUser";

const PublicProfilePageUser = observer(() => {
  const { usersStore } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    userClient
      .getUserProfile(id)
      .then((userById) => usersStore.setUserPage(userById));
  });

  return (
    <>
      <PublicProfileUser />
    </>
  );
});

export default PublicProfilePageUser;
