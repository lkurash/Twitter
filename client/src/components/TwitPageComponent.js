import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";
import "../App.css";
import { getUserInfo } from "../http/userApi";
import ButtonClose from "./common/ButtonClose";
import FooterMobileComponent from "./FooterMobileComponent";
import MenuComponent from "./MenuComponent";
import SidebarComponent from "./SidebarComponent";
import TwitForm from "./TwitForm";

const TwitPageComponent = observer(()=> {
  const { user } = useContext(Context);

  useEffect(() => {
    try {
      getUserInfo().then((userInfo) => user.setUser(userInfo));
    } catch (error) {
      console.log(error.response.data.message);
    }
  });

  return (
    <div>
      <div className="page">
        <MenuComponent />
        <div className="main">
          <div className="main-wrapper">
            <div className="twit-page">
              <div className="twit-page-form">
                <ButtonClose />
                <TwitForm />
              </div>
            </div>
          </div>
        </div>
        <SidebarComponent />
      </div>
      <FooterMobileComponent />
    </div>
  );
});

export default TwitPageComponent;
