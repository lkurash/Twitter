const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const db = require("../models/index.js");

const sqlRequestCountTweetsForAuthUserByFollowings = async (userId) => {
  const countTweets = await db.sequelize.query(
    `SELECT count("Tweets"."id") AS "count"
      FROM "Tweets" AS "Tweets"
      LEFT OUTER JOIN "Users" AS "user" ON "Tweets"."userId" = "user"."id"
      LEFT OUTER JOIN "Followings" AS "user->followings_user" ON ("user"."id" = "user->followings_user"."followUserId"
      and "user->followings_user"."userId" = ${userId})
      LEFT OUTER JOIN "Tweets" AS "retweets" ON ("Tweets"."id" = "retweets"."tweetId" and "retweets"."userId" = ${userId})
      LEFT OUTER JOIN "Users" AS "tweet_user" ON "Tweets"."tweetUserId" = "tweet_user"."id"
      WHERE "user->followings_user"."userId" = ${userId} or "Tweets"."userId" = ${userId} `,
    {
      type: QueryTypes.SELECT,
      nest: true,
    }
  );
  return countTweets;
};
module.exports = sqlRequestCountTweetsForAuthUserByFollowings;
