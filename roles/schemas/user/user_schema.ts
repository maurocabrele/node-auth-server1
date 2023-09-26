export const userSchema = {
  $jsonSchema: {
    bsonType: "object",
    title: "User Object Validation",
    required: ["email", "password", "firstName", "lastName", "dob"],
    properties: {
      firstName: {
        type: "string",
      },
      lastName: {
        type: "string",
      },
      dob: {
        type: "string",
      },
      email: {
        type: "string",
        
      },
      password: {
        type: "string",
      },
      jwt: {
        type: "string",
      },
      refreshjwt: {
        type: "string",
      },
      roles: {
        type: ["string"],
        enum: ["user", "admin", "super_admin"],
      },
    },
    additionalProperties: true,
  },
};
