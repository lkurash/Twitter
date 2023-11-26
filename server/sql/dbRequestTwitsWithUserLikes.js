const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const db = require("../models/index.js");

const dbRequestTwitsWithUserLikes = async (userId, authUserId, anyParams) => {
  const twits = await db.sequelize.query(
    `SELECT "Likes"."id", "Likes"."like", "Likes"."userId", "Likes"."twitId", "Likes"."createdAt", "Likes"."updatedAt", "twit"."id" AS "twit.id", "twit"."text" AS "twit.text", "twit"."img" AS "twit.img", "twit"."userId" AS "twit.userId", "twit"."retwit" AS "twit.retwit", "twit"."twitId" AS "twit.twitId", "twit"."twitUserId" AS "twit.twitUserId", "twit"."countRetwits" AS "twit.countRetwits", "twit"."countLikes" AS "twit.countLikes", "twit"."countComments" AS "twit.countComments", "twit->user"."id" AS "twit.user.id", "twit->user"."user_name" AS "twit.user.user_name", "twit->user"."email"
      AS "twit.user.email", "twit->user"."password" AS "twit.user.password", "twit->user"."birthdate" AS "twit.user.birthdate", "twit->user"."web_site_url" AS "twit.user.web_site_url", "twit->user"."about" AS "twit.user.about", "twit->user"."photo" AS "twit.user.photo", "twit->user"."background" AS "twit.user.background", "twit->twit_user"."id" AS "twit.twit_user.id", "twit->twit_user"."user_name" AS "twit.twit_user.user_name", "twit->twit_user"."email" AS "twit.twit_user.email", "twit->twit_user"."password" AS "twit.twit_user.password", "twit->twit_user"."birthdate" AS "twit.twit_user.birthdate", "twit->twit_user"."web_site_url" AS "twit.twit_user.web_site_url", "twit->twit_user"."about" AS "twit.twit_user.about", "twit->twit_user"."photo" AS "twit.twit_user.photo", "twit->twit_user"."background" AS "twit.twit_user.background", "twit->retwits"."id" AS "twit.retwits.id", "twit->retwits"."text" AS "twit.retwits.text", "twit->retwits"."img" AS "twit.retwits.img", "twit->retwits"."userId" AS "twit.retwits.userId", "twit->retwits"."retwit" AS "twit.retwits.retwit", "twit->retwits"."twitId" AS "twit.retwits.twitId", "twit->retwits"."twitUserId" AS "twit.retwits.twitUserId", "twit->retwits"."countRetwits" AS "twit.retwits.countRetwits", "twit->retwits"."countLikes" AS "twit.retwits.countLikes", "twit->retwits"."countComments" AS "twit.retwits.countComments", "twit->likes"."id" AS "twit.likes.id", "twit->likes"."like" AS "twit.likes.like", "twit->likes"."userId" AS "twit.likes.userId", "twit->likes"."twitId" AS "twit.likes.twitId", "twit->favorite_twits"."id" AS "twit.favorite_twits.id", "twit->favorite_twits"."bookmark" AS "twit.favorite_twits.bookmark", "twit->favorite_twits"."userId" AS "twit.favorite_twits.userId", "twit->favorite_twits"."twitId" AS "twit.favorite_twits.twitId"
      FROM "Likes" AS "Likes"
      LEFT OUTER JOIN "Twits" AS "twit" ON "Likes"."twitId" = "twit"."id"
      LEFT OUTER JOIN "Users" AS "twit->user" ON "twit"."userId" = "twit->user"."id"
      LEFT OUTER JOIN "Users" AS "twit->twit_user" ON "twit"."twitUserId" = "twit->twit_user"."id"
      LEFT OUTER JOIN "Twits" AS "twit->retwits" ON ("twit"."id" = "twit->retwits"."twitId" and "twit->retwits"."userId" = ${authUserId})
      LEFT OUTER JOIN "Likes" AS "twit->likes" ON ("twit"."id" = "twit->likes"."twitId" and "twit->likes"."userId" = ${authUserId} )
      LEFT OUTER JOIN "Favorite_twits" AS "twit->favorite_twits" ON ("twit"."id" = "twit->favorite_twits"."twitId" and "twit->favorite_twits"."userId" = ${authUserId})
      Where "Likes"."userId" = ${userId}
      ${anyParams}`,
    {
      type: QueryTypes.SELECT,
      nest: true,
    }
  );
  return twits;
};
module.exports = dbRequestTwitsWithUserLikes;
