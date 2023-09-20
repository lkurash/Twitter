import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../..";

import userClient from "../../http/userClient";

import getAuthUserID from "../../utils/getAuthUserID";
import getFlagIsAuth from "../../utils/getFlagIsAuth";
import twitClient from "../../http/twitClient";

import ContentBookmarksPage from "../../components/ContentBookmarksPage";

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
      <ContentBookmarksPage />
    </>
  );
});

export default BookmarksPage;
