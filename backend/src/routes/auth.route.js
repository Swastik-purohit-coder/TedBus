const express = require('express');

const passport = require('passport');

const router = express.Router();

const {
  loginDemo,
  googleSuccess
} = require('../controllers/auth.controller');

router.get(
  '/google',

  passport.authenticate(
    'google',
    {
      scope: ['profile', 'email']
    }
  )
);

router.get(

  '/google/callback',

  passport.authenticate(
    'google',
    {
      session: true,
      failureRedirect: '/'
    }
  ),

  googleSuccess
);

router.get(
  '/demo-login',
  loginDemo
);

module.exports = router;