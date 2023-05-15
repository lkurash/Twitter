import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "..";
import FooterComponent from "../components/FooterComponent";
import MenuComponent from "../components/MenuComponent";
import SidebarComponent from "../components/SidebarComponent";
import TwitterNotAuthProfileUser from "../components/TwitterNotAuthProfileUser";
import {
  getAllTwits,
  getRetwitsByUser,
  getTwitsByUser,
} from "../hhtp/twitsApi";
import {
  getFollowersUser,
  getFollowingUser,
  getUserPage,
} from "../hhtp/userApi";

const TwitterPageNotAuthUser = observer(() => {
  const { user } = useContext(Context);
  const { twits } = useContext(Context);
  const { retwits } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    try {
      getUserPage(id).then((data) => user.setUserPage(data));
      getTwitsByUser(id).then((data) => twits.setUserTwits(data));
      getAllTwits().then((data) => twits.setTwits(data));
      getRetwitsByUser(id).then((data) => retwits.setRetwits(data));
      getFollowingUser(id).then((data) => user.setuserFollowing(data));
      getFollowersUser(id).then((data) => user.setuserFollowers(data));
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
            <TwitterNotAuthProfileUser />
          </main>
        </div>
        <SidebarComponent />
      </div>
      <FooterComponent />
    </div>
  );
});

export default TwitterPageNotAuthUser;
