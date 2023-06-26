import { observer } from "mobx-react-lite";
import "../App.css";
import ButtonClose from "./common/ButtonClose";
import FooterMobileComponent from "./FooterMobileComponent";
import MenuComponent from "./MenuComponent";
import SidebarComponent from "./SidebarComponent";
import TwitForm from "./TwitForm";

const TwitPageComponent = observer(() => {
  return (
    <div>
      <div className="page">
        <MenuComponent />
        <div className="main">
          <div className="main-wrapper">
            <div className="twit-page">
              <div className="twit-page-form">
                <ButtonClose nav={-1} />
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
