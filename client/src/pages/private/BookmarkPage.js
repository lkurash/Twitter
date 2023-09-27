import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../..";

import userClient from "../../http/userClient";

import getAuthUserID from "../../utils/getAuthUserID";
import getFlagIsAuth from "../../utils/getFlagIsAuth";

import SidebarContent from "../../components/SidebarContent";
import ContentBookmarksPage from "../../components/ContentBookmarksPage";
import twitClient from "../../http/twitClient";

const BookmarksPage = observer(() => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const authUserID = getAuthUserID(usersStore);

  useEffect(() => {
    try {
      if (authUserID) {
        userClient
          .getUserProfile(authUserID)
          .then((userInfo) => usersStore.setUser(userInfo));

        twitClient.getFavoriteTwits(authUserID).then((favoriteTwitsByUser) => {
          twitsStore.setTwits(favoriteTwitsByUser);
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
          <div className="main-content">
            <ContentBookmarksPage />
          </div>
        </main>
      </div>
      <SidebarContent />
    </>
  );
});

export default BookmarksPage;
