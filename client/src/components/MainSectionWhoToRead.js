import { observer } from "mobx-react-lite";
import { useSelector } from "react-redux";
import { userListWhoNotReading } from "../redux/user/user.selectors";

import ListWhoReadUserHomePage from "../components/ListWhoReadUserHomePage";

const MainSectionWhoToRead = observer((props) => {
  const { listWhoNotReading } = useSelector(userListWhoNotReading);

  return (
    <section className={props.className}>
      <h2 className="main-section-name">Who to read</h2>
      <ListWhoReadUserHomePage users={listWhoNotReading} />
    </section>
  );
});

export default MainSectionWhoToRead;
