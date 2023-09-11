import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../..";

import usersClient from "../../http/usersClient";

import getAuthUserID from "../../utils/getAuthUserID";
import getFlagIsAuth from "../../utils/getFlagIsAuth";

import ContentUserProfilePage from "../../components/ContentUserProfilePage";
import SidebarContent from "../../components/SidebarContent";

const ProfileUserPage = observer(({ loadingPage }) => {
  const { usersStore } = useContext(Context);

  const { id } = useParams();
  const authUserID = getAuthUserID();

  useEffect(() => {
    try {
      if (authUserID) {
        usersClient
          .getUserProfile(authUserID)
          .then((userInfo) => usersStore.setUser(userInfo));
      }

      if (id) {
        usersClient
          .getUserProfile(id)
          .then((userById) => usersStore.setUserPage(userById));
      }else{
        usersClient
          .getUserProfile(authUserID)
          .then((userById) => usersStore.setUserPage(userById));
      }

      usersStore.setAuth(getFlagIsAuth());
    } catch (error) {
      console.log(error.response.data.message);
    }
  });
  return (
    <>
      <div className="main-wrapper">
        <main className="main">
          <ContentUserProfilePage />
        </main>
      </div>
      <SidebarContent />
    </>
  );
});

export default ProfileUserPage;
