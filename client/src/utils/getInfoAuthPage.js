import twitsApi from "../http/twitsApi";
import userApi from "../http/userApi";

export default async function getInfoAuthPage(
  authUserID,
  usersStore,
  usersFollowingsStore,
  twitsStore,
  retwitsStore,
  favoriteTwitsStore
) {
  await userApi.getUsers().then((users) => usersStore.setAllUsers(users));

  await twitsApi.getAllTwits().then((alltwits) => {
    twitsStore.setTwits(alltwits);
  });

  if (authUserID) {
    await twitsApi.getTwitsWithUsersLike(authUserID).then((twits) => {
      twitsStore.setTwitsIdWithUsersLike(twits.ids);
      twitsStore.setTwitsWithUsersLike(twits.twits);
    });

    await twitsApi
      .getUserRetwits(authUserID)
      .then((retwits) => retwitsStore.setUserRetwits(retwits));

    await twitsApi.getFavoriteTwits(authUserID).then((favoriteTwitsByUser) => {
      favoriteTwitsStore.setFavoriteTwits(favoriteTwitsByUser.favoriteTwits);
      favoriteTwitsStore.setFavoriteTwitsIds(favoriteTwitsByUser.ids);
    });
  }
}
