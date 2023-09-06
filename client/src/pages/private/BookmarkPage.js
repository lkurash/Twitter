import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../..";

import usersClient from "../../http/usersClient";

import getAuthUserID from "../../utils/getAuthUserID";
import getFlagIsAuth from "../../utils/getFlagIsAuth";
import getInfoAuthPage from "../../utils/getInfoAuthPage";

import SidebarContent from "../../components/SidebarContent";
import ContentBookmarksPage from "../../components/ContentBookmarksPage";
import twitsClient from "../../http/twitsClient";

const BookmarksPage = observer(() => {
  const { usersStore } = useContext(Context);
  const { favoriteTwitsStore } = useContext(Context);
  const authUserID = getAuthUserID(usersStore);

  useEffect(() => {
    try {
      if (authUserID) {

        usersClient
          .getUserProfile(authUserID)
          .then((userInfo) => usersStore.setUser(userInfo));

        twitsClient.getFavoriteTwits(authUserID).then((favoriteTwitsByUser) => {
          favoriteTwitsStore.setFavoriteTwits(favoriteTwitsByUser);
        });
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
          <div className="user-main-content">
            <ContentBookmarksPage />
          </div>
        </main>
      </div>
      <SidebarContent />
    </>
  );
});

export default BookmarksPage;
