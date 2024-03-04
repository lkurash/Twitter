import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInfoMessageVisible } from "../../redux/popupElements/infoMessage";
import { popupElementsStateInfoMessage } from "../../redux/popupElements/popup.selectors";


const MessageOnWindow = () => {
  const dispatch = useDispatch();
  const infoMessageStore = useSelector(popupElementsStateInfoMessage);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setInfoMessageVisible(false));
    }, 3000);
  }, [infoMessageStore.infoMessageVisible]);

  return (
    <div className="wrapper-message-on-window">
      <p>{infoMessageStore.text}</p>
    </div>
  );
};
export default MessageOnWindow;
