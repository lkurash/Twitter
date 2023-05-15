const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");
const {
  User,
  Twits,
  Likes,
  Favorite_twits,
  Retwit,
  Comments,
  Following,
} = require("../models/models");
const SECRET_KEY = "super_secret_key22";
const uuid = require("uuid");
const path = require("path");
const { profile } = require("console");
const { where } = require("sequelize");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, SECRET_KEY, { expiresIn: "1h" });
};

const decodeUser = (request) => {
  const token = request.headers.authorization.split(" ")[1];
  const decodeUser = jwt.decode(token);

  return decodeUser;
};

class UserController {
  async registration(request, response, next) {
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

      return response.json({ token });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async login(request, response, next) {
    try {
      const { email, password } = request.body;

      if (!email || !password) {
        next(ApiError.badRequest("!!!Email or Password error"));
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

      return response.json({ token });
    } catch (error) {
      next(ApiError.internal(error));
    }
  }

  async checkToken(request, response, next) {
    const token = generateJwt(
      request.user.id,
      request.user.email,
      request.user.role
    );

    return response.json({ token });
  }

  async updateUserProfile(request, response, next) {
    try {
      let { name, birthdate, web_site_url, about } = request.body;

      const user = decodeUser(request);
      const email = user.email;

      const photo = request.files.photo;
      const background = request.files.background;

      if (photo) {
        let { photo } = request.files;
        let fileName = uuid.v4() + ".jpg";

        photo.mv(path.resolve(__dirname, "..", "static", fileName));

        const profileUpdate = await User.update(
          {
            photo: fileName,
          },
          {
            where: {
              email: email,
            },
          }
        );
      }

      if (background) {
        let { background } = request.files;
        let fileName = uuid.v4() + ".jpg";

        background.mv(path.resolve(__dirname, "..", "static", fileName));

        const profileUpdate = await User.update(
          {
            background: fileName,
          },
          {
            where: {
              email: email,
            },
          }
        );
      }

      if (name) {
        const profileUpdate = await User.update(
          {
            user_name: name,
          },
          {
            where: {
              email: email,
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
              email: email,
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
              email: email,
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
              email: email,
            },
          }
        );
      }
      const updateUser = await User.findOne({ where: { email } });

      return response.json(updateUser);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async getUserInfoByEmail(request, response, next) {
    const user = decodeUser(request);
    const email = user.email;

    const userInfo = await User.findOne({
      where: { email },
      include: [
        { model: Following },
        {
          model: Twits,
          include: [
            { model: User, as: "User" },
            { model: Likes },
            { model: Retwit },
            { model: Favorite_twits },
            { model: Comments },
          ],
        },
      ],
    });

    return response.json(userInfo);
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
                { model: User, as: "User" },
                { model: Likes },
                { model: Retwit },
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

  async createFollow(request, response, next) {
    try {
      const user = decodeUser(request);
      const userId = user.id;

      const { followUserId } = request.body;
      const follow = await Following.create({
        userId: followUserId,
        followUserId: userId,
      });

      return response.json(follow);
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async deleteFollow(request, response, next) {
    try {
      const user = decodeUser(request);
      const userId = user.id;

      const { followUserId } = request.body;
      const unFollow = await Following.destroy({
        where: { followUserId: userId, userId: followUserId },
      });

      return response.json(unFollow);
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async getFollowingUser(request, response, next) {
    try {
      const { id } = request.params;
      const following = await Following.findAll({
        where: { followUserId: id },
        include: [
          {
            model: User,
            include: [
              {
                model: Twits,
                include: [
                  { model: User, as: "User" },
                  { model: Likes },
                  { model: Retwit },
                  { model: Favorite_twits },
                  { model: Comments },
                ],
              },
            ],
          },
        ],
      });

      return response.json(following);
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async getFollowersUser(request, response, next) {
    try {
      const { id } = request.params;
      const following = await Following.findAll({
        where: { userId: id },
        include: [{ model: User, as: "User" }],
      });

      return response.json(following);
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }
}

module.exports = new UserController();
