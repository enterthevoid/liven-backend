const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const worksRoutes = require("./api/routes/works");
const usersRoutes = require("./api/routes/users");

mongoose.connect(
  "mongodb+srv://dbUser:" +
    process.env.MONGO_ATLAS_PW +
    "@liven.ah4jh.mongodb.net/db?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);
mongoose.Promise = global.Promise;

// Apply middlewares
app.use(morgan("dev"));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS handling
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT , POST, PATCH, DELETE");
    return res.status(200).json({});
  }

  next();
});

// Routes whitch should handle requests
app.use("/works", worksRoutes);
app.use("/user", usersRoutes);

// Handling errors
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
