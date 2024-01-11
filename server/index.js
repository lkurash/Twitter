const express = require('express');
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();

const cors = require('cors');
const path = require('path');

const middleware = require("./middleware/errorMiddleware");

const models = require("./models/index");
const router = require("./routers/index");

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileupload({}));
app.use('/api',router);

app.use(middleware);



const start = async()=>{
  try {
    app.listen(PORT, ()=> console.log('WORKING'));

  } catch (error) {
    console.log(error);
  }
};

start();
