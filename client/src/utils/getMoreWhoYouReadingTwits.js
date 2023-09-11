import twitsClient from "../http/twitsClient";
import getAuthUserID from "./getAuthUserID";

export default async function getMoreWhoYouReadingTwits(
  showMoreTwits,
  itemListTwits,
  twitsStore,
  setShowMoreTwits,
  setShowButton
) {
  if (showMoreTwits) {
    const authUserID = getAuthUserID();

    await twitsClient
      .getTwitsByFollowingsUsers(authUserID, 7, itemListTwits)
      .then((twits) => {
        twitsStore.setTwits(twitsStore.twits.concat(twits));

        setShowMoreTwits(false);

        if (twits.length < 7) {
          setShowButton(false);
        }
      });
  }
}
