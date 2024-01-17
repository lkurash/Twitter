import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { PUBLIC_EXPLORE_PAGE_PATH } from "../utils/routs";
import useOutsideClick from "../utils/useOutsideClickFunction";
import privateMobileMenu from "../utils/privateMobileMenu";

import MenuButton from "../components/buttons/MenuButton";
import hashtag from "../components/Imgs/hashtag_icon.png";
import Logo from "../components/common/Logo";
import MobileMenuHeader from "../components/common/MobileMenuHeader";

const MobileMenuComponent = ({
  page,
  profile,
  setVisibleMobileMenu,
  visibleMobileMenu,
}) => {
  const popUpMobileMenu = useRef(null);
  const nodeRef = useRef(null);

  const onClose = () => {
    setVisibleMobileMenu(false);
  };

  useOutsideClick(popUpMobileMenu, onClose);

  return (
    <CSSTransition
      in={visibleMobileMenu}
      nodeRef={nodeRef}
      timeout={100}
      unmountOnExit
      classNames="visibleMobileMenu"
      onEnter={() => setVisibleMobileMenu(true)}
    >
      <div className="background" ref={nodeRef}>
        <div className="mobile-menu wrapper-border" ref={popUpMobileMenu}>
          {page === "publicPage" && <Logo class="logo" />}
          <nav className="nav-mobile">
            <div className="mobile-menu-buttons">
              {page === "privatePage" && (
                <>
                  <MobileMenuHeader profile={profile} />
                  {privateMobileMenu().map((button) => (
                    <MenuButton
                      key={button.id}
                      img={button.img}
                      id={button.id}
                      alt={button.alt}
                      classNameButtonImg={button.classNameButtonImg}
                      buttonNameClass={"mobile-button-name"}
                      buttonName={button.buttonName}
                      nav={button.nav}
                    />
                  ))}
                </>
              )}
              {page === "publicPage" && (
                <>
                  <MenuButton
                    type="button"
                    img={hashtag}
                    alt="Explore"
                    buttonName="Explore"
                    id="0"
                    classNameButtonImg="button-icon-menu"
                    nav={PUBLIC_EXPLORE_PAGE_PATH}
                  />
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </CSSTransition>
  );
};

export default MobileMenuComponent;
