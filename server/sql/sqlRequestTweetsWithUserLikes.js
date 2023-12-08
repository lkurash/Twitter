const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const db = require("../models/index.js");

const sqlRequestTweetsWithUserLikes = async (userId, authUserId, anyParams) => {
  const tweets = await db.sequelize.query(
    `SELECT "Likes"."id", "Likes"."like", "Likes"."userId", "Likes"."tweetId", "Likes"."createdAt", "Likes"."updatedAt", "tweet"."id" AS "tweet.id", "tweet"."text" AS "tweet.text", "tweet"."img" AS "tweet.img", "tweet"."userId" AS "tweet.userId", "tweet"."retweet" AS "tweet.retweet", "tweet"."tweetId" AS "tweet.tweetId", "tweet"."tweetUserId" AS "tweet.tweetUserId", "tweet"."countRetweets" AS "tweet.countRetweets", "tweet"."countLikes" AS "tweet.countLikes", "tweet"."countComments" AS "tweet.countComments", "tweet->user"."id" AS "tweet.user.id", "tweet->user"."user_name" AS "tweet.user.user_name", "tweet->user"."email"
      AS "tweet.user.email", "tweet->user"."password" AS "tweet.user.password", "tweet->user"."birthdate" AS "tweet.user.birthdate", "tweet->user"."web_site_url" AS "tweet.user.web_site_url", "tweet->user"."about" AS "tweet.user.about", "tweet->user"."photo" AS "tweet.user.photo", "tweet->user"."background" AS "tweet.user.background", "tweet->tweet_user"."id" AS "tweet.tweet_user.id", "tweet->tweet_user"."user_name" AS "tweet.tweet_user.user_name", "tweet->tweet_user"."email" AS "tweet.tweet_user.email", "tweet->tweet_user"."password" AS "tweet.tweet_user.password", "tweet->tweet_user"."birthdate" AS "tweet.tweet_user.birthdate", "tweet->tweet_user"."web_site_url" AS "tweet.tweet_user.web_site_url", "tweet->tweet_user"."about" AS "tweet.tweet_user.about", "tweet->tweet_user"."photo" AS "tweet.tweet_user.photo", "tweet->tweet_user"."background" AS "tweet.tweet_user.background", "tweet->retweets"."id" AS "tweet.retweets.id", "tweet->retweets"."text" AS "tweet.retweets.text", "tweet->retweets"."img" AS "tweet.retweets.img", "tweet->retweets"."userId" AS "tweet.retweets.userId", "tweet->retweets"."retweet" AS "tweet.retweets.retweet", "tweet->retweets"."tweetId" AS "tweet.retweets.tweetId", "tweet->retweets"."tweetUserId" AS "tweet.retweets.tweetUserId", "tweet->retweets"."countRetweets" AS "tweet.retweets.countRetweets", "tweet->retweets"."countLikes" AS "tweet.retweets.countLikes", "tweet->retweets"."countComments" AS "tweet.retweets.countComments", "tweet->likes"."id" AS "tweet.likes.id", "tweet->likes"."like" AS "tweet.likes.like", "tweet->likes"."userId" AS "tweet.likes.userId", "tweet->likes"."tweetId" AS "tweet.likes.tweetId", "tweet->favorite_tweets"."id" AS "tweet.favorite_tweets.id", "tweet->favorite_tweets"."bookmark" AS "tweet.favorite_tweets.bookmark", "tweet->favorite_tweets"."userId" AS "tweet.favorite_tweets.userId", "tweet->favorite_tweets"."tweetId" AS "tweet.favorite_tweets.tweetId"
      FROM "Likes" AS "Likes"
      LEFT OUTER JOIN "Tweets" AS "tweet" ON "Likes"."tweetId" = "tweet"."id"
      LEFT OUTER JOIN "Users" AS "tweet->user" ON "tweet"."userId" = "tweet->user"."id"
      LEFT OUTER JOIN "Users" AS "tweet->tweet_user" ON "tweet"."tweetUserId" = "tweet->tweet_user"."id"
      LEFT OUTER JOIN "Tweets" AS "tweet->retweets" ON ("tweet"."id" = "tweet->retweets"."tweetId" and "tweet->retweets"."userId" = ${authUserId})
      LEFT OUTER JOIN "Likes" AS "tweet->likes" ON ("tweet"."id" = "tweet->likes"."tweetId" and "tweet->likes"."userId" = ${authUserId} )
      LEFT OUTER JOIN "Favorite_tweets" AS "tweet->favorite_tweets" ON ("tweet"."id" = "tweet->favorite_tweets"."tweetId" and "tweet->favorite_tweets"."userId" = ${authUserId})
      Where "Likes"."userId" = ${userId}
      ${anyParams}`,
    {
      type: QueryTypes.SELECT,
      nest: true,
    }
  );
  return tweets;
};
module.exports = sqlRequestTweetsWithUserLikes;
