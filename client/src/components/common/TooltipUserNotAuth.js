import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE, SIGNUP_PAGE } from "../../utils/constans";
import useOutsideClick from "../../utils/useOutsideClickFunction";
import bookmarkImg from "../Img/tooltip_bookmark_heart_icon.png";
import likeImg from "../Img/active_like.png";
import retwitImg from "../Img/tooltip_retweet_icon.png";
import commentImg from "../Img/tooltip_comment_icon.png";
import close from "../Img/x_icon.png";

function TooltipUserNotAuth({tooltipUserNotAuth, onCloseTooltip, bookmark, like, retwit, comment}) {
  const tooltipRef = useRef(null);
  const navigate = useNavigate();

  useOutsideClick(tooltipRef, onCloseTooltip, tooltipUserNotAuth);

  if(!tooltipUserNotAuth) return null;
  return(
    <div className="wrapper-tooltip-notauth-user">
      <div ref={tooltipRef} className="tooltip-notauth-user">
        <div className="tooltip-notauth-user-header">
          <div className="button-close"
            onClick={()=> onCloseTooltip()}>
            <img src={close} alt="close-icon" className="close-icon" />
          </div>
        </div>
        {bookmark &&
        <img src={bookmarkImg} alt="Bookmark" className="tooltip-notauth-user-img"/>
        }
        {like &&
        <img src={likeImg} alt="Like" className="tooltip-notauth-user-img"/>
        }
        {retwit &&
        <img src={retwitImg} alt="Retwit" className="tooltip-notauth-user-img"/>
        }
        {comment &&
        <img src={commentImg} alt="Comment" className="tooltip-notauth-user-img"/>
        }
        <div className="tooltip-notauth-user-text">
          {bookmark &&
          <>
            <h2>Bookmark a Tweet to save it.</h2>
            <p>Join Twitter now</p>
          </>
          }
          {like &&
          <>
            <h2>Like a Tweet to share the love.
            </h2>
            <p>Join Twitter now to let internet hall of fame know you like their Tweet.</p>
          </>
          }
          {retwit &&
          <>
            <h2>Retweet to spread the word.
            </h2>
            <p>When you join Twitter, you can share internet hall of fame’s Tweet with your followers.</p>
          </>
          }
          {comment &&
          <>
            <h2>Reply to join the conversation.
            </h2>
            <p>Once you’ve joined Twitter, you’ll be able to respond to internet hall of fame’s Tweet.</p>
          </>
          }
        </div>
        <button
          className="tooltip-notauth-user-button-login"
          type="button"
          onClick={()=> navigate(LOGIN_PAGE)}
        >
          <span>Log in</span>
        </button>
        <button
          className="tooltip-notauth-user-button-signup"
          type="button"
          onClick={()=> navigate(SIGNUP_PAGE)}
        >
          <span>Sign up</span>
        </button>
      </div>
    </div>
  );
}
export default TooltipUserNotAuth;
