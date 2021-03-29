const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../auth/check-auth");

const User = require("../models/user");

router.post("/login", (request, res, next) => {
  User.find({ email: request.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }

      bcrypt.compare(request.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0].id,
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );

          return res.status(202).json({
            message: "Auth successful",
            token: token,
          });
        }
        return res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/signup", (request, res, next) => {
  User.find({ email: request.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "User already exist",
        });
      } else {
        bcrypt.hash(request.body.password, 10, (err, hash) => {
          if (err) {
            console.log("USER INTRO ERR", request.body, err);
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              id: new mongoose.Types.ObjectId(),
              email: request.body.email,
              password: hash,
            });

            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "User created",
                });
              })
              .catch((err) => {
                console.log("USER SAVE ERR", err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    })
    .catch();
});

router.delete("/:userId", checkAuth, (request, res, next) => {
  User.remove({ id: request.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/", checkAuth, (req, res, next) => {
  User.find()
    .select("id email")
    .exec()
    .then((docs) => {
      const responce = {
        totalItemCount: docs.length,
        users: docs.map((doc) => ({
          id: doc._id,
          email: doc.email,
        })),
      };

      res.status(200).json(responce);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
