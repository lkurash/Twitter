const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const uuid = require("uuid");
const path = require("path");

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

class TwitsController {
  async createTwitByUser(request, response, next) {
    try {
      const { text } = request.body;

      const file = request.files;
      const user = decodeUser(request);
      const UserId = user.id;

      if (file) {
        const { img } = request.files;
        let fileName = uuid.v4() + ".jpg";

        img.mv(path.resolve(__dirname, "..", "static", fileName));
        const newTwit = await Twits.create({ text, img: fileName, UserId });

        const twit = await Twits.findOne({
          include: [
            { model: User, as: "user" },
            { model: User, as: "twitUser" },
            { model: Likes },
            { model: Favorite_twits },
            { model: Comments },
          ],
          where: { id: newTwit.id },
        });

        return response.json([twit]);
      } else {
        const newTwit = await Twits.create({ text, UserId });

        const twit = await Twits.findOne({
          include: [
            { model: User, as: "user" },
            { model: User, as: "twitUser" },
            { model: Likes },
            { model: Favorite_twits },
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
      const { userId } = request.params;
      let { limit, list } = request.query;
      limit = limit || 7;
      list = list || 1;
      let offset = list * limit - limit;

      const twits = await Twits.findAll({
        order: [["id", "DESC"]],
        include: [
          { model: User, as: "user" },
          { model: User, as: "twitUser" },
          { model: Likes },
          { model: Favorite_twits },
          { model: Comments },
        ],
        where: { UserId: userId },
        limit: limit,
        offset: offset,
      });

      return response.json(twits);
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

      const followingUserId = await Following.findAll({
        attributes: ["followUserId"],
        where: { UserId: userId },
        raw: true,
      });

      const ids = [userId];

      if (followingUserId) {
        followingUserId.map((item) => {
          return ids.push(item.followUserId);
        });
      }

      const twits = await Twits.findAll({
        order: [["id", "DESC"]],
        where: { UserId: { [Op.in]: ids } },
        include: [
          { model: User, as: "user" },
          { model: User, as: "twitUser" },
          { model: Likes },
          { model: Favorite_twits },
          { model: Comments },
        ],
        limit: limit,
        offset: offset,
      });

      return response.json(twits);
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
        { model: Twits, as: "originalTwit" },
        { model: User, as: "twitUser" },
        { model: Likes },
        { model: Favorite_twits },
        { model: Comments },
      ],
      limit: limit,
      offset: offset,
    });

    return response.json(twits);
  }

  async getTwitsWithUsersLike(request, response, next) {
    const { userId } = request.params;

    const twitIds = await Likes.findAll({
      attributes: ["TwitId"],
      where: { UserId: userId, like: true },
      raw: true,
    });

    const twits = await Likes.findAll({
      where: { UserId: userId, like: true },
      order: [["id", "DESC"]],
      include: [
        {
          model: Twits,
          include: [
            { model: User, as: "user" },
            { model: User, as: "twitUser" },
            { model: Likes },
            { model: Favorite_twits },
            { model: Comments },
          ],
        },
      ],
    });

    const ids = [];

    if (twitIds) {
      twitIds.map((item) => {
        return ids.push(item.TwitId);
      });
    }

    return response.json({ ids, twits });
  }

  async getFavoriteTwitByUser(request, response, next) {
    try {
      const { userId } = request.params;

      checkUsersAuth(request, userId, next);

      const favoriteTwits = await Favorite_twits.findAll({
        where: { UserId: userId },
        include: [
          {
            model: Twits,
            include: [
              { model: User, as: "user" },
              { model: User, as: "twitUser" },
              { model: Likes },
              { model: Favorite_twits },
              { model: Comments },
            ],
          },
        ],
      });

      return response.json(favoriteTwits);
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async createCommentByUser(request, response, next) {
    try {
      const { twitId } = request.params;
      const { userId } = request.params;

      checkUsersAuth(request, userId, next);

      const { text } = request.body;

      if (text) {
        const comment = await Comments.create({
          UserId: userId,
          TwitId: twitId,
          text,
        });

        return response.json(comment);
      }
    } catch (error) {
      next(ApiError.badRequest("Check user.id or twit.id"));
    }
  }

  async getCountComments(request, response, next) {
    try {
      const { twitId } = request.params;

      if (twitId) {
        const count = await Comments.count({
          where: { TwitId: twitId },
        });

        const countComments = await Twits.update(
          {
            countComments: +count,
          },
          {
            where: { id: twitId },
          }
        );

        return response.json(countComments);
      }
    } catch (error) {
      next(ApiError.badRequest("Check twit.id"));
    }
  }

  async getCommentsByUser(request, response, next) {
    try {
      const { userId } = request.params;
      const coments = await Comments.findAll({
        where: { UserId: userId },
        include: [
          {
            model: Twits,
            include: [
              { model: User, as: "user" },
              { model: User, as: "twitUser" },
              { model: Likes },
              { model: Favorite_twits },
              { model: Comments },
            ],
          },
          {
            model: User,
            as: "user",
          },
        ],
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
      where: { UserId: userId, retwit: true },
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

        await Likes.destroy({ where: { TwitId: twitId } });

        await Comments.destroy({ where: { TwitId: twitId } });

        await Favorite_twits.destroy({ where: { TwitId: twitId } });

        return response.json(twit);
      }
    } catch (error) {
      next(ApiError.badRequest("Check twit.id"));
    }
  }
}

module.exports = new TwitsController();
