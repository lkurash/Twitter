const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const uuid = require("uuid");
const path = require("path");
const Op = Sequelize.Op;
const { QueryTypes } = require("sequelize");

const ApiError = require("../error/ApiError");
const db = require("../models");

const sqlRequestFollowers = require("../sql/sqlRequestFollowers");
const sqlRequestFollowings = require("../sql/sqlRequestFollowings");

const helpers = require("./helpers");

const UserPresenter = require("../presenters/userPresenter");
const FollowersUserPresenter = require("../presenters/followersUserPresenter");
const FollowingsUserPresenter = require("../presenters/followingsUserPresenter");
const dbRequestUser = require("./dbRequestUser");

class UserDecorator {
  async register(request, response, next) {
    try {
      const { name, email, password, role, birthdate } = request.body;

      const user = await dbRequestUser.createUser(
        name,
        email,
        password,
        role,
        birthdate,
        next
      );

      const token = helpers.genereteAccessToken(
        user.id,
        user.email,
        user.password,
        user.role
      );

      return response.json({ token, user });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async authentication(request, response, next) {
    try {
      const { email, password } = request.body;

      const user = await dbRequestUser.userAuthentication(
        email,
        password,
        next
      );

      const token = helpers.genereteAccessToken(user.id, user.email);

      console.log(user);

      return response.json({ token, user });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async createRefreshToken(request, response, next) {
    try {
      const token = helpers.genereteRefreshToken(request.user.email);

      response.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return response.json({ token });
    } catch (error) {
      next(ApiError.badRequest("Check auth"));
    }
  }

  async newUserProfile(request, response, next) {
    const { name, birthdate, web_site_url, about } = request.body;

    const { userId } = request.params;

    const user = helpers.decodeUser(request);
    const tokenUserId = user.id;

    const file = request.files;

    helpers.checkUsersAuth(request, userId, next);

    const updateUserProfile = await dbRequestUser.updateUserProfile(
      name,
      birthdate,
      web_site_url,
      about,
      file,
      userId
    );

    const presenter = new UserPresenter(updateUserProfile);

    return response.json(presenter.toJSON());
  }

  async allUsers(request, response, next) {
    try {
      let { limit } = request.query;
      limit = limit || 5;

      const users = await dbRequestUser.getAllUser({
        limit: limit,
      });

      return response.json(users);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async searchUsers(request, response, next) {
    const { name } = request.params;

    const users = await dbRequestUser.getAllUser({
      where: {
        user_name: { [Op.substring]: name },
      },
    });

    return response.json(users);
  }

  async userProfile(request, response, next) {
    try {
      const { userId } = request.params;

      if (userId) {
        const user = await dbRequestUser.getProfile(userId);

        const presenter = new UserPresenter(user);

        return response.json(presenter.toJSON());
      }
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async newFollowing(request, response, next) {
    try {
      const { userId } = request.params;
      const { followUserId } = request.body;

      helpers.checkUsersAuth(request, userId, next);

      const followings = await dbRequestUser.createFollowing(
        userId,
        followUserId,
        next
      );

      return response.json(followings.followUserId);
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async deletedFollowing(request, response, next) {
    try {
      const { userId } = request.params;
      const followUserId = request.params.unfollowedId;

      helpers.checkUsersAuth(request, userId, next);

      const following = await dbRequestUser.deleteFollowing(
        userId,
        followUserId,
        next
      );

      return response.json(following.followUserId);
    } catch (error) {
      next(ApiError.badRequest("Check followUserId"));
    }
  }

  async userFollowings(request, response, next) {
    try {
      const { userId } = request.params;
      const user = helpers.decodeUser(request);

      const users = await sqlRequestFollowings(helpers.decodeUser, request);

      let presenter = new FollowingsUserPresenter(users);
      return response.json(presenter.toJSON(users));
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async userFollowers(request, response, next) {
    try {
      const { userId } = request.params;
      const user = helpers.decodeUser(request);

      const users = await sqlRequestFollowers(helpers.decodeUser, request);
      let presenter = new FollowersUserPresenter(users);

      return response.json(presenter.toJSON(users));
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async previewProfile(request, response, next) {
    try {
      const { userId } = request.params;
      const { authUserId } = request.query;

      const previewProfile = await dbRequestUser.getPreviewProfile(
        userId,
        authUserId
      );

      return response.json(previewProfile);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async whoNotReadingUsers(request, response, next) {
    try {
      const { userId } = request.params;
      let { limit } = request.query;
      limit = limit || 5;

      const followingUserIds = await dbRequestUser.getFollowingUserIds(userId);

      const ids = [+userId];

      if (followingUserIds) {
        followingUserIds.map((item) => {
          return ids.push(item.followUserId);
        });
      }

      const whoNotReadingList = await dbRequestUser.getAllUser({
        where: { id: { [Op.notIn]: ids } },
        include: [
          {
            model: db.Following,
            as: "followings_user",
          },
        ],
        limit: limit,
      });

      return response.json(whoNotReadingList);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new UserDecorator();
