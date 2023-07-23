import { observer } from "mobx-react-lite";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import FooterMobileComponent from "../components/FooterMobileComponent";
import MenuComponent from "../components/MenuComponent";
import HomePageComponent from "../pagesComponents/HomePageComponent";
import CreateNewTokenOnPage from "../utils/createNewTokenOnPage";

const HomePage = observer(() => {
  const { usersStore } = useContext(Context);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();
  const ref = useRef();

  CreateNewTokenOnPage(usersStore, navigate, setLoadingPage);

  useLayoutEffect(() => {
    ref.current.scrollIntoView();
  });

  return (
    <div>
      <div className="page" ref={ref}>
        <MenuComponent />
        {!loadingPage && usersStore.isAuth && <HomePageComponent />}
      </div>
      <FooterMobileComponent />
    </div>
  );
});

export default HomePage;
