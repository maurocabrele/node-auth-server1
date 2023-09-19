module.exports. userSchema = {
  $jsonSchema: {
    bsonType: "object",
    title: "User Object Validation",
    required: ["email", "password"],
    properties: {
      email: {
        bsonType: "string",
        description: "'email' must be a string and is required",
      },
      password: {
        bsonType: "string",
        description: "'password' must be a string and is required",
      },
    },
    additionalProperties: false,
  },
};
