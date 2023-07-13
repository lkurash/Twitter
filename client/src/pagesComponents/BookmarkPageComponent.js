import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";

import { getAllTwits, getFavoriteTwits } from "../http/twitsApi";
import { getAllUsers, getFollowingUsers } from "../http/userApi";
import FooterMobileComponent from "../components/FooterMobileComponent";
import MenuComponent from "../components/MenuComponent";
import SidebarContent from "../components/SidebarContent";
import ContentBookmarksPage from "../components/ContentBookmarksPage";
import getAuthUserID from "../utils/getAuthUserID";

const BookmarksPageComponent = observer(() => {
  const { twits } = useContext(Context);
  const { user } = useContext(Context);
  const { favoriteTwits } = useContext(Context);
  const { usersFollow } = useContext(Context);
  const authUserID = getAuthUserID(user);

  useEffect(() => {
    try {
      getAllTwits().then((alltwits) => twits.setTwits(alltwits));
      getFavoriteTwits(authUserID).then((favoriteTwitsByUser) =>
        favoriteTwits.setFavoriteTwits(favoriteTwitsByUser)
      );
      getAllUsers().then((users) => user.setAllUsers(users));
      getFollowingUsers(authUserID).then((followings) =>
        usersFollow.setuserFollowing(followings)
      );
    } catch (error) {
      console.log(error.response.data.message);
    }
  });

  return (
    <div>
      <div className="page">
        <MenuComponent />
        <div className="main-wrapper">
          <main className="main">
            <div className="user-main-content">
              <ContentBookmarksPage />
            </div>
          </main>
        </div>
        <SidebarContent />
      </div>
      <FooterMobileComponent />
    </div>
  );
});

export default BookmarksPageComponent;
