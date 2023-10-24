const express = require("express");
const router = express.Router();
const User = require("../managers/entities/user/User.manager");
const config = require("../config/index.config");
const { cortex, cache } = require("../app");
const ManagersLoader = require("../loaders/ManagersLoader");
const UserModel = require("../managers/entities/user/user.model");
const TokenManager = require("../managers/token/Token.manager");
const cors = require("cors");
const responseDispatcher = require("../managers/response_dispatcher/ResponseDispatcher.manager");
const Response = new responseDispatcher();

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

router.use(express.json());
router.use(cors());

router.post("/auth/register", async (req, res) => {
  try {
    const { username, password } = await req.body;

    const newUser = await user.createUser({
      username,
      password,
    });

    if (newUser?.error) return res.status(401).json({ message: newUser.error });

    return Response.dispatch(res, {
      ok: true,
      data: newUser,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return Response.dispatch(res, {
      ok: false,
      error: error,
      message: "Internal Server Error",
    });
  }
});

router.post("/auth/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await user.signInUser({ username, password });

    if (existingUser?.error)
      return res.status(404).json({ error: existingUser.error });

    return Response.dispatch(res, {
      ok: true,
      data: existingUser,
      message: "User signed in successfully",
    });
  } catch (error) {
    console.error(error);
    return Response.dispatch(res, {
      ok: false,
      error: error,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
