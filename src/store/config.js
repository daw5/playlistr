require("dotenv").config();

export const config = {
  passport: {
    secret: process.env.PASSPORT_SECRET,
    expiresIn: 10000,
  },
  env: {
    port: process.env.PORT,
    mongoDBUri:
      process.env.ENV === "prod"
        ? "mongodb+srv://user:userTestingPassword@cluster0-yfpdy.mongodb.net/test?retryWrites=true&w=majority"
        : "mongodb://localhost/test",
    mongoHostName: process.env.ENV === "prod" ? "mongodbAtlas" : "localhost",
  },
};
