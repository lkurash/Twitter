import { useContext } from "react";
import MainSectionTrends from "./MainSectionTrends";
import { Context } from "..";
import MainSectionWhoToRead from "./MainSectionWhoToRead";

function MainContentTwitterPage() {
  const { user } = useContext(Context);
  // const { twits } = useContext(Context);
  // const { topics } = useContext(Context);

  // useEffect(() => {
  //   try {
  //     getAllTopics().then((data) => topics.setTopics(data));
  //     getAllUsers().then((data) => user.setAllUsers(data));
  //     getAllTwits().then((data) => twits.setTwits(data));
  //   } catch (error) {
  //     console.log(error.response.data.message);
  //   }
  // });
  return (
    <div>
      {!user.isAuth &&
        <div className="main-content">
          <MainSectionTrends className="section trends" />
          <div className="main-line" />
          <MainSectionWhoToRead className="section happen" />
        </div>
      }
    </div>
  );
}
export default MainContentTwitterPage;
