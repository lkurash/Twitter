import twitsClient from "../http/twitsClient";
import getAuthUserID from "./getAuthUserID";

export default async function getMoreFavoriteTwits(
  showMoreTwits,
  itemListTwits,
  store,
  setShowMoreTwits,
  setShowButton
) {
  if (showMoreTwits) {
    const authUserID = getAuthUserID();

    await twitsClient
      .getFavoriteTwits(authUserID, 7, itemListTwits)
      .then((favoriteTwitsByUser) => {
        store.setFavoriteTwits(
          store.favoriteTwits.concat(favoriteTwitsByUser.favoriteTwits)
        );

        setShowMoreTwits(false);

        if (favoriteTwitsByUser.favoriteTwits.length < 7) {
          setShowButton(false);
        }
      });
  }
}
