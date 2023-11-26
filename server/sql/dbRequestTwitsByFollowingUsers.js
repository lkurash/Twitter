const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const db = require("../models/index.js");

const dbRequestTwitsByFollowingUsers = async (
  userId,
  authUserId,
  anyParams
) => {
  const twits = await db.sequelize.query(
    `SELECT "Twits"."id", "Twits"."text", "Twits"."img", "Twits"."userId", "Twits"."retwit", "Twits"."twitId", "Twits"."twitUserId", "Twits"."countRetwits", "Twits"."countLikes", "Twits"."countComments", "Twits"."createdAt", "Twits"."updatedAt", "likes"."id"
      AS "likes.id", "likes"."like" AS "likes.like", "likes"."userId"
      AS "likes.userId", "likes"."twitId" AS "likes.twitId", "user"."id" AS "user.id", "user"."user_name" AS "user.user_name", "user"."email" AS "user.email", "user"."password" AS "user.password", "user"."birthdate" AS "user.birthdate", "user"."web_site_url" AS "user.web_site_url", "user"."about" AS "user.about", "user"."photo" AS "user.photo", "user"."background" AS "user.background", "user->followings_user"."id" AS "user.followings_user.id", "user->followings_user"."followUserId" AS "user.followings_user.followUserId", "user->followings_user"."userId" AS "user.followings_user.userId", "retwits"."id" AS "retwits.id", "retwits"."text" AS "retwits.text", "retwits"."img" AS "retwits.img", "retwits"."userId" AS "retwits.userId", "retwits"."retwit" AS "retwits.retwit", "retwits"."twitId" AS "retwits.twitId", "retwits"."twitUserId" AS "retwits.twitUserId", "retwits"."countRetwits" AS "retwits.countRetwits", "retwits"."countLikes" AS "retwits.countLikes", "retwits"."countComments" AS "retwits.countComments", "twit_user"."id" AS "twit_user.id", "twit_user"."user_name" AS "twit_user.user_name", "twit_user"."email" AS "twit_user.email", "twit_user"."password" AS "twit_user.password", "twit_user"."birthdate" AS "twit_user.birthdate", "twit_user"."web_site_url" AS "twit_user.web_site_url", "twit_user"."about" AS "twit_user.about", "twit_user"."photo" AS "twit_user.photo", "twit_user"."background" AS "twit_user.background", "favorite_twits"."id" AS "favorite_twits.id", "favorite_twits"."bookmark" AS "favorite_twits.bookmark", "favorite_twits"."userId" AS "favorite_twits.userId", "favorite_twits"."twitId" AS "favorite_twits.twitId"
      FROM "Twits" AS "Twits"
      LEFT OUTER JOIN "Likes" AS "likes" ON ("Twits"."id" = "likes"."twitId" and "likes"."userId" = ${userId} )
      LEFT OUTER JOIN "Users" AS "user" ON "Twits"."userId" = "user"."id"
      LEFT OUTER JOIN "Followings" AS "user->followings_user" ON ("user"."id" = "user->followings_user"."followUserId" and "user->followings_user"."userId" = ${userId})
      LEFT OUTER JOIN "Twits" AS "retwits" ON ("Twits"."id" = "retwits"."twitId" and "retwits"."userId" = ${userId})
      LEFT OUTER JOIN "Users" AS "twit_user" ON "Twits"."twitUserId" = "twit_user"."id"
      LEFT OUTER JOIN "Favorite_twits" AS "favorite_twits" ON ("Twits"."id" = "favorite_twits"."twitId" and "favorite_twits"."userId" = ${userId})
      WHERE "user->followings_user"."userId" = ${userId} or "Twits"."userId" = ${userId} ORDER BY "Twits"."id"
      ${anyParams}`,
    {
      type: QueryTypes.SELECT,
      nest: true,
    }
  );
  return twits;
};
module.exports = dbRequestTwitsByFollowingUsers;
