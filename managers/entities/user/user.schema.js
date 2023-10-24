module.exports = {
  createUser: [
    {
      model: "username",
      required: true,
    },
    {
      model: "password",
      required: true,
      length: { min: 8 },
    },
  ],

  signInUser: [
    {
      model: "username",
      required: true,
    },
    {
      model: "password",
      required: true,
    },
  ],
};
