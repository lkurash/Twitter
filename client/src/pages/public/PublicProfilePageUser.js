import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../..";
import usersClient from "../../http/usersClient";

import PublicProfileUser from "../../components/PublicProfileUser";

const PublicProfilePageUser = observer(() => {
  const { usersStore } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    usersClient
      .getUserProfile(id)
      .then((userById) => usersStore.setUserPage(userById));
  }, []);

  return (
    <div className="main-wrapper">
      <main className="main">
        <PublicProfileUser />
      </main>
    </div>
  );
});

export default PublicProfilePageUser;
