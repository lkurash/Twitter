import { useSelector } from "react-redux";
import { userListWhoNotReading } from "../redux/user/user.selectors";

import ListWhoReadUserHomePage from "../components/ListWhoReadUserHomePage";

const MainSectionWhoToRead = (props) => {
  const { listWhoNotReading } = useSelector(userListWhoNotReading);

  return (
    <section className={props.className}>
      {listWhoNotReading && (
        <>
          <h2 className="main-section-name">Who to read</h2>
          <ListWhoReadUserHomePage users={listWhoNotReading} />
        </>
      )}
    </section>
  );
};

export default MainSectionWhoToRead;
