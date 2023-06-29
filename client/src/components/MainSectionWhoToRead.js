import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";
import { TWITTER_USER_PAGE } from "../utils/constans";
import ListWhoReadUserHomePage from "./ListWhoReadUserHomePage";
import undefinedUserPhoto from "./Img/user_photo.jpeg";

const MainSectionWhoToRead = observer((props) => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const getUserPhoto = (profile) => {
    if (profile.photo) {
      return `http://localhost:5500/${profile.photo}`;
    }
    return undefinedUserPhoto;
  };

  return (
    <section className={props.className}>
      <h2 className="main-section-name">Who to read</h2>
      {location === "/" || location === "/explore" ? (
        <ul className="follow-page-main-users">
          {user.allUsers.map((profile) => (
            <li key={profile.id} className="follow-page-main-user">
              <div
                className="section-read-main-user-info"
                onClick={() => navigate(TWITTER_USER_PAGE + profile.id)}
              >
                <div className="wrapper-follow-user-img">
                  <img src={getUserPhoto(profile)} alt="User" />
                </div>
                <div className="section-read-main-user-name">
                  <p className="user-name">{profile.user_name}</p>
                  <p className="profile-name">{`@${profile.user_name}`}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ListWhoReadUserHomePage />
      )}
    </section>
  );
});

export default MainSectionWhoToRead;
