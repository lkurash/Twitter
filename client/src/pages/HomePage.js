import { observer } from "mobx-react-lite";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Context } from "..";
import "../App.css";
import "../components/common/common.css";
import "../components/main.css";
import "../components/userpage.css";
import MenuComponent from "../components/MenuComponent";
import SidebarComponent from "../components/SidebarComponent";
import { getAllTwits, getRetwitsByUser } from "../http/twitsApi";
import { getAllUsers, getFollowingUser, getUserInfo } from "../http/userApi";
import FooterMobileComponent from "../components/FooterMobileComponent";
import { TWITTER_PAGE } from "../utils/constans";
import MainComponentHomePage from "../components/MainComponentHomePage";

const HomePage = observer(() => {
  const { twits } = useContext(Context);
  const { user } = useContext(Context);
  const { retwits } = useContext(Context);
  const ref = useRef();
  const { id } = jwt_decode(localStorage.token);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    ref.current.scrollIntoView();
  });

  if (user.isAuth) {
    useEffect(() => {
      try {
        getUserInfo().then((userInfo) => user.setUser(userInfo));
        getAllTwits().then((alltwits) => twits.setTwits(alltwits));
        getRetwitsByUser(id).then((retwitsByUser) => retwits.setRetwits(retwitsByUser));
        getFollowingUser(id).then((allFollowing) => user.setuserFollowing(allFollowing));
        getAllUsers().then((users) => user.setAllUsers(users));
      } catch (e) {
        console.log(e.response.data.message);
      }
    });
  } else {
    useEffect(() => {
      navigate(TWITTER_PAGE);
    });
  }

  return (
    <div>
      <div className="page" ref={ref}>
        <MenuComponent />
        <MainComponentHomePage />
        <SidebarComponent />
      </div>
      <FooterMobileComponent />
    </div>
  );
});

export default HomePage;
