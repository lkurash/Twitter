import { observer } from "mobx-react-lite";

import ContentHomePage from "../../components/ContentHomePage";
import { useSelector } from "react-redux";
import { visibility } from "../../redux/visibilityPage/visibilityPage.selectors";
import { auth } from "../../redux/user/user.selectors";

const HomePage = observer(() => {
  const { isAuth } = useSelector(auth);
  const { visibilityPage } = useSelector(visibility);

  return <>{visibilityPage === true && isAuth && <ContentHomePage />}</>;
});

export default HomePage;
