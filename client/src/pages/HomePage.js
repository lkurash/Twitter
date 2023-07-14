import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import HomePageComponent from "../pagesComponents/HomePageComponent";
import CheckTokenOnPage from "../utils/checkTokenOnPage";

const HomePage = observer(() => {
  const { usersStore } = useContext(Context);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();

  CheckTokenOnPage(usersStore, navigate, setLoadingPage);

  return <>{!loadingPage && usersStore.isAuth && <HomePageComponent />}</>;
});

export default HomePage;
