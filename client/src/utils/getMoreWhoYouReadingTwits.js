import { getTwitsByFollowingsUsers } from "../http/twitsApi";
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

    await getTwitsByFollowingsUsers(authUserID, 7, itemListTwits).then(
      (twits) => {
        twitsStore.setTwitsWhoReading(
          twitsStore.twitsWhoReading.concat(twits)
        );
        setShowMoreTwits(false);
        if (twits.length < 7) {
          setShowButton(false);
        }
      }
    );
  }
}
