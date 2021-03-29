const express = require("express");
const router = express.Router();
const checkAuth = require("../auth/check-auth");

// Controllers

const UsersController = require("../controllers/users");

//  Models

const User = require("../models/user");

// Routes

router.post("/login", UsersController.users_login);

router.post("/signup", UsersController.users_signup);

router.delete("/:userId", checkAuth, UsersController.users_delete_user);

router.get("/", checkAuth, UsersController.users_get_all);

module.exports = router;
