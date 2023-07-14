import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import NewMessageComponent from "./NewMessageComponent";
import arrowLeft from "./Img/arrow_left_icon.png";

const ContentMessagesPage = observer(() => {
  const { usersStore } = useContext(Context);
  const navigate = useNavigate();
  const [writeMessage, setWriteMessage] = useState(false);

  return (
    <div className="user-main-content-block">
      <div className="main-stiky-panel">
        <div className="page-name">
          <div
            className="main-search-block-button-return"
            onClick={() => navigate(-1)}
          >
            <img src={arrowLeft} alt="Button return" />
          </div>
          <div className="page-name-user-name">
            <h2>Messages</h2>
            <p>@{usersStore.user.user_name}</p>
          </div>
        </div>
      </div>
      <div className="main-line" />
      <div className="page-messages-welcome">
        <div className="page-messages-welcome-desc">
          <h2>Welcome to inbox!</h2>
          <p>Send a message in a private message with other Twitter users.</p>
          <button
            className="page-messages-button-write"
            type="button"
            onClick={() => setWriteMessage(true)}
          >
            <span>Write a new message</span>
          </button>
        </div>
      </div>
      <NewMessageComponent writeMessage={writeMessage} />
    </div>
  );
});

export default ContentMessagesPage;
