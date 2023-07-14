import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import MessagesPageComponent from "../pagesComponents/MessagePageComponent";
import CheckTokenOnPage from "../utils/checkTokenOnPage";

const MessagesPage = observer(() => {
  const { usersStore } = useContext(Context);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();

  CheckTokenOnPage(usersStore, navigate, setLoadingPage);

  return <>{!loadingPage && usersStore.isAuth && <MessagesPageComponent />}</>;
});

export default MessagesPage;
