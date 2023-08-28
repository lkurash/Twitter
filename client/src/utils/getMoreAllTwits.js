import twitsClient from "../http/twitsClient";

export default async function getMoreAllTwits(
  showMoreTwits,
  itemListTwits,
  twitsStore,
  setShowMoreTwits,
  setShowButton
) {
  if (showMoreTwits) {
    await twitsClient.getAllTwits(7, itemListTwits).then((alltwits) => {
      twitsStore.setTwits(twitsStore.twits.concat(alltwits));

      setShowMoreTwits(false);

      if (alltwits.length < 7) {
        setShowButton(false);
      }
    });
  }
}
