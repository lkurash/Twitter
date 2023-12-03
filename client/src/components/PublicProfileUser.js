import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import { userProfileById } from "../redux/user/user.selectors";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import loadPageUserInfo from "./loadComponents/loadPageUserInfo";
import ProfileUserInfo from "./ProfileUserInfo";
import UserTweets from "./Tweets/UserTweets";

const PublicProfileUser = observer(() => {
  const { profile } = useSelector(userProfileById);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  }, [id]);

  if (isLoading || !profile.id) {
    return loadPageUserInfo();
  }

  return (
    <div className="main-content">
      <div className="main-content-block">
        <div className="main-content-profile-panel">
          <ProfileUserInfo />
        </div>
        <div className="main-line" />
        <UserTweets />
      </div>
    </div>
  );
});

export default PublicProfileUser;
