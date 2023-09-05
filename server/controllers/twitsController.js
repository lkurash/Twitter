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

      const twits = await Twits.findAll({
        where: {
          [Op.or]: {
            "$likes.userId$": { [Op.or]: [userId, null] },
            "$favorite_twits.userId$": { [Op.or]: [userId, null] },
            "$retwits.userId$": { [Op.or]: [userId, null] },
          },
        },
        where: { userId: userId },

        include: [
          { model: User, as: "user" },
          { model: User, as: "twit_user" },
          { model: Likes, as: "likes" },
          { model: Favorite_twits, as: "favorite_twits" },
          { model: Twits, as: "retwits" },
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

  async getTwitsByFollowingUsers(request, response, next) {
    try {
      const Op = Sequelize.Op;
      const { userId } = request.params;
      let { limit, list } = request.query;
      limit = limit || 7;
      list = list || 1;
      let offset = list * limit - limit;

      const twits = await Twits.findAll({
        where: {
          [Op.or]: {
            "$likes.userId$": { [Op.or]: [userId, null] },
            "$favorite_twits.userId$": { [Op.or]: [userId, null] },
            "$retwits.userId$": { [Op.or]: [userId, null] },
          },
        },
        where: {
          [Op.or]: {
            "$user.followings_user.userId$": userId,
            "$user.id$": userId,
          },
        },

        include: [
          { model: Likes, as: "likes" },
          {
            model: User,
            as: "user",
            include: { model: Following, as: "followings_user" },
          },
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

      // const followingUserId = await Following.findAll({
      //   attributes: ["followUserId"],
      //   where: { userId: userId },
      //   raw: true,
      // });

      // const ids = [userId];

      // if (followingUserId) {
      //   followingUserId.map((item) => {
      //     return ids.push(item.followUserId);
      //   });
      // }

      // const twits = await Twits.findAll({
      //   order: [["id", "DESC"]],
      //   where: { userId: { [Op.in]: ids } },
      //   include: [
      //     { model: User, as: "user" },
      //     { model: User, as: "twit_user" },
      //     { model: Likes, as: "likes" },
      //     { model: Favorite_twits, as: "favorite_twits" },
      //     { model: Comments },
      //   ],
      //   limit: limit,
      //   offset: offset,
      // });

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
    });

    return response.json(twits);
  }

  async getTwitsForAuthUser(request, response, next) {
    const Op = Sequelize.Op;
    const { userId } = request.params;

    let { limit, list } = request.query;

    limit = limit || 7;
    list = list || 1;
    let offset = list * limit - limit;

    const twits = await Twits.findAll({
      where: {
        [Op.or]: {
          "$likes.userId$": { [Op.or]: [userId, null] },
          "$favorite_twits.userId$": { [Op.or]: [userId, null] },
          "$retwits.userId$": { [Op.or]: [userId, null] },
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

    return response.json(twits);
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

      const favoriteTwits = await Twits.findAll({
        where: {
          [Op.and]: {
            "$likes.userId$": { [Op.or]: [userId, null] },
            "$favorite_twits.userId$": userId,
            "$retwits.userId$": { [Op.or]: [userId, null] },
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

      return response.json(favoriteTwits);
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
