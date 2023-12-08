import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

import { PUBLIC_EXPLORE_PAGE_PATH } from "../utils/routs";
import menuButtonsAuthUser from "../utils/menuButtonsAuthUser";

import MenuButton from "../components/buttons/MenuButton";
import WriteTweetButton from "../components/buttons/WriteTweetButton";

import "./menu.css";
import Logo from "../components/common/Logo";
import hashtag from "../components/Imgs/hashtag_icon.png";
import SignOutButton from "../components/buttons/SignOutButton";

const MenuComponent = observer(({ page }) => {
  const { userStore } = useContext(Context);

  const buttonsAuthUser = menuButtonsAuthUser(userStore);

  return (
    <aside className="menu">
      <Logo class="logo" />
      <nav className="nav">
        {page === "privatePage" && (
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
            <WriteTweetButton />
            <SignOutButton />
          </div>
        )}
        {page === "publicPage" && (
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
