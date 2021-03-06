/* eslint-disable import/prefer-default-export */
import { Strategy } from "passport-jwt";
import { config } from "./config";
import { User } from "../database/models";

export const applyPassportStrategy = (passport) => {
  const options = {
    jwtFromRequest: (req) => req.cookies.token,
    secretOrKey: config.passport.secret,
  };
  passport.use(
    new Strategy(options, (payload, done) => {
      User.findOne({ email: payload.email }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, {
            email: user.email,
            _id: user._id,
          });
        }
        return done(null, false);
      });
    })
  );
};
