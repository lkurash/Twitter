export default async function getMoreTweets(
  showMoreTweets,
  dispatch,
  getTweets,
  itemListTweets,
  userId
) {
  if (showMoreTweets) {
    if (userId) {
      dispatch(getTweets(userId, 9, itemListTweets));
    } else {
      dispatch(getTweets(9, itemListTweets));
    }
  }
}
