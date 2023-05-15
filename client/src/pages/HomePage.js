import { observer } from "mobx-react-lite";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Context } from "..";
import "../App.css";
import "../components/common/common.css";
import "../components/main.css";
import "../components/userpage.css";
import MenuComponent from "../components/MenuComponent";
import SidebarComponent from "../components/SidebarComponent";
import TwitForm from "../components/TwitForm";
import { getAllTwits, getRetwitsByUser } from "../hhtp/twitsApi";
import { getAllUsers, getFollowingUser, getUserInfo } from "../hhtp/userApi";
import TwitsForYou from "../components/TwitsForYou";
import TwitsWhoYouRead from "../components/TwitsWhoYouReading";
import FooterMobileComponent from "../components/FooterMobileComponent";
import { TWITTER_PAGE } from "../utils/constans";

const HomePage = observer(() => {
  const { twits } = useContext(Context);
  const { user } = useContext(Context);
  const { retwits } = useContext(Context);
  const ref = useRef();
  const { id } = useParams();
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const [showTwitsForYou, setShowTwitsForYou] = useState(true);
  const [showTwitsWhoReading, setShowTwitsWhoReading] = useState(false);

  useLayoutEffect(() => {
    ref.current.scrollIntoView();
  });

  if (user.isAuth) {
    useEffect(() => {
      try {
        getUserInfo().then((data) => user.setUser(data));
        getAllTwits().then((data) => twits.setTwits(data));
        getRetwitsByUser(id).then((data) => retwits.setRetwits(data));
        getFollowingUser(id).then((data) => user.setuserFollowing(data));
        getAllUsers().then((data) => user.setAllUsers(data));
      } catch (e) {
        console.log(e.response.data.message);
      }
    });
  } else {
    useEffect(() => {
      navigate(TWITTER_PAGE);
    });
  }
  return (
    <div>
      <div className="page" ref={ref}>
        <MenuComponent />
        <main className="main-wrapper">
          <div className="main">
            <div className="user-main-content">
              {location === `/home/${id}` && (
                <div className="user-main-content-block">
                  <div>
                    <div className="page-name">
                      <div className="page-name-user-name">
                        <h2>Home</h2>
                      </div>
                    </div>
                    <div className="user-main-content-button-panel">
                      {showTwitsForYou ? (
                        <button
                          type="button"
                          className="user-main-content-foryou-button-panel active-button-panel"
                          onClick={() => {
                            setShowTwitsForYou(true);
                            setShowTwitsWhoReading(false);
                          }}
                        >
                          <span>For you</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="user-main-content-foryou-button-panel"
                          onClick={() => {
                            setShowTwitsForYou(true);
                            setShowTwitsWhoReading(false);
                          }}
                        >
                          <span>For you</span>
                        </button>
                      )}
                      {showTwitsWhoReading ? (
                        <button
                          type="button"
                          className="user-main-content-reading-button-panel active-button-panel"
                          onClick={() => {
                            setShowTwitsForYou(false);
                            setShowTwitsWhoReading(true);
                          }}
                        >
                          <span> You ara reading</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="user-main-content-reading-button-panel"
                          onClick={() => {
                            setShowTwitsForYou(false);
                            setShowTwitsWhoReading(true);
                          }}
                        >
                          <span> You are reading</span>
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="main-line" />
                  <div className="user-main-content-block user-main-content-block-mobile">
                    <TwitForm />
                  </div>
                  <div className="main-line" />
                  {showTwitsForYou && <TwitsForYou />}
                  {showTwitsWhoReading && <TwitsWhoYouRead />}
                </div>
              )}
            </div>
          </div>
        </main>
        <SidebarComponent />
      </div>
      <FooterMobileComponent />
    </div>
  );
});

export default HomePage;
