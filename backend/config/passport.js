const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken'); 

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/users/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          name: profile.displayName,
          email: profile.emails[0].value,
        };

        try {
          let user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
};