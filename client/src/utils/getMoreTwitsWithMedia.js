import twitsApi from "../http/twitsApi";
import getAuthUserID from "./getAuthUserID";

export default async function getMoreTwitsWithMedia(
  showMoreTwits,
  itemListTwits,
  store,
  setShowMoreTwits,
  setShowButton
) {
  if (showMoreTwits) {
    const authUserID = getAuthUserID();

    await twitsApi
      .getUserTwitsWithMedia(authUserID, 4, itemListTwits)
      .then((twits) => {
        store.setUserTwitsWithMedia(store.userTwitsWithMedia.concat(twits));

        setShowMoreTwits(false);

        if (twits.length < 4) {
          setShowButton(false);
        }
      });
  }
}
