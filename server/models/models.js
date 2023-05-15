const sequelize = require("../dataBase");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthdate: {
    type: DataTypes.STRING,
  },
  web_site_url: {
    type: DataTypes.STRING,
  },
  about: {
    type: DataTypes.STRING,
  },
  photo: {
    type: DataTypes.STRING,
  },
  background: {
    type: DataTypes.STRING,
  },
  admin: {
    type: DataTypes.STRING,
    defaultValue: "User",
  },
});

const Likes = sequelize.define("likes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  like: {
    type: DataTypes.BOOLEAN,
  },
});

const Topics = sequelize.define("topics", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  trend: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  count_twits: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
  },
});

const Topics_info = sequelize.define("topics_info", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  img: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
  },
});

const Twits = sequelize.define("twits", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.STRING,
  },
  img: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
  },
});

const Favorite_twits = sequelize.define("favorite_twits", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bookmark: {
    type: DataTypes.BOOLEAN,
  },
});

const Retwit = sequelize.define("retwit", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  retwit: {
    type: DataTypes.BOOLEAN,
  },
});

const Following = sequelize.define("following", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  followUserId: {
    type: DataTypes.INTEGER,
  },
});

const Comments = sequelize.define("comments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.STRING,
  },
});

User.hasMany(Likes);
Likes.belongsTo(User);

User.hasMany(Twits);
Twits.belongsTo(User);

User.hasMany(Favorite_twits);
Favorite_twits.belongsTo(User);

Twits.hasMany(Favorite_twits);
Favorite_twits.belongsTo(Twits);

Twits.belongsTo(User, { as: "User", foreignKey: "userId" });

User.hasMany(Retwit);
Retwit.belongsTo(User);

User.hasMany(Following);
Following.belongsTo(User);
Following.belongsTo(User, { as: "User", foreignKey: "followUserId" });

User.hasMany(Comments);
Comments.belongsTo(User);

Twits.hasMany(Likes);
Likes.belongsTo(Twits);

Twits.hasMany(Comments);
Comments.belongsTo(Twits);

Twits.hasMany(Retwit);
Retwit.belongsTo(Twits);

Topics.hasMany(Topics_info, { as: "info" });
// Topics_info.belongsTo(Topics);

module.exports = {
  User,
  Twits,
  Likes,
  Favorite_twits,
  Retwit,
  Comments,
  Topics,
  Topics_info,
  Following,
};
