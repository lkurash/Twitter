const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const db = require("../models/index.js");

const dbRequestTweetsForAuthUser = async (userId, authUserId, anyParams) => {
  const tweets = await db.sequelize.query(
    `SELECT "Tweets"."id", "Tweets"."text", "Tweets"."img", "Tweets"."userId", "Tweets"."retweet", "Tweets"."tweetId", "Tweets"."tweetUserId", "Tweets"."countRetweets", "Tweets"."countLikes", "Tweets"."countComments", "Tweets"."createdAt", "Tweets"."updatedAt", "likes"."id" AS "likes.id", "likes"."like" AS "likes.like", "likes"."userId" AS "likes.userId", "likes"."tweetId" AS "likes.tweetId", "user"."id" AS "user.id", "user"."user_name" AS "user.user_name", "user"."email" AS "user.email", "user"."password" AS "user.password", "user"."birthdate" AS "user.birthdate", "user"."web_site_url" AS "user.web_site_url", "user"."about" AS "user.about", "user"."photo" AS "user.photo", "user"."background" AS "user.background", "retweets"."id" AS "retweets.id", "retweets"."text" AS "retweets.text", "retweets"."img" AS "retweets.img", "retweets"."userId" AS "retweets.userId", "retweets"."retweet" AS "retweets.retweet", "retweets"."tweetId" AS "retweets.tweetId", "retweets"."tweetUserId" AS "retweets.tweetUserId", "retweets"."countRetweets" AS "retweets.countRetweets", "retweets"."countLikes" AS "retweets.countLikes", "retweets"."countComments" AS "retweets.countComments", "tweet_user"."id" AS "tweet_user.id", "tweet_user"."user_name" AS "tweet_user.user_name", "tweet_user"."email" AS "tweet_user.email", "tweet_user"."password" AS "tweet_user.password", "tweet_user"."birthdate" AS "tweet_user.birthdate", "tweet_user"."web_site_url" AS "tweet_user.web_site_url", "tweet_user"."about" AS "tweet_user.about", "tweet_user"."photo" AS "tweet_user.photo", "tweet_user"."background" AS "tweet_user.background", "favorite_tweets"."id" AS "favorite_tweets.id", "favorite_tweets"."bookmark" AS "favorite_tweets.bookmark", "favorite_tweets"."userId" AS "favorite_tweets.userId", "favorite_tweets"."tweetId" AS "favorite_tweets.tweetId"
    FROM "Tweets" AS "Tweets"
      LEFT OUTER JOIN "Likes" AS "likes" ON ("Tweets"."id" = "likes"."tweetId" and "likes"."userId" = ${authUserId} )
      LEFT OUTER JOIN "Users" AS "user" ON "Tweets"."userId" = "user"."id"
      LEFT OUTER JOIN "Tweets" AS "retweets" ON ("Tweets"."id" = "retweets"."tweetId" and "retweets"."userId" = ${authUserId})
      LEFT OUTER JOIN "Users" AS "tweet_user" ON "Tweets"."tweetUserId" = "tweet_user"."id"
      LEFT OUTER JOIN "Favorite_tweets" AS "favorite_tweets" ON ("Tweets"."id" = "favorite_tweets"."tweetId" and "favorite_tweets"."userId" = ${authUserId})
      ${anyParams}`,
    {
      type: QueryTypes.SELECT,
      nest: true,
    }
  );
  return tweets;
};
module.exports = dbRequestTweetsForAuthUser;
