const passport = require("passport");
const GoogleStategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// Models
const User = mongoose.model("users"); // Fetching of schema

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
  passport.use(
    new GoogleStategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        // Create an instance of Model class called model instance and save to the MongoDB with 'save' function

        // eslint-disable-next-line no-new
        const existingUser = await User.findOne({ googleId: profile.id });
        if (!existingUser) {
          const user = await new User({
            googleId: profile.id
          }).save();
          console.log("\x1b[36m%s\x1b[0m", "User Created.");

          done(null, user);
        } else {
          console.log("\x1b[36m%s\x1b[0m", "User already exists.");
          done(null, existingUser);
        }
      }
    )
  );
};
