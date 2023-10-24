const express = require("express");
const router = express.Router();
const User = require("../managers/entities/user/User.manager");
const config = require("../config/index.config");
const { cortex, cache } = require("../app");
const ManagersLoader = require("../loaders/ManagersLoader");
const UserModel = require("../managers/entities/user/user.model");
const TokenManager = require("../managers/token/Token.manager");

const managers = new ManagersLoader({
  config,
  cortex,
  cache,
});

managers.load();

const tokenManager = new TokenManager({ config });

const user = new User({
  utils: managers.utils,
  config: managers.config,
  cortex: managers.cortex,
  validators: managers.validators,
  mongomodels: UserModel,
  managers: tokenManager,
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = await req.body;

    const newUser = await user.createUser({
      username,
      password,
    });

    if (newUser?.error) return res.status(401).json({ message: newUser.error });

    return res
      .status(201)
      .json({ message: "User registered successfully", data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await user.signInUser({ username, password });

    if (existingUser?.error)
      return res.status(404).json({ error: existingUser.error });

    return res.status(200).json({ ...existingUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
