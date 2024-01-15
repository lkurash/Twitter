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

class DbRequestUser {
  async createUser(name, email, password, role, birthdate, next) {
    if (!email || !password) {
      next(ApiError.badRequest("Email or Password error"));
    }
    const condidat = await db.User.findOne({ where: { email } });

    if (condidat) {
      next(ApiError.badRequest("User with email is registration"));
    }
    const hashpassword = await bcrypt.hash(password, 5);

    const user = await db.User.create({
      user_name: name,
      email,
      password: hashpassword,
      birthdate,
      role,
    });

    return user;
  }

  async userAuthentication(email, password, next) {
    if (!email) {
      throw ApiError.badRequest("Please enter your email");
    }

    if (!password) {
      throw ApiError.badRequest("Please enter your password");
    }

    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      throw ApiError.badRequest("User with this email doesn't exist");
    }
    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      throw ApiError.badRequest("Incorrect password");
    }
    return user;
  }

  async updateUserPhoto(file, userId) {
    let photo = file.photo;
    let fileName = helpers.createFileName(photo);

    const photoUpdate = await db.User.update(
      {
        photo: fileName,
      },
      {
        where: {
          id: userId,
        },
      }
    );
  }

  async updateUserBackground(file, userId) {
    let background = file.background;
    let fileName = helpers.createFileName(background);

    const backgroundUpdate = await db.User.update(
      {
        background: fileName,
      },
      {
        where: {
          id: userId,
        },
      }
    );
  }

  async updateUserName(name, userId) {
    const nameUpdate = await db.User.update(
      {
        user_name: name,
      },
      {
        where: {
          id: userId,
        },
      }
    );
  }

  async updateUserBirthdate(birthdate, userId) {
    const birthdateUpdate = await db.User.update(
      {
        birthdate: birthdate,
      },
      {
        where: {
          id: userId,
        },
      }
    );
  }

  async updateUserWebSite(web_site_url, userId) {
    const webSiteUpdate = await db.User.update(
      {
        web_site_url: web_site_url,
      },
      {
        where: {
          id: userId,
        },
      }
    );
  }
  async updateUserAbout(about, userId) {
    const aboutUpdate = await db.User.update(
      {
        about: about,
      },
      {
        where: {
          id: userId,
        },
      }
    );
  }

  async updateUserProfile(name, birthdate, web_site_url, about, file, userId) {
    if (file) {
      if (file.photo) {
        await userActions.updateUserPhoto(file, userId);
      }

      if (file.background) {
        await userActions.updateUserBackground(file, userId);
      }
    }

    if (name) {
      await userActions.updateUserName(name, userId);
    }

    if (birthdate) {
      await userActions.updateUserBirthdate(birthdate, userId);
    }

    if (web_site_url || web_site_url === "") {
      await userActions.updateUserWebSite(web_site_url, userId);
    }
    if (about || about === "") {
      await userActions.updateUserAbout(about, userId);
    }

    const updateUserProfile = await db.User.findOne({
      where: { id: userId },
      include: [
        {
          model: db.Following,
          as: "followings_user",
        },
        {
          model: db.Following,
          as: "followers_user",
        },
      ],
    });
    return updateUserProfile;
  }

  async getAllUser(params) {
    const users = await db.User.findAll(params);
    return users;
  }

  async getProfile(userId) {
    const user = await db.User.findOne({
      where: { id: userId },
      include: [
        {
          model: db.Following,
          as: "followings_user",
        },
        {
          model: db.Following,
          as: "followers_user",
        },
      ],
    });
    return user;
  }

  async createFollowing(userId, followUserId, next) {
    const followings = await db.Following.findOne({
      where: { userId: userId, followUserId: followUserId },
    });

    if (followings) {
      next(ApiError.badRequest("The following already exists."));
    }

    if (!followings) {
      const followings = await db.Following.create({
        userId: userId,
        followUserId: followUserId,
      });
      return followings;
    }
  }

  async deleteFollowing(userId, followUserId, next) {
    const following = await db.Following.findOne({
      where: { followUserId: +followUserId, userId: userId },
    });

    if (following) {
      const unFollow = await db.Following.destroy({
        where: { followUserId: +followUserId, userId: userId },
      });
    }
    return following;
  }

  async checkFollowing(userId, authUserId) {
    let following = false;
    if (authUserId) {
      following = await db.Following.findOne({
        where: { followUserId: +userId, userId: authUserId },
      });
      following = following ? true : false;
    }

    return following ? true : false;
  }

  async getPreviewProfile(userId, authUserId) {
    const followingsUsers = await db.Following.count({
      where: { userId: +userId },
    });

    const followersUsers = await db.Following.count({
      where: { followUserId: +userId },
    });

    return {
      id: +userId,
      following: await userActions.checkFollowing(userId, authUserId),
      followersUsers,
      followingsUsers,
    };
  }

  async getFollowingUserIds(userId) {
    const followingUserIds = await db.Following.findAll({
      attributes: ["followUserId"],
      where: { userId: userId },
      raw: true,
    });
    return followingUserIds;
  }
}

const userActions = new DbRequestUser();

module.exports = new DbRequestUser();
