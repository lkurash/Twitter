import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import FooterMobileComponent from "../components/FooterMobileComponent";
import MenuComponent from "../components/MenuComponent";
import UserPageComponent from "../pagesComponents/UserPageComponent";
import CreateNewTokenOnPage from "../utils/createNewTokenOnPage";

const UserPage = observer(() => {
  const { usersStore } = useContext(Context);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();

  CreateNewTokenOnPage(usersStore, navigate, setLoadingPage);

  return (
    <div>
      <div className="page">
        <MenuComponent />
        {!loadingPage && usersStore.isAuth && <UserPageComponent />}
      </div>
      <FooterMobileComponent />
    </div>
  );
});

export default UserPage;
