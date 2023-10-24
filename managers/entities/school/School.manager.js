const bcrypt = require("bcrypt");
const e = require("express");

module.exports = class School {
  constructor({ utils, cache, config, cortex, validators, mongomodels } = {}) {
    this.config = config;
    this.cortex = cortex;
    this.validators = validators;
    this.mongomodels = mongomodels;
    this.schoolCollection = "schools";
    this.schoolExposed = ["createSchool", "updateSchool"];
  }

  async createSchool({ name, location }) {
    try {
      // Data validation
      // let result = await this.validators.school.createSchool({
      //   name,
      //   location,
      // });

      // if (result) return result;

      // Check if the school already exists
      const existingSchool = await this.mongomodels.findOne({ name });
      if (existingSchool) {
        return { error: "This school current exists", status: 469 };
      }

      // Creation Logic
      const newSchool = new this.mongomodels({
        name,
        location,
      });
      const createdSchool = await newSchool.save();
      console.log(createdSchool);

      // Response
      return {
        school: createdSchool,
      };
    } catch (error) {
      console.log(error);
      return { error: "Failed to create a new school", status: 500 };
    }
  }

  async updateSchool({ id, name, location }) {
    try {
      // Data validation
      let result = await this.validators.school.updateSchool({
        id,
      });
      if (result) return result;

      // Check if the school already exists
      const existingSchool = await this.mongomodels.findOne({ _id: id });
      if (!existingSchool) {
        return { error: "School does not exist", status: 404 };
      }

      // Update Logic
      existingSchool.name = name;
      existingSchool.location = location;
      const updatedSchool = await existingSchool.save();

      // Response
      return {
        school: updatedSchool,
      };
    } catch (error) {
      console.log(error);
      return { error: "Failed to update the school school", status: 500 };
    }
  }

  async getSchools() {
    try {
      const schools = await this.mongomodels.find();

      return { schools: schools };
    } catch (error) {
      console.error(error);
      return { error: error, status: 500 };
    }
  }
};
