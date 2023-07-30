import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

import ButtonMenu from "./buttons/ButtonMenu";
import UserInfoAndButtonSignOut from "./UserInfoAndButtonSignOut";
import ButtonWriteTwit from "./buttons/ButtonWriteTwit";
import menuButtonsAuthUser from "../utils/menuButtonsAuthUser";

import "./menu.css";
import Logo from "./common/Logo";
import hashtag from "../components/Img/hashtag_icon.png";
import getFlagIsAuth from "../utils/getFlagIsAuth";
import { EXPLORE_PAGE } from "../utils/constans";

const MenuComponent = observer(() => {
  const { usersStore } = useContext(Context);

  const buttonsAuthUser = menuButtonsAuthUser(usersStore);

  return (
    <aside className="menu">
      <Logo class="logo" />
      <nav className="nav">
        {getFlagIsAuth() && usersStore.isAuth ? (
          <div>
            {buttonsAuthUser.map((button) => (
              <ButtonMenu
                key={button.id}
                img={button.img}
                id={button.id}
                alt={button.alt}
                classNameButtonImg={button.classNameButtonImg}
                buttonName={button.buttonName}
                nav={button.nav}
              />
            ))}
            <ButtonWriteTwit />
            <UserInfoAndButtonSignOut />
          </div>
        ) : (
          <div>
            <ButtonMenu
              type="button"
              img={hashtag}
              alt="Explore"
              buttonName="Explore"
              id="0"
              classNameButtonImg="button-icon-menu"
              nav={EXPLORE_PAGE}
            />
          </div>
        )}
      </nav>
    </aside>
  );
});

export default MenuComponent;
