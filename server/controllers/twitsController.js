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
const models = require("../models/index");
const ApiError = require("../error/ApiError");
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

const dbRequestTwitsForAuthUser = async (request, anyParams) => {
  const { userId } = request.params;
  const user = decodeUser(request);
  const userIdToken = user.id;

  const twits = await sequelize.query(
    `SELECT "Twits"."id", "Twits"."text", "Twits"."img", "Twits"."userId", "Twits"."retwit", "Twits"."twitId", "Twits"."twitUserId", "Twits"."countRetwits", "Twits"."countLikes", "Twits"."countComments", "Twits"."createdAt", "Twits"."updatedAt", "likes"."id" AS "likes.id", "likes"."like" AS "likes.like", "likes"."userId" AS "likes.userId", "likes"."twitId" AS "likes.twitId", "likes"."createdAt" AS "likes.createdAt", "likes"."updatedAt" AS "likes.updatedAt", "user"."id" AS "user.id", "user"."user_name" AS "user.user_name", "user"."email" AS "user.email", "user"."password" AS "user.password", "user"."birthdate" AS "user.birthdate", "user"."web_site_url" AS "user.web_site_url", "user"."about" AS "user.about", "user"."photo" AS "user.photo", "user"."background" AS "user.background", "user"."createdAt" AS "user.createdAt", "user"."updatedAt" AS "user.updatedAt", "retwits"."id" AS "retwits.id", "retwits"."text" AS "retwits.text", "retwits"."img" AS "retwits.img", "retwits"."userId" AS "retwits.userId", "retwits"."retwit" AS "retwits.retwit", "retwits"."twitId" AS "retwits.twitId", "retwits"."twitUserId" AS "retwits.twitUserId", "retwits"."countRetwits" AS "retwits.countRetwits", "retwits"."countLikes" AS "retwits.countLikes", "retwits"."countComments" AS "retwits.countComments", "retwits"."createdAt" AS "retwits.createdAt", "retwits"."updatedAt" AS "retwits.updatedAt", "twit_user"."id" AS "twit_user.id", "twit_user"."user_name" AS "twit_user.user_name", "twit_user"."email" AS "twit_user.email", "twit_user"."password" AS "twit_user.password", "twit_user"."birthdate" AS "twit_user.birthdate", "twit_user"."web_site_url" AS "twit_user.web_site_url", "twit_user"."about" AS "twit_user.about", "twit_user"."photo" AS "twit_user.photo", "twit_user"."background" AS "twit_user.background", "twit_user"."createdAt" AS "twit_user.createdAt", "twit_user"."updatedAt" AS "twit_user.updatedAt", "favorite_twits"."id" AS "favorite_twits.id", "favorite_twits"."bookmark" AS "favorite_twits.bookmark", "favorite_twits"."userId" AS "favorite_twits.userId", "favorite_twits"."twitId" AS "favorite_twits.twitId", "favorite_twits"."createdAt" AS "favorite_twits.createdAt", "favorite_twits"."updatedAt" AS "favorite_twits.updatedAt"
    FROM "Twits" AS "Twits"
      LEFT OUTER JOIN "Likes" AS "likes" ON ("Twits"."id" = "likes"."twitId" and "likes"."userId" = ${userIdToken} )
      LEFT OUTER JOIN "Users" AS "user" ON "Twits"."userId" = "user"."id"
      LEFT OUTER JOIN "Twits" AS "retwits" ON ("Twits"."id" = "retwits"."twitId" and "retwits"."userId" = ${userIdToken})
      LEFT OUTER JOIN "Users" AS "twit_user" ON "Twits"."twitUserId" = "twit_user"."id"
      LEFT OUTER JOIN "Favorite_twits" AS "favorite_twits" ON ("Twits"."id" = "favorite_twits"."twitId" and "favorite_twits"."userId" = ${userIdToken})
      ${anyParams}`,
    {
      type: QueryTypes.SELECT,
      nest: true,
    }
  );
  return twits;
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
          include: [
            { model: User, as: "user" },
            { model: User, as: "twit_user" },
            { model: Likes, as: "likes" },
            { model: Favorite_twits, as: "favorite_twits" },
            { model: Twits, as: "retwits" },
            { model: Comments },
          ],
          where: { id: newTwit.id },
        });

        return response.json([twit]);
      } else {
        const newTwit = await Twits.create({ text, userId });

        const twit = await Twits.findOne({
          include: [
            { model: User, as: "user" },
            { model: User, as: "twit_user" },
            { model: Likes, as: "likes" },
            { model: Favorite_twits, as: "favorite_twits" },
            { model: Twits, as: "retwits" },
            { model: Comments },
          ],
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

      const twits = await dbRequestTwitsForAuthUser(request, params);

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
      AS "likes.userId", "likes"."twitId" AS "likes.twitId", "likes"."createdAt" AS "likes.createdAt", "likes"."updatedAt" AS "likes.updatedAt", "user"."id"
      AS "user.id", "user"."user_name" AS "user.user_name", "user"."email" AS "user.email", "user"."password" AS "user.password", "user"."birthdate" AS "user.birthdate", "user"."web_site_url" AS "user.web_site_url", "user"."about" AS "user.about", "user"."photo" AS "user.photo", "user"."background" AS "user.background", "user"."createdAt" AS "user.createdAt", "user"."updatedAt" AS "user.updatedAt", "user->followings_user"."id" AS "user.followings_user.id", "user->followings_user"."followUserId" AS "user.followings_user.followUserId", "user->followings_user"."userId" AS "user.followings_user.userId", "user->followings_user"."createdAt" AS "user.followings_user.createdAt", "user->followings_user"."updatedAt" AS "user.followings_user.updatedAt", "retwits"."id" AS "retwits.id", "retwits"."text" AS "retwits.text", "retwits"."img" AS "retwits.img", "retwits"."userId" AS "retwits.userId", "retwits"."retwit" AS "retwits.retwit", "retwits"."twitId" AS "retwits.twitId", "retwits"."twitUserId" AS "retwits.twitUserId", "retwits"."countRetwits" AS "retwits.countRetwits", "retwits"."countLikes" AS "retwits.countLikes", "retwits"."countComments" AS "retwits.countComments", "retwits"."createdAt" AS "retwits.createdAt", "retwits"."updatedAt" AS "retwits.updatedAt", "twit_user"."id" AS "twit_user.id", "twit_user"."user_name" AS "twit_user.user_name", "twit_user"."email" AS "twit_user.email", "twit_user"."password" AS "twit_user.password", "twit_user"."birthdate" AS "twit_user.birthdate", "twit_user"."web_site_url" AS "twit_user.web_site_url", "twit_user"."about" AS "twit_user.about", "twit_user"."photo" AS "twit_user.photo", "twit_user"."background" AS "twit_user.background", "twit_user"."createdAt" AS "twit_user.createdAt", "twit_user"."updatedAt" AS "twit_user.updatedAt", "favorite_twits"."id" AS "favorite_twits.id", "favorite_twits"."bookmark" AS "favorite_twits.bookmark", "favorite_twits"."userId" AS "favorite_twits.userId", "favorite_twits"."twitId" AS "favorite_twits.twitId", "favorite_twits"."createdAt" AS "favorite_twits.createdAt", "favorite_twits"."updatedAt" AS "favorite_twits.updatedAt"
      FROM "Twits" AS "Twits"
      LEFT OUTER JOIN "Likes" AS "likes" ON ("Twits"."id" = "likes"."twitId" and "likes"."userId" = 1 )
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

    const twits = await dbRequestTwitsForAuthUser(request, order);

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

      const favoriteTwits = await dbRequestTwitsForAuthUser(request, params);

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
              { model: Likes, as: "likes" },
              { model: Favorite_twits, as: "favorite_twits" },
              { model: Comments },
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

  async getUserRetwits(request, response, next) {
    const { userId } = request.params;

    const retwitsId = await Twits.findAll({
      attributes: ["twitId"],
      where: { userId: userId, retwit: true },
      raw: true,
    });

    const ids = [];

    if (retwitsId) {
      retwitsId.map((item) => {
        return ids.push(item.twitId);
      });
    }
    return response.json(ids);
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

      const twits = await Twits.findAll({
        where: {
          [Op.and]: {
            "$likes.userId$": { [Op.or]: [userId, null] },
            "$favorite_twits.userId$": { [Op.or]: [userId, null] },
            "$retwits.userId$": { [Op.or]: [userId, null] },
          },
        },
        where: { [Op.and]: [{ userId: userId, img: { [Op.ne]: null } }] },
        include: [
          { model: Likes, as: "likes" },
          { model: User, as: "user" },
          { model: Twits, as: "retwits" },
          { model: User, as: "twit_user" },
          { model: Favorite_twits, as: "favorite_twits" },
          { model: Comments },
        ],

        order: [["id", "DESC"]],
        limit: limit,
        offset: offset,
        subQuery: false,
      });

      return response.json(twits);
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

      const twitsWithLikes = await Twits.findAll({
        where: {
          [Op.and]: {
            "$likes.userId$": userId,
            "$favorite_twits.userId$": { [Op.or]: [userIdToken, null] },
            "$retwits.userId$": { [Op.or]: [userIdToken, null] },
          },
        },

        include: [
          { model: Likes, as: "likes" },
          { model: User, as: "user" },
          { model: Twits, as: "retwits" },
          { model: User, as: "twit_user" },
          { model: Favorite_twits, as: "favorite_twits" },
          { model: Comments },
        ],
        order: [["id", "DESC"]],
        limit: limit,
        offset: offset,
        subQuery: false,
      });

      return response.json(twitsWithLikes);
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }
}

module.exports = new TwitsController();
