import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import MenuComponent from "../components/MenuComponent";
import FollowPageComponent from "../pagesComponents/FollowPageComponent";
import CreateNewTokenOnPage from "../utils/createNewTokenOnPage";

const FollowPage = observer(() => {
  const { usersStore } = useContext(Context);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();

  CreateNewTokenOnPage(usersStore, navigate, setLoadingPage);

  return (
    <div className="page">
      <MenuComponent />
      {!loadingPage && usersStore.isAuth && <FollowPageComponent />}}
    </div>
  );
});

export default FollowPage;
