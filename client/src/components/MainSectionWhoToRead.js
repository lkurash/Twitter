import { observer } from "mobx-react-lite";

import ListWhoReadUserHomePage from "./ListWhoReadUserHomePage";

const MainSectionWhoToRead = observer((props) => {
  return (
    <section className={props.className}>
      <h2 className="main-section-name">Who to read</h2>
      <ListWhoReadUserHomePage />
    </section>
  );
});

export default MainSectionWhoToRead;
