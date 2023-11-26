import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { visibilityPageActions } from "../../redux/visibilityPage/visibilityPage.actions";
import { useDispatch, useSelector } from "react-redux";
import { visibility } from "../../redux/visibilityPage/visibilityPage.selectors";

import getAuthUserID from "../../utils/getAuthUserID";

import ContentExplorePageAllTwits from "../../components/ContentExplorePageAllTwits";

const PrivateExplorePage = observer(() => {
  const dispatch = useDispatch();
  const { loadingStatus } = useSelector(visibility);
  const authUserID = getAuthUserID();

  useEffect(() => {
    if (loadingStatus === "COMPLETE") {
      dispatch(visibilityPageActions.getVisibilityTwitsForAuthUser(authUserID));
    }
  }, [loadingStatus]);

  if (loadingStatus !== "COMPLETE") {
    return null;
  }

  return (
    <>
      <ContentExplorePageAllTwits />
    </>
  );
});

export default PrivateExplorePage;
