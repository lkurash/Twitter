import { useSelector } from "react-redux";

import { auth } from "../../redux/user/user.selectors";
import { visibilityPrivatePage } from "../../redux/visibilityPage/visibilityPage.selectors";

import PrivateHomePageContent from "../../components/PrivateHomePageContent";

const HomePage = () => {
  const { isAuth } = useSelector(auth);
  const { visibilityPage } = useSelector(visibilityPrivatePage);

  return <>{visibilityPage === true && isAuth && <PrivateHomePageContent />}</>;
};

export default HomePage;
