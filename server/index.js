const express = require('express');

const sequelize = require('./dataBase');

const models = require('./models/models');

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
    await sequelize.sync();

    app.listen(PORT, ()=> console.log('WORKING'));

  } catch (error) {
    console.log(error);
  }
};

start();
