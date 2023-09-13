import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../..";

import userClient from "../../http/userClient";

import getAuthUserID from "../../utils/getAuthUserID";
import getFlagIsAuth from "../../utils/getFlagIsAuth";

import ContentUserProfilePage from "../../components/ContentUserProfilePage";
import SidebarContent from "../../components/SidebarContent";
import { useParams } from "react-router-dom";

const HomeProfileUserPage = observer(({ loadingPage }) => {
  const { usersStore } = useContext(Context);
  const { id } = useParams();

  const authUserID = getAuthUserID();

  useEffect(() => {
    try {
      if (authUserID) {
        userClient.getUserProfile(authUserID).then((userInfo) => {
          usersStore.setUser(userInfo);
          usersStore.setUserPage(userInfo);
        });

        if (id) {
          userClient.getUserProfile(id).then((userInfo) => {
            usersStore.setUserPage(userInfo);
          });
        } else {
          userClient.getUserProfile(authUserID).then((userInfo) => {
            usersStore.setUserPage(userInfo);
          });
        }
      }

      usersStore.setAuth(getFlagIsAuth());
    } catch (error) {
      console.log(error.response.data.message);
    }
  }, []);

  return (
    <>
      <div className="main-wrapper">
        <main className="main">
          <ContentUserProfilePage pathHomeProfileUser />
        </main>
      </div>
      <SidebarContent />
    </>
  );
});

export default HomeProfileUserPage;
