import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";
import { getAllTwits, getFavoriteTwits } from "../http/twitsApi";
import { getUserInfo } from "../http/userApi";
import FooterMobileComponent from "./FooterMobileComponent";
import MenuComponent from "./MenuComponent";
import SidebarComponent from "./SidebarComponent";
import UserBookmarksComponent from "./UserBookmarksComponent";

const BookmarksPageComponent = observer(() => {
  const { twits } = useContext(Context);
  const { user } = useContext(Context);
  const { favoriteTwits } = useContext(Context);

  useEffect(() => {
    try {
      getAllTwits().then((alltwits) => twits.setTwits(alltwits));
      getUserInfo().then((userInfo) => user.setUser(userInfo));
      getFavoriteTwits().then((favoriteTwitsByUser) => favoriteTwits.setFavoriteTwits(favoriteTwitsByUser));
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
              <UserBookmarksComponent />
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
