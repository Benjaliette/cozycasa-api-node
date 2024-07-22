const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");

const User = require('../models/user');
const { generateAccessToken, generateRefreshToken, removeToken, addToRefreshTokenList, findUsername } = require("../middleware/jwtAuth");
let { refreshTokens } = require("../middleware/jwtAuth");

exports.user_create = [
  body('username', 'Email must be entered').trim().isLength({min: 3}).not().isEmpty(),
  body('email', 'Username must be entered').trim().isEmail().not().isEmpty(),
  body('password', 'Password must be entered').trim().isLength({min: 6}).not().isEmpty(),
  asyncHandler(async (req, res) => {
    const { username, email } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password.trim(), 10);

    const user = await new User({
      username: username.trim(),
      email: email.trim(),
      password: hashedPassword
    })

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      await user.save();
      return res.status(201).json(user);
    }

    res.status(422).json({ errors: errors.array() })
  })
]

exports.user_login = [
  body('identifier', 'Email or username must be entered').not().isEmpty(),
  body('password', 'Password must be entered').trim().isLength({min: 6}).not().isEmpty(),
  asyncHandler(async (req, res) => {
    const { identifier } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password.trim(), 10);

    const user = await User.findOne({
      $or: [
        { username: identifier },
        { email: identifier }
      ]
    })

    if (!user) {
      res.status(404).json({ message: "L'email ou le mot de passe est incorrect" })
    }

    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password
    )

    if (!passwordIsValid) {
      res.status(401).json({ message: "Invalid password" })
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() })
    }

    const accessToken = await generateAccessToken({user});
    const refreshToken = await generateRefreshToken({user});

    console.log(refreshTokens);

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    })

    res.json({user, accessToken});
  })
]

exports.refresh_token = asyncHandler(async (req, res) => {
  if (req.cookies?.jwt) {
    const refreshToken = req.cookies.jwt;

    const identifier = await findUsername(refreshToken);

    const user = await User.findOne({
      $or: [
      { username: identifier }
    ]
    })

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      if (!refreshTokens.includes(refreshToken)) {
        res.status(400).json({message: "Refresh token invalid"});
      }

      const accessToken = await generateAccessToken({user});

      res.json ({accessToken})
    }
  } else {
    res.status(406).json({ message: "Unauthorized" })
  }

});

exports.user_logout = asyncHandler(async (req, res) => {
  if (req.cookies?.jwt) {
    const refreshToken = req.cookies.jwt;

    refreshTokens = await removeToken(refreshToken);
    res.status(202).json({ message: "Logged out" });

  } else {
    res.status(406).json({ message: "Unauthorized" })
  }
});
