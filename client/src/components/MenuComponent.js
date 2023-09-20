import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

import getFlagIsAuth from "../utils/getFlagIsAuth";
import { PUBLIC_EXPLORE_PAGE_PATH } from "../utils/constans";
import menuButtonsAuthUser from "../utils/menuButtonsAuthUser";

import MenuButton from "./buttons/MenuButton";
import UserInfoAndButtonSignOut from "./UserInfoAndButtonSignOut";
import WriteTwitButton from "./buttons/WriteTwitButton";

import "./menu.css";
import Logo from "./common/Logo";
import hashtag from "../components/Imgs/hashtag_icon.png";

const MenuComponent = observer(() => {
  const { usersStore } = useContext(Context);

  const buttonsAuthUser = menuButtonsAuthUser(usersStore);

  return (
    <aside className="menu">
      <Logo class="logo" />
      <nav className="nav">
        {usersStore.isAuth || getFlagIsAuth() ? (
          <div>
            {buttonsAuthUser.map((button) => (
              <MenuButton
                key={button.id}
                img={button.img}
                id={button.id}
                alt={button.alt}
                classNameButtonImg={button.classNameButtonImg}
                buttonName={button.buttonName}
                nav={button.nav}
              />
            ))}
            <WriteTwitButton />
            <UserInfoAndButtonSignOut />
          </div>
        ) : (
          <div>
            <MenuButton
              type="button"
              img={hashtag}
              alt="Explore"
              buttonName="Explore"
              id="0"
              classNameButtonImg="button-icon-menu"
              nav={PUBLIC_EXPLORE_PAGE_PATH}
            />
          </div>
        )}
      </nav>
    </aside>
  );
});

export default MenuComponent;
