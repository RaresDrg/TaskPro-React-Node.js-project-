import passport from "passport";
import { Strategy } from "passport-jwt";
import usersService from "../service/usersService.js";
import utils from "../utils/utils.js";
import { configDotenv } from "dotenv";

configDotenv({ path: "./environment/.env" });

const opts = {
  jwtFromRequest: (req) => req?.signedCookies?.accessToken ?? null,
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await usersService.findUser({ _id: payload.id });

      if (!user) {
        throw new Error("User not found");
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

function validateJWTAuth(req, res, next) {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
    if (!err && user) {
      req.user = user;
      next();
      return;
    }

    if (err || !user) {
      try {
        const userByRefreshToken = await utils.getUserByRefreshToken(req);
        const renewedTokens = utils.generateAuthTokens(userByRefreshToken);

        await usersService.updateUser(userByRefreshToken.id, {
          token: renewedTokens.refreshToken,
        });

        utils.sendTokensAsCookies(res, renewedTokens);
        req.user = userByRefreshToken;
        next();
        return;
      } catch (error) {
        res.status(401).json({
          status: "error",
          code: 401,
          message: "Unauthorized access",
        });
      }
    }
  })(req, res, next);
}

export default validateJWTAuth;
