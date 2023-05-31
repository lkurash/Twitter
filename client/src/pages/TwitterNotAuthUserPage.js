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
} from "../http/twitsApi";
import {
  getFollowersUser,
  getFollowingUser,
  getUserById,
} from "../http/userApi";

const TwitterPageNotAuthUser = observer(() => {
  const { user } = useContext(Context);
  const { twits } = useContext(Context);
  const { retwits } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    try {
      getUserById(id).then((userById) => user.setUserPage(userById));
      getTwitsByUser(id).then((twitsById) => twits.setUserTwits(twitsById));
      getAllTwits().then((allTwits) => twits.setTwits(allTwits));
      getRetwitsByUser(id).then((retwitsByUser) => retwits.setRetwits(retwitsByUser));
      getFollowingUser(id).then((allFollowing) => user.setuserFollowing(allFollowing));
      getFollowersUser(id).then((allFollowers) => user.setuserFollowers(allFollowers));
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
