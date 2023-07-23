import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import FooterMobileComponent from "../components/FooterMobileComponent";
import MenuComponent from "../components/MenuComponent";
import BookmarksPageComponent from "../pagesComponents/BookmarkPageComponent";
import CreateNewTokenOnPage from "../utils/createNewTokenOnPage";

const BookmarksPage = observer(() => {
  const { usersStore } = useContext(Context);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();

  CreateNewTokenOnPage(usersStore, navigate, setLoadingPage);

  return (
    <div>
      <div className="page">
        <MenuComponent />
        {!loadingPage && usersStore.isAuth && <BookmarksPageComponent />}
      </div>
      <FooterMobileComponent />
    </div>
  );
});

export default BookmarksPage;
