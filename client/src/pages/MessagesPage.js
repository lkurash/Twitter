import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import FooterMobileComponent from "../components/FooterMobileComponent";
import MenuComponent from "../components/MenuComponent";
import MessagesPageComponent from "../pagesComponents/MessagePageComponent";
import CreateNewTokenOnPage from "../utils/createNewTokenOnPage";

const MessagesPage = observer(() => {
  const { usersStore } = useContext(Context);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();

  CreateNewTokenOnPage(usersStore, navigate, setLoadingPage);
  
  return (
    <div>
      <div className="page">
        <MenuComponent />
        {!loadingPage && usersStore.isAuth && <MessagesPageComponent />}
      </div>
      <FooterMobileComponent />
    </div>
  );
});

export default MessagesPage;
