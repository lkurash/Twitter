import twitsClient from "../http/twitsClient";
import usersClient from "../http/usersClient";

export default async function getInfoAuthPage(
  authUserID,
  usersStore,
  usersFollowingsStore,
  twitsStore,
  retwitsStore,
  favoriteTwitsStore
) {
  // await usersClient.getUsers().then((users) => usersStore.setAllUsers(users));

  // await twitsClient.getAllTwits().then((alltwits) => {
  //   twitsStore.setTwits(alltwits);
  // });

  if (authUserID) {
    await twitsClient.getTwitsForAuthUser(authUserID).then((twits) => {
      twitsStore.setTwits(twits);
    });

    // await twitsClient
    //   .getUserRetwits(authUserID)
    //   .then((retwits) => retwitsStore.setUserRetwits(retwits));

    // await twitsClient
    //   .getFavoriteTwits(authUserID)
    //   .then((favoriteTwitsByUser) => {
    //     favoriteTwitsStore.setFavoriteTwits(favoriteTwitsByUser);
    //   });
  }
}