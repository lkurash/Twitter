import { observer } from "mobx-react-lite";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "..";
import "../App.css";
import "../components/common/common.css";
import "../components/main.css";
import "../components/userpage.css";
import MenuComponent from "../components/MenuComponent";
import SidebarComponent from "../components/SidebarComponent";
import { getAllTwits, getRetwitsByUser } from "../hhtp/twitsApi";
import { getAllUsers, getFollowingUser, getUserInfo } from "../hhtp/userApi";
import FooterMobileComponent from "../components/FooterMobileComponent";
import { TWITTER_PAGE } from "../utils/constans";
import MainComponentHomePage from "../components/MainComponentHomePage";

const HomePage = observer(() => {
  const { twits } = useContext(Context);
  const { user } = useContext(Context);
  const { retwits } = useContext(Context);
  const ref = useRef();
  const { id } = useParams();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    ref.current.scrollIntoView();
  });

  if (user.isAuth) {
    useEffect(() => {
      try {
        getUserInfo().then((data) => user.setUser(data));
        getAllTwits().then((data) => twits.setTwits(data));
        getRetwitsByUser(id).then((data) => retwits.setRetwits(data));
        getFollowingUser(id).then((data) => user.setuserFollowing(data));
        getAllUsers().then((data) => user.setAllUsers(data));
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
