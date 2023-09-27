const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const uuid = require("uuid");
const path = require("path");

const { QueryTypes } = require("sequelize");

const db = require("../models/index.js");

const TwitsPresenter = require("../presenters/twitsPresenter");
const CommentsPresenter = require("../presenters/commentsPresenter");
const TwitsWithUserLikesPresenter = require("../presenters/twitsWithUserLikesPresenter");
const models = require("../models/index");
const ApiError = require("../error/ApiError");
const dbRequestTwitsForAuthUser = require("../sql/dbRequestTwitsForAuthUser ");
const TwitsPresenterForPublicPage = require("../presenters/twitsPresenterForPublicPage");
const dbRequestTwitsWithUserLikes = require("../sql/dbRequestTwitsWithUserLikes.js");
const dbRequestTwitsByFollowingUsers = require("../sql/dbRequestTwitsByFollowingUsers.js");

const trendsController = require("../controllers/trendsController");

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
  async createTwitByUser(text, file, userId, request, response) {
    try {
    if (file) {
      const { imgs } = request.files;
      let twitImgs = [];

      if (Array.isArray(imgs)) {
        imgs.forEach((twitImg) => {
          let fileName = uuid.v4() + ".jpg";
          twitImg.mv(path.resolve(__dirname, "..", "static", fileName));
          twitImgs.push(fileName);
        });
      } else {
        let fileName = uuid.v4() + ".jpg";
        imgs.mv(path.resolve(__dirname, "..", "static", fileName));
        twitImgs.push(fileName);
      }

      const newTwit = await Twits.create({
        text,
        img: twitImgs.toString(),
        userId,
      });

      const twit = await Twits.findOne({
        include: [{ model: User, as: "user" }],
        where: { id: newTwit.id },
      });

      const presenter = new TwitsPresenter([twit]);

      return presenter.toJSON();
    } else {
      const newTwit = await Twits.create({ text, userId });

      const twit = await Twits.findOne({
        include: [{ model: User, as: "user" }],
        where: { id: newTwit.id },
      });

      const presenter = new TwitsPresenter([twit]);

      return presenter.toJSON();
    }
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async createTwitAndTrends(request, response, next) {
    const { text } = request.body;

    const file = request.files;
    const user = decodeUser(request);
    const userId = user.id;

    const twit = await twitsController.createTwitByUser(
      text,
      file,
      userId,
      request,
      response,
      next
    );
    const trend = await trendsController.createTrends(text, response, next);

    return response.json({ twit, trend });
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

  async getPublicTwitsByUser(request, response, next) {
    try {
      const Op = Sequelize.Op;
      const { userId } = request.params;

      let { limit, list } = request.query;
      limit = limit || 7;
      list = list || 1;
      let offset = list * limit - limit;

      const twits = await Twits.findAll({
        order: [["id", "DESC"]],
        where: { userId: userId },
        include: [
          { model: User, as: "user" },
          { model: User, as: "twit_user" },
        ],
        limit: limit,
        offset: offset,
      });

      const presenter = new TwitsPresenterForPublicPage(twits);

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

      const params = `DESC LIMIT ${limit} OFFSET ${offset}`;

      const twits = await dbRequestTwitsByFollowingUsers(
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

  async gelAllTwits(request, response) {
    let { limit, list } = request.query;

    limit = limit || 7;
    list = list || 1;
    let offset = list * limit - limit;

    const twits = await Twits.findAll({
      order: [["id", "DESC"]],
      include: [
        { model: User, as: "user" },
        { model: User, as: "twit_user" },
      ],
      limit: limit,
      offset: offset,
    });

    const presenter = new TwitsPresenterForPublicPage(twits);

    return response.json(presenter.toJSON());
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

      limit = limit || 7;
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

      const presenter = new CommentsPresenter(coments);

      return response.json(presenter.toJSON());

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
      limit = limit || 7;
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

      const params = `ORDER BY "Likes"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

      const twitsWithLikes = await dbRequestTwitsWithUserLikes(
        decodeUser,
        request,
        params
      );

      const presenter = new TwitsWithUserLikesPresenter(twitsWithLikes);

      return response.json(presenter.toJSON());
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }
}

const twitsController = new TwitsController();

module.exports = new TwitsController();
