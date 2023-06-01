import { observer } from "mobx-react-lite";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import "../App.css";
import "./common/common.css";
import "./main.css";
import "./userpage.css";
import MenuComponent from "./MenuComponent";
import SidebarComponent from "./SidebarComponent";
import { getAllTwits, getRetwitsByUser } from "../http/twitsApi";
import { getAllUsers, getFollowingUser, getUserInfo } from "../http/userApi";
import FooterMobileComponent from "./FooterMobileComponent";
import MainComponentHomePage from "./MainComponentHomePage";
import { EXPLORE_PAGE } from "../utils/constans";

const HomePageComponent = observer(()=> {
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
        getAllUsers().then((users) => user.setAllUsers(users));
        getFollowingUser(id).then((allFollowing) => user.setuserFollowing(allFollowing));
      } catch (e) {
        console.log(5);
      }
    });
  }else{
    useEffect(()=>{
      navigate(EXPLORE_PAGE);
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

export default HomePageComponent;
