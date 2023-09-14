import twitClient from "../http/twitClient";

export default async function getMoreUserTwits(
  showMoreTwits,
  itemListTwits,
  twitsStore,
  setShowMoreTwits,
  setShowButton,
  userId
) {
  if (showMoreTwits) {
    await twitClient
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
