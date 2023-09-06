const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const uuid = require("uuid");
const path = require("path");

const { QueryTypes } = require("sequelize");
const sequelize = new Sequelize(
  "twitter_development",
  "postgres",
  "qweqweqwe",
  {
    host: "127.0.0.1",
    dialect: "postgres",
  }
);

const TwitsPresenter = require("../presenters/twitsPresenter");
const TwitsWithUserLikesPresenter = require("../presenters/twitsWithUserLikesPresenter");
const models = require("../models/index");
const ApiError = require("../error/ApiError");
const dbRequestTwitsForAuthUser = require("../sql/dbRequestTwitsForAuthUser ");
const Twits = models.Twits;
const User = models.User;
const Likes = models.Likes;
const Comments = models.Comments;
const Favorite_twits = models.Favorite_twits;
const Following = models.Following;

const decodeUser = (request) => {
  const token = request.headers.authorization.split(" ")[1];
  const decodeUser = jwt.decode(token);

  return decodeUser;
};

const checkUsersAuth = (request, userId, next) => {
  const user = decodeUser(request);
  const userIdToken = user.id;

  if (userIdToken !== parseInt(userId)) {
    next(ApiError.badRequest(`Check authentication ${userId}`));
  }
};

class TwitsController {
  async createTwitByUser(request, response, next) {
    try {
      const { text } = request.body;

      const file = request.files;
      const user = decodeUser(request);
      const userId = user.id;

      if (file) {
        const { img } = request.files;
        let fileName = uuid.v4() + ".jpg";

        img.mv(path.resolve(__dirname, "..", "static", fileName));
        const newTwit = await Twits.create({ text, img: fileName, userId });

        const twit = await Twits.findOne({
          include: [{ model: User, as: "user" }],
          where: { id: newTwit.id },
        });

        return response.json([twit]);
      } else {
        const newTwit = await Twits.create({ text, userId });

        const twit = await Twits.findOne({
          include: [{ model: User, as: "user" }],
          where: { id: newTwit.id },
        });

        return response.json([twit]);
      }
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async getTwitsByUser(request, response, next) {
    try {
      const Op = Sequelize.Op;
      const { userId } = request.params;

      let { limit, list } = request.query;
      limit = limit || 7;
      list = list || 1;
      let offset = list * limit - limit;

      const params = `WHERE "Twits"."userId" = ${userId} ORDER BY "Twits"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

      const twits = await dbRequestTwitsForAuthUser(
        decodeUser,
        request,
        params
      );

      const presenter = new TwitsPresenter(twits);

      return response.json(presenter.toJSON());
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async getTwitsByFollowingUsers(request, response, next) {
    try {
      const Op = Sequelize.Op;
      const { userId } = request.params;
      let { limit, list } = request.query;
      limit = limit || 7;
      list = list || 1;
      let offset = list * limit - limit;

      const twits = await sequelize.query(
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
      WHERE "user->followings_user"."userId" = ${userId} or "Twits"."userId" = ${userId} ORDER BY "Twits"."id" DESC LIMIT ${limit} OFFSET ${offset}`,
        {
          type: QueryTypes.SELECT,
          nest: true,
        }
      );

      const presenter = new TwitsPresenter(twits);

      return response.json(presenter.toJSON());
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async gelAllTwits(request, response) {
    let { limit, list } = request.query;

    limit = limit || 7;
    list = list || 1;
    let offset = list * limit - limit;

    const twits = await Twits.findAll({
      order: [["id", "DESC"]],
      limit: limit,
      offset: offset,
    });

    return response.json(twits);
  }

  async getTwitsForAuthUser(request, response, next) {
    const Op = Sequelize.Op;
    const { userId } = request.params;
    const user = decodeUser(request);
    const userIdToken = user.id;

    let { limit, list } = request.query;

    limit = limit || 7;
    list = list || 1;
    let offset = list * limit - limit;
    let order = `ORDER BY "Twits"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

    const twits = await dbRequestTwitsForAuthUser(decodeUser, request, order);

    const presenter = new TwitsPresenter(twits);

    return response.json(presenter.toJSON());
  }

  async getFavoriteTwitByUser(request, response, next) {
    try {
      const Op = Sequelize.Op;

      const { userId } = request.params;
      let { limit, list } = request.query;

      limit = limit || 7;
      list = list || 1;
      let offset = list * limit - limit;

      checkUsersAuth(request, userId, next);

      const params = `WHERE "favorite_twits"."userId" = ${userId} ORDER BY "Twits"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

      const favoriteTwits = await dbRequestTwitsForAuthUser(
        decodeUser,
        request,
        params
      );

      const presenter = new TwitsPresenter(favoriteTwits);

      return response.json(presenter.toJSON());
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async getCommentsByUser(request, response, next) {
    try {
      const { userId } = request.params;
      let { limit, list } = request.query;

      limit = limit || 4;
      list = list || 1;
      let offset = list * limit - limit;

      const coments = await Comments.findAll({
        where: { userId: userId },
        include: [
          {
            model: Twits,
            include: [
              { model: User, as: "user" },
              { model: User, as: "twit_user" },
            ],
          },
          {
            model: User,
            as: "user",
          },
        ],
        limit: limit,
        offset: offset,
      });

      return response.json(coments);
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async deleteTwit(request, response, next) {
    try {
      const twitId = request.params.twitId;
      const twit = await Twits.findOne({
        where: { id: twitId },
      });

      if (twit) {
        await Twits.destroy({
          where: { id: twitId },
        });

        await Likes.destroy({ where: { twitId: twitId } });

        await Comments.destroy({ where: { twitId: twitId } });

        await Favorite_twits.destroy({ where: { twitId: twitId } });

        return response.json(twit);
      }
    } catch (error) {
      next(ApiError.badRequest("Check twit.id"));
    }
  }

  async getUserTwitsWithMedia(request, response, next) {
    try {
      const Op = Sequelize.Op;
      const { userId } = request.params;

      let { limit, list } = request.query;
      limit = limit || 4;
      list = list || 1;
      let offset = list * limit - limit;

      const params = `WHERE "Twits"."userId" = ${userId} AND "Twits"."img" IS NOT NULL ORDER BY "Twits"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

      const twits = await dbRequestTwitsForAuthUser(
        decodeUser,
        request,
        params
      );

      const presenter = new TwitsPresenter(twits);

      return response.json(presenter.toJSON());
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async getTwitsWithUserLikes(request, response, next) {
    try {
      const Op = Sequelize.Op;
      const user = decodeUser(request);
      const userIdToken = user.id;

      const { userId } = request.params;
      let { limit, list } = request.query;

      limit = limit || 7;
      list = list || 1;
      let offset = list * limit - limit;

      const twitsWithLikes = await sequelize.query(
        `SELECT "Likes"."id", "Likes"."like", "Likes"."userId", "Likes"."twitId", "Likes"."createdAt", "Likes"."updatedAt", "twit"."id" AS "twit.id", "twit"."text" AS "twit.text", "twit"."img" AS "twit.img", "twit"."userId" AS "twit.userId", "twit"."retwit" AS "twit.retwit", "twit"."twitId" AS "twit.twitId", "twit"."twitUserId" AS "twit.twitUserId", "twit"."countRetwits" AS "twit.countRetwits", "twit"."countLikes" AS "twit.countLikes", "twit"."countComments" AS "twit.countComments", "twit->user"."id" AS "twit.user.id", "twit->user"."user_name" AS "twit.user.user_name", "twit->user"."email"
      AS "twit.user.email", "twit->user"."password" AS "twit.user.password", "twit->user"."birthdate" AS "twit.user.birthdate", "twit->user"."web_site_url" AS "twit.user.web_site_url", "twit->user"."about" AS "twit.user.about", "twit->user"."photo" AS "twit.user.photo", "twit->user"."background" AS "twit.user.background", "twit->twit_user"."id" AS "twit.twit_user.id", "twit->twit_user"."user_name" AS "twit.twit_user.user_name", "twit->twit_user"."email" AS "twit.twit_user.email", "twit->twit_user"."password" AS "twit.twit_user.password", "twit->twit_user"."birthdate" AS "twit.twit_user.birthdate", "twit->twit_user"."web_site_url" AS "twit.twit_user.web_site_url", "twit->twit_user"."about" AS "twit.twit_user.about", "twit->twit_user"."photo" AS "twit.twit_user.photo", "twit->twit_user"."background" AS "twit.twit_user.background", "twit->retwits"."id" AS "twit.retwits.id", "twit->retwits"."text" AS "twit.retwits.text", "twit->retwits"."img" AS "twit.retwits.img", "twit->retwits"."userId" AS "twit.retwits.userId", "twit->retwits"."retwit" AS "twit.retwits.retwit", "twit->retwits"."twitId" AS "twit.retwits.twitId", "twit->retwits"."twitUserId" AS "twit.retwits.twitUserId", "twit->retwits"."countRetwits" AS "twit.retwits.countRetwits", "twit->retwits"."countLikes" AS "twit.retwits.countLikes", "twit->retwits"."countComments" AS "twit.retwits.countComments", "twit->likes"."id" AS "twit.likes.id", "twit->likes"."like" AS "twit.likes.like", "twit->likes"."userId" AS "twit.likes.userId", "twit->likes"."twitId" AS "twit.likes.twitId", "twit->favorite_twits"."id" AS "twit.favorite_twits.id", "twit->favorite_twits"."bookmark" AS "twit.favorite_twits.bookmark", "twit->favorite_twits"."userId" AS "twit.favorite_twits.userId", "twit->favorite_twits"."twitId" AS "twit.favorite_twits.twitId"
      FROM "Likes" AS "Likes"
      LEFT OUTER JOIN "Twits" AS "twit" ON "Likes"."twitId" = "twit"."id"
      LEFT OUTER JOIN "Users" AS "twit->user" ON "twit"."userId" = "twit->user"."id"
      LEFT OUTER JOIN "Users" AS "twit->twit_user" ON "twit"."twitUserId" = "twit->twit_user"."id"
      LEFT OUTER JOIN "Twits" AS "twit->retwits" ON ("twit"."id" = "twit->retwits"."twitId" and "twit->retwits"."userId" = ${userIdToken})
      LEFT OUTER JOIN "Likes" AS "twit->likes" ON ("twit"."id" = "twit->likes"."twitId" and "twit->likes"."userId" = ${userIdToken} )
      LEFT OUTER JOIN "Favorite_twits" AS "twit->favorite_twits" ON ("twit"."id" = "twit->favorite_twits"."twitId" and "twit->favorite_twits"."userId" = ${userIdToken})
      Where "Likes"."userId" = ${userId}
      ORDER BY "Likes"."id" DESC LIMIT 7 OFFSET 0`,
        {
          type: QueryTypes.SELECT,
          nest: true,
        }
      );

      const presenter = new TwitsWithUserLikesPresenter(twitsWithLikes);

      return response.json(presenter.toJSON());
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }
}

module.exports = new TwitsController();
