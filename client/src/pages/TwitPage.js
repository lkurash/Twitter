import { useContext, useEffect } from "react";
import { Context } from "..";
import "../App.css";
import ButtonClose from "../components/common/ButtonClose";
import FooterMobileComponent from "../components/FooterMobileComponent";
import MenuComponent from "../components/MenuComponent";
import SidebarComponent from "../components/SidebarComponent";
import TwitForm from "../components/TwitForm";
import { getUserInfo } from "../http/userApi";

function TwitPage() {
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
}

export default TwitPage;
