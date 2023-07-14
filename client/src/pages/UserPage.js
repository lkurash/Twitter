import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import UserPageComponent from "../pagesComponents/UserPageComponent";
import CheckTokenOnPage from "../utils/checkTokenOnPage";

const UserPage = observer(() => {
  const { usersStore } = useContext(Context);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();

  CheckTokenOnPage(usersStore, navigate, setLoadingPage);

  return <>{!loadingPage && usersStore.isAuth && <UserPageComponent />}</>;
});

export default UserPage;
