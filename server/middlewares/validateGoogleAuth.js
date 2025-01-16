import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import usersService from "../service/usersService.js";
import utils from "../utils/utils.js";
import "dotenv/config";

const opts = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:
    "https://taskproserver.vercel.app/api/users/google-auth/callback",
};

passport.use(
  new Strategy(opts, async (_, __, profile, done) => {
    try {
      let user = await usersService.findUser({
        email: profile.emails[0].value,
      });

      if (!user) {
        const newUser = {
          isGoogleUser: true,
          name: profile.displayName,
          email: profile.emails[0].value,
          profilePhotoUrl: profile?.photos[0]?.value ?? null,
        };

        user = await usersService.addGoogleUserToDB(newUser);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

const validateGoogleAuth = {
  redirect: (req, res, next) => {
    passport.authenticate("google", {
      session: false,
      prompt: "select_account",
      scope: ["profile", "email"],
    })(req, res, next);
  },
  handleCallback: (req, res, next) => {
    passport.authenticate("google", { session: false }, (err, user) => {
      if (err || !user) {
        utils.handleRedirect(res, "failed");
        return;
      }

      req.user = user;
      next();
    })(req, res, next);
  },
};

export default validateGoogleAuth;
