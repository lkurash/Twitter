const config = {
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "twitter_prodaction_c52d",
    host: process.env.DB_HOST,
    dialect: "postgres",
    ssl: true,
  },
};

module.exports = config;
