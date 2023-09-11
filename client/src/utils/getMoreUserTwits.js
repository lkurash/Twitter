import twitsClient from "../http/twitsClient";

export default async function getMoreUserTwits(
  showMoreTwits,
  itemListTwits,
  twitsStore,
  setShowMoreTwits,
  setShowButton,
  userId
) {
  if (showMoreTwits) {
    await twitsClient
      .getTwitsByUser(userId, 7, itemListTwits)
      .then((usersTwits) => {
        twitsStore.setTwits(twitsStore.twits.concat(usersTwits));

        setShowMoreTwits(false);

        if (usersTwits.length < 7) {
          setShowButton(false);
        }
      });
  }
}
