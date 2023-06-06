import { useContext } from "react";
import { observer } from "mobx-react-lite";
import MainSectionTrends from "./MainSectionTrends";
import { Context } from "..";
import MainSectionWhoToRead from "./MainSectionWhoToRead";

const MainContentTwitterPage = observer(() => {
  const { user } = useContext(Context);

  return (
    <div>
      {!user.isAuth && (
        <div className="main-content">
          <MainSectionTrends className="section trends" />
          <div className="main-line" />
          <MainSectionWhoToRead className="section happen" />
        </div>
      )}
    </div>
  );
});

export default MainContentTwitterPage;
