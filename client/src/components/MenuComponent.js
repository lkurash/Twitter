import { useContext } from "react";
import "./menu.css";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import Logo from "./common/Logo";
import hashtag from "./Img/hashtag_icon.png";
import ButtonMenu from "./buttons/ButtonMenu";
import { Context } from "..";
import { EXPLORE_PAGE } from "../utils/constans";
import UserInfoAndButtonSignOut from "./UserInfoAndButtonSignOut";
import ButtonWriteTwit from "./buttons/ButtonWriteTwit";
import menuButtonsAuthUser from "../utils/menuButtonsAuthUser";

const MenuComponent = observer(() => {
  const { user } = useContext(Context);

  const checkActiveButton = (id) => {
    const idActiveButton = localStorage.activeButton;

    if (idActiveButton === id) {
      return "active-menu-button";
    } else {
      return "notactive";
    }
  };

  const buttonsAuthUser = menuButtonsAuthUser(user);

  const location = useLocation().pathname;

  return (
    <aside className="menu">
      <Logo class="logo" />
      <nav className="nav">
        {!user.user.id ? (
          <div>
            <ButtonMenu
              type="button"
              img={hashtag}
              alt="Explore"
              buttonName="Explore"
              id="0"
              classNameButtonImg="button-icon-menu"
              classNameButton={
                location === "/explore" || location === "/"
                  ? "active-button-explore"
                  : "notactive-button-explore"
              }
              nav={EXPLORE_PAGE}
            />
          </div>
        ) : (
          <div>
            {buttonsAuthUser.map((button) => (
              <ButtonMenu
                key={button.id}
                img={button.img}
                id={button.id}
                alt={button.alt}
                classNameButtonImg={button.classNameButtonImg}
                classNameButton={checkActiveButton(button.id)}
                buttonName={button.buttonName}
                nav={button.nav}
              />
            ))}
            <ButtonWriteTwit />
            <UserInfoAndButtonSignOut />
          </div>
        )}
      </nav>
    </aside>
  );
});

export default MenuComponent;
