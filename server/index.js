const express = require('express');

const sequelize = require('./dataBase');

// const user = require("./models/user");
// const twits = require("./models/twits");
// const following = require("./models/following");
// const likes = require("./models/likes");
// const favorite_twits = require("./models/favorite_twits");
// const retwit = require("./models/retwit");
// const comments = require("./models/topics");
const {Topics} = require("./models/comments");
const models = require('./models/index');

const cors = require('cors');

const router = require('./routers/index');
const middleware = require('./middleware/errorMiddleware');

const fileupload = require('express-fileupload');
const path = require('path');

const PORT = 5500;
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileupload({}));
app.use('/api',router);

app.use(middleware);



const start = async()=>{
  try {
    await sequelize.authenticate();

    app.listen(PORT, ()=> console.log('WORKING'));

  } catch (error) {
    console.log(error);
  }
};

start();
