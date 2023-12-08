const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const db = require("../models/index.js");

const sqlRequestFollowings = async (decodeUser, request, anyParams) => {
  const { userId } = request.params;

  const user = decodeUser(request);
  const userIdToken = user.id;

  const users = await db.sequelize.query(
    `SELECT "Following"."id", "Following"."followUserId", "Following"."userId", "followUser"."id" AS "followUser.id", "followUser"."user_name" AS "followUser.user_name", "followUser"."email" AS "followUser.email", "followUser"."password" AS "followUser.password", "followUser"."birthdate" AS "followUser.birthdate", "followUser"."web_site_url" AS "followUser.web_site_url", "followUser"."about" AS "followUser.about", "followUser"."photo" AS "followUser.photo", "followUser"."background" AS "followUser.background", "followUser->followers_user"."id" AS "followUser.followers_user.id", "followUser->followers_user"."followUserId" AS "followUser.followers_user.followUserId", "followUser->followers_user"."userId" AS "followUser.followers_user.userId"
        FROM "Followings"  AS "Following"
        LEFT OUTER JOIN  "Users" AS "followUser" ON "Following"."followUserId" = "followUser"."id"
        LEFT OUTER JOIN "Followings" AS "followUser->followers_user" ON ("followUser->followers_user"."userId" = ${userIdToken}
		and "followUser"."id" = "followUser->followers_user"."followUserId")
		where "Following"."userId" = ${userId}`,
    {
      type: QueryTypes.SELECT,
      nest: true,
    }
  );
  return users;
};
module.exports = sqlRequestFollowings;
