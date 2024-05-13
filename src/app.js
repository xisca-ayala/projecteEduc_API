const express = require("express");
const cors = require("cors");
const errorHandling = require("./error/errorHandling");
const userRouters = require("./routers/user.routers");
const bookRouters = require("./routers/book.router");

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(userRouters);
app.use(bookRouters);
app.use(errorHandling);

module.exports = app; 