const express = require("express");
const router = express.Router();
const config = require("../config/index.config");
const { cortex, cache } = require("../app");
const ManagersLoader = require("../loaders/ManagersLoader");
const School = require("../managers/entities/school/School.manager");
const SchoolModel = require("../managers/entities/school/school.model");
const responseDispatcher = require("../managers/response_dispatcher/ResponseDispatcher.manager");
const Response = new responseDispatcher();
const cors = require("cors");

const managers = new ManagersLoader({
  config,
  cortex,
  cache,
});

const verifyToken = require("../mws/__longToken.mw");

managers.load();

const school = new School({
  utils: managers.utils,
  config: managers.config,
  cortex: managers.cortex,
  validators: managers.validators,
  mongomodels: SchoolModel,
});

router.post("/schools", async (req, res) => {
  try {
    const { name, location } = await req.body;

    const newSchool = await school.createSchool({
      name,
      location,
    });

    if (newSchool?.error)
      return res.status(newSchool.status).json({ message: newUser.error });

    return Response.dispatch(res, {
      ok: true,
      data: newSchool,
      message: "School created successfully",
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

router.get("/schools", async (req, res) => {
  try {
    const schools = await school.getSchools();

    if (!schools)
      return Response.dispatch(res, {
        ok: false,
        message: "No Schools Found",
      });

    return Response.dispatch(res, {
      ok: true,
      data: schools,
      message: "Schools fetched successfully",
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
