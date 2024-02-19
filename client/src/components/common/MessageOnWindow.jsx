import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../../Context";

const MessageOnWindow = observer(() => {
  const { infoMessageStore } = useContext(Context);

  useEffect(() => {
    setTimeout(() => {
      infoMessageStore.setInfoMessageVisible(false);
    }, 3000);
  }, [infoMessageStore.infoMessageVisible]);

  return (
    <div className="wrapper-message-on-window">
      <p>{infoMessageStore.textMessage}</p>
    </div>
  );
});
export default MessageOnWindow;
