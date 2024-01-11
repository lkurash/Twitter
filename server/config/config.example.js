const databaseUserName = process.env.USERNAME;
const databasePassword = process.env.PASSWORD;
const databaseHost = process.env.HOST;

JSON.stringify({
  production: {
    username: databaseUserName,
    password: databasePassword,
    database: "twitter_production",
    host: databaseHost,
    dialect: "mysql",
  },
});
