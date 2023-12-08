import { observer } from "mobx-react-lite";

import { useSelector } from "react-redux";
import { visibility } from "../../redux/visibilityPage/visibilityPage.selectors";
import { auth } from "../../redux/user/user.selectors";

import PrivateHomePageContent from "../../components/PrivateHomePageContent";

const HomePage = observer(() => {
  const { isAuth } = useSelector(auth);
  const { visibilityPage } = useSelector(visibility);

  return <>{visibilityPage === true && isAuth && <PrivateHomePageContent />}</>;
});

export default HomePage;
