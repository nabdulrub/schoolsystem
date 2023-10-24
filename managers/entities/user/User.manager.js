const bcrypt = require("bcrypt");

module.exports = class User {
  constructor({
    utils,
    cache,
    config,
    cortex,
    managers,
    validators,
    mongomodels,
  } = {}) {
    this.config = config;
    this.cortex = cortex;
    this.validators = validators;
    this.mongomodels = mongomodels;
    this.tokenManager = managers;
    this.usersCollection = "users";
    this.userExposed = ["createUser", "signInUser"];
  }

  async createUser({ username, password }) {
    try {
      // Data validation
      let result = await this.validators.user.createUser({
        username,
        password,
      });
      if (result) return result;

      // Check if the user already exists
      const existingUser = await this.mongomodels.findOne({
        username,
      });
      if (existingUser) {
        return { error: "User with this username already exists" };
      }

      // Creation Logic
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new this.mongomodels({
        username,
        password: hashedPassword,
      });
      const createdUser = await newUser.save();
      console.log(createdUser);

      // Generate a long token
      let longToken = this.tokenManager.genLongToken({
        userId: createdUser._id,
        userKey: process.env.LONG_TOKEN_SECRET,
      });

      // Response
      return {
        user: createdUser,
        token: longToken,
      };
    } catch (error) {
      console.log(error);
      return { error: "Failed to create a new user" };
    }
  }

  async signInUser({ username, password }) {
    try {
      // Data validation

      let result = await this.validators.user.signInUser({
        username,
        password,
      });
      if (result) return result;

      // Check if the user already registered
      const existingUser = await this.mongomodels.findOne({
        username,
      });
      if (!existingUser) {
        return { error: "User does not exist, please register first" };
      }

      const comparedPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!comparedPassword) return { error: "Password is incorrect!" };

      let longToken = this.tokenManager.genLongToken({
        userId: existingUser._id,
        userKey: process.env.LONG_TOKEN_SECRET,
      });

      const userData = {
        username: existingUser.username,
        role: existingUser.role,
        classrooms: existingUser.classrooms,
        id: existingUser._id,
      };

      return {
        user: userData,
        token: longToken,
        auth: true,
      };
    } catch (error) {
      console.log(error);
      return { error: "Failed to sign in user" };
    }
  }
};
