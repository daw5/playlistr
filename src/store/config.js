require("dotenv").config();

export const config = {
  passport: {
    secret: process.env.PASSPORT_SECRET,
    expiresIn: 10000,
  },
};
