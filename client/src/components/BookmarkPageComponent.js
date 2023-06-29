import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";
import { getAllTwits, getFavoriteTwits } from "../http/twitsApi";
import { getAllUsers, getFollowingUser } from "../http/userApi";
import FooterMobileComponent from "./FooterMobileComponent";
import MenuComponent from "./MenuComponent";
import SidebarComponent from "./SidebarComponent";
import UserBookmarks from "./UserBookmarks";
import jwt_decode from "jwt-decode";

const BookmarksPageComponent = observer(() => {
  const { twits } = useContext(Context);
  const { user } = useContext(Context);
  const { favoriteTwits } = useContext(Context);
  const { id } = jwt_decode(localStorage.token);

  useEffect(() => {
    try {
      getAllTwits().then((alltwits) => twits.setTwits(alltwits));
      getFavoriteTwits().then((favoriteTwitsByUser) =>
        favoriteTwits.setFavoriteTwits(favoriteTwitsByUser)
      );
      getAllUsers().then((users) => user.setAllUsers(users));
      getFollowingUser(id).then((allFollowing) =>
        user.setuserFollowing(allFollowing)
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
              <UserBookmarks />
            </div>
          </main>
        </div>
        <SidebarComponent />
      </div>
      <FooterMobileComponent />
    </div>
  );
});

export default BookmarksPageComponent;
