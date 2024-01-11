const databaseUserName = process.env.USERNAME;
const databasePassword = process.env.PASSWORD;
const databaseHost = process.env.HOST;

const config = {
  production: {
    username: databaseUserName,
    password: databasePassword,
    database: "twitter_production",
    host: databaseHost,
    dialect: "postgres",
  },
};
module.exports = config;
