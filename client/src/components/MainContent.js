import { useContext, useEffect } from "react";
import MainSectionTrends from "./MainSectionTrends";
import { Context } from "..";
import { getAllTopics } from "../hhtp/topicsApi";
import MainSectionWhoToRead from "./MainSectionWhoToRead";
import { getAllUsers } from "../hhtp/userApi";
import { getAllTwits } from "../hhtp/twitsApi";

function MainContent() {
  const { user } = useContext(Context);
  const { twits } = useContext(Context);
  const { topics } = useContext(Context);

  useEffect(() => {
    try {
      getAllTopics().then((data) => topics.setTopics(data));
      getAllUsers().then((data) => user.setAllUsers(data));
      getAllTwits().then((data) => twits.setTwits(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  });
  return (
    <div>
      {!user.user.id ? (
        <div className="main-content">
          <MainSectionTrends className="section trends" />
          <div className="main-line" />
          <MainSectionWhoToRead className="section happen" />
        </div>
      ) : (
        <div className="main-content">
          <MainSectionTrends className="section trends-home" />
          <MainSectionWhoToRead className="section happen-home" user={user} />
        </div>
      )}
    </div>
  );
}
export default MainContent;
