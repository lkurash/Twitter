export default async function getMoreTweets(
  showMoreTweets,
  dispatch,
  getTweets,
  itemListTweets,
  userId
) {
  if (showMoreTweets) {
    if (userId) {
      dispatch(getTweets(userId, 7, itemListTweets));
    } else {
      dispatch(getTweets(7, itemListTweets));
    }
  }
}
