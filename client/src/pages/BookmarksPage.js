import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import FooterMobileComponent from "../components/FooterMobileComponent";
import MenuComponent from "../components/MenuComponent";
import SidebarComponent from "../components/SidebarComponent";
import UserBookmarksComponent from "../components/UserBookmarksComponent";
import { getAllTwits, getFavoriteTwits } from "../http/twitsApi";
import { getUserInfo } from "../http/userApi";
import { TWITTER_PAGE } from "../utils/constans";

const BookmarksPage = observer(() => {
  const { twits } = useContext(Context);
  const { user } = useContext(Context);
  const { favoriteTwits } = useContext(Context);
  const navigate = useNavigate();

  if (user.isAuth) {
    useEffect(() => {
      try {
        getAllTwits().then((alltwits) => twits.setTwits(alltwits));
        getUserInfo().then((userInfo) => user.setUser(userInfo));
        getFavoriteTwits().then((favoriteTwitsByUser) => favoriteTwits.setFavoriteTwits(favoriteTwitsByUser));
      } catch (error) {
        console.log(error.response.data.message);
      }
    });
  } else {
    useEffect(() => {
      navigate(TWITTER_PAGE);
    });
  }

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

export default BookmarksPage;
