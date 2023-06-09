import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import MessagesPageComponent from "../components/MessagePageComponent";
import CheckTokenOnPage from "../utils/checkTokenOnPage";

const MessagesPage = observer(() => {
  const { user } = useContext(Context);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();

  CheckTokenOnPage(user, navigate, setLoadingPage);

  return <>{!loadingPage && user.isAuth && <MessagesPageComponent />}</>;
});

export default MessagesPage;
