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
const actionsTwitsController = require("./actionsTwitsController.js");

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
  async createTwitByUser(text, file, userId, request, response, next) {
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
    try {
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
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async createLikeOnTwit(request, response, next) {
    try {
      const { twitId } = request.params;
      const { userId } = request.params;

      checkUsersAuth(request, userId, next);

      const like = await actionsTwitsController.likeTwitByUser(twitId, userId);

      const twitWithLike = await actionsTwitsController.getCountLikes(
        like.twitId,
        userId
      );
      return response.json(twitWithLike);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async deleteLikeOnTwit(request, response, next) {
    try {
      const { twitId } = request.params;
      const { userId } = request.params;

      checkUsersAuth(request, userId, next);

      const disLike = await actionsTwitsController.deleteLike(twitId, userId);

      const dislikedTwit = await actionsTwitsController.getCountLikes(
        disLike.twitId,
        userId
      );

      return response.json(dislikedTwit);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async createAnswer(request, response, next) {
    const { twitId } = request.params;
    const { userId } = request.params;
    const { text } = request.body;

    checkUsersAuth(request, userId, next);

    const answer = await actionsTwitsController.createCommentByUser(
      twitId,
      userId,
      text
    );

    const twitWithAnswer = await actionsTwitsController.getCountComments(
      twitId
    );

    return response.json(twitWithAnswer);
  }

  async createRetwitTweet(request, response, next) {
    const { twitId } = request.params;
    const { userId } = request.params;
    const { twitUserId } = request.body;
    const { text } = request.body;
    const { img } = request.body;

    checkUsersAuth(request, userId, next);

    const retweet = await actionsTwitsController.createRetwitByUser(
      twitId,
      userId,
      twitUserId,
      text,
      img
    );

    const countRetweet = await actionsTwitsController.getCountRetwits(twitId);

    const retwitTweet = await Twits.findOne({
      include: [
        { model: User, as: "user" },
        { model: User, as: "twit_user" },
        { model: Likes, as: "likes" },
        { model: Twits, as: "retwits" },
        { model: Favorite_twits, as: "favorite_twits" },
        { model: Comments },
      ],
      where: { id: retweet.id },
    });

    const presenter = new TwitsPresenter([retwitTweet]);

    return response.json(presenter.toJSON());
  }

  async deleteRetweetTweet(request, response, next) {
    const { retwitId } = request.params;
    const { userId } = request.params;
    checkUsersAuth(request, userId, next);

    const deletedRetwit = await actionsTwitsController.deleteRetwitByUser(
      retwitId,
      userId
    );

    const countRetweet = await actionsTwitsController.getCountRetwits(
      deletedRetwit.twitId
    );

    return response.json({
      tweet: deletedRetwit,
      count: countRetweet.countRetwits,
    });
  }

  async getTwitsByUser(userId, authUserId, limit, offset) {
    const params = `WHERE "Twits"."userId" = ${userId} ORDER BY "Twits"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

    const twits = await dbRequestTwitsForAuthUser(userId, authUserId, params);

    const presenter = new TwitsPresenter(twits);

    return presenter.toJSON();
  }

  async getPublicTwitsByUser(userId, limit, offset) {
    const tweets = await Twits.findAll({
      order: [["id", "DESC"]],
      where: { userId: userId },
      include: [
        { model: User, as: "user" },
        { model: User, as: "twit_user" },
      ],
      limit: limit,
      offset: offset,
    });

    const presenter = new TwitsPresenterForPublicPage(tweets);

    return presenter.toJSON();
  }

  async getTwitsByFollowingUsers(userId, authUserId, limit, offset) {
    const params = `DESC LIMIT ${limit} OFFSET ${offset}`;

    const twits = await dbRequestTwitsByFollowingUsers(
      userId,
      authUserId,
      params
    );

    const presenter = new TwitsPresenter(twits);

    return presenter.toJSON();
  }

  async gelAllTwits(limit, offset) {
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

    return presenter.toJSON();
  }

  async getTwitsForAuthUser(userId, authUserId, limit, offset) {
    let order = `ORDER BY "Twits"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

    const twits = await dbRequestTwitsForAuthUser(userId, authUserId, order);

    const presenter = new TwitsPresenter(twits);

    return presenter.toJSON();
  }

  async getFavoriteTwitByUser(userId, authUserId, limit, offset) {
    const params = `WHERE "favorite_twits"."userId" = ${userId} ORDER BY "Twits"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

    const favoriteTwits = await dbRequestTwitsForAuthUser(
      userId,
      authUserId,
      params
    );

    const presenter = new TwitsPresenter(favoriteTwits);

    return presenter.toJSON();
  }

  async getCommentsByUser(userId, limit, offset) {
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

    return presenter.toJSON();
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

        const countRetweet = await actionsTwitsController.getCountRetwits(
          twitId
        );

        const countLikes = await actionsTwitsController.getCountLikes(twitId);

        const countAnswers = await actionsTwitsController.getCountComments(
          twitId
        );

        const countTrends = await trendsController.getCountTrends(twit.text);

        return response.json(twit);
      }
    } catch (error) {
      next(ApiError.badRequest("Check twit.id"));
    }
  }

  async getUserTwitsWithMedia(userId, authUserId, limit, offset) {
    const params = `WHERE "Twits"."userId" = ${userId} AND "Twits"."img" IS NOT NULL ORDER BY "Twits"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

    const twits = await dbRequestTwitsForAuthUser(userId, authUserId, params);

    const presenter = new TwitsPresenter(twits);

    return presenter.toJSON();
  }

  async getTwitsWithUserLikes(userId, authUserId, limit, offset) {
    const params = `ORDER BY "Likes"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

    const twitsWithLikes = await dbRequestTwitsWithUserLikes(
      userId,
      authUserId,
      params
    );

    const presenter = new TwitsWithUserLikesPresenter(twitsWithLikes);

    return presenter.toJSON();
  }
}

const twitsController = new TwitsController();

module.exports = new TwitsController();
