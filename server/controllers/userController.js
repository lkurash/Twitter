const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");
const SECRET_KEY = "super_secret_key22";
const uuid = require("uuid");
const path = require("path");
const { profile } = require("console");
const { where } = require("sequelize");
const models = require("../models/index");
const Twits = models.Twits;
const User = models.User;
const Likes = models.Likes;
const Comments = models.Comments;
const Favorite_twits = models.Favorite_twits;
const Following = models.Following;

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, SECRET_KEY, { expiresIn: "24h" });
};

const decodeUser = (request) => {
  const token = request.headers.authorization.split(" ")[1];
  const decodeUser = jwt.decode(token);

  return decodeUser;
};

class UserController {
  async register(request, response, next) {
    try {
      const { name, email, password, role, birthdate } = request.body;

      if (!email || !password) {
        next(ApiError.badRequest("Email or Password error"));
      }
      const condidat = await User.findOne({ where: { email } });

      if (condidat) {
        next(ApiError.badRequest("User with email is registration"));
      }
      const hashpassword = await bcrypt.hash(password, 5);

      const user = await User.create({
        user_name: name,
        email,
        password: hashpassword,
        birthdate,
        role,
      });
      const token = generateJwt(user.id, user.email, user.role);

      return response.json({ token, user });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async authentication(request, response, next) {
    try {
      const { email, password } = request.body;

      if (!email || !password) {
        next(ApiError.badRequest("Email or Password error"));
      }
      const user = await User.findOne({ where: { email } });

      if (!user) {
        next(ApiError.badRequest("User with email is not registration"));
      }
      const comparePassword = bcrypt.compareSync(password, user.password);

      if (!comparePassword) {
        next(ApiError.badRequest("Incorrect password"));
      }
      const token = generateJwt(user.id, user.email, user.role);

      return response.json({ token, user });
    } catch (error) {
      next(ApiError.internal(error));
    }
  }

  async checkToken(request, response, next) {
    try {
      const token = generateJwt(
        request.user.id,
        request.user.email,
        request.user.role
      );

      return response.json({ token });
    } catch (error) {
      next(ApiError.badRequest("Check auth"));
    }
  }

  async updateUserProfile(request, response, next) {
    const { name, birthdate, web_site_url, about } = request.body;

    const { id } = request.params;

    const user = decodeUser(request);
    const userId = user.id;

    const file = request.files;

    if (userId !== parseInt(id)) {
      next(ApiError.badRequest("Check authentication"));
    }
    if (file) {
      if (file.photo) {
        let { photo } = request.files;
        let fileName = uuid.v4() + ".jpg";

        photo.mv(path.resolve(__dirname, "..", "static", fileName));

        const profileUpdate = await User.update(
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

      if (file.background) {
        let { background } = request.files;
        let fileName = uuid.v4() + ".jpg";

        background.mv(path.resolve(__dirname, "..", "static", fileName));

        const profileUpdate = await User.update(
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
    }

    if (name) {
      const profileUpdate = await User.update(
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
    if (birthdate) {
      const profileUpdate = await User.update(
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
    if (web_site_url) {
      const profileUpdate = await User.update(
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
    if (about) {
      const profileUpdate = await User.update(
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
    const updateUserProfile = await User.findOne({ where: { id: userId } });

    return response.json(updateUserProfile);
  }

  async getAllUsers(request, response, next) {
    const user = await User.findAll({ include: [{ model: Following }] });

    return response.json(user);
  }

  async getUserById(request, response, next) {
    try {
      const { id } = request.params;

      if (id) {
        const user = await User.findOne({
          where: { id },
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
            { model: Following },
          ],
        });

        return response.json(user);
      }
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async createFollowing(request, response, next) {
    try {
      const { id } = request.params;
      const { followUserId } = request.body;

      const user = decodeUser(request);
      const userId = user.id;

      if (userId !== parseInt(id)) {
        next(ApiError.badRequest(`Check authentication ${id}`));
      }
      const followings = await Following.findOne({
        where: { UserId: userId, followUserId: followUserId },
      });

      if (followings) {
        next(ApiError.badRequest("The following already exists."));
      }

      if (!followings) {
        const followings = await Following.create({
          UserId: userId,
          followUserId: followUserId,
        });

        return response.json(followings);
      }
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async deleteFollowing(request, response, next) {
    try {
      const id = request.params.id;
      const followUserId = request.params.unfollowedId;

      const user = decodeUser(request);
      const userId = user.id;

      if (userId !== parseInt(id)) {
        next(ApiError.badRequest(`Check authentication ${id}`));
      }

      const unFollow = await Following.destroy({
        where: { followUserId: +followUserId, UserId: userId },
      });

      return response.json(unFollow);
    } catch (error) {
      next(ApiError.badRequest("Check followUserId"));
    }
  }

  async getFollowingUsers(request, response, next) {
    try {
      const { id } = request.params;
      const followings = await Following.findAll({
        where: { UserId: id },
        include: [
          {
            model: User,
            as: "followUser",
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
          },
        ],
      });

      return response.json(followings);
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async getFollowerUsers(request, response, next) {
    try {
      const { id } = request.params;
      const followings = await Following.findAll({
        where: { followUserId: id },
        include: [{ model: User, as: "User" }],
      });

      return response.json(followings);
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }
}

module.exports = new UserController();
