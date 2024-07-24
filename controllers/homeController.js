const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Home = require('../models/home');
const User = require('../models/user');

exports.home_list = asyncHandler(async (req, res, next) => {
  const homes = await Home
    .find({ users: {
      $elemMatch: { $eq: req.user.user._id }
    }})
    .populate("users")
    .exec();

  res.status(200).json({ message: 'Home List', homes });
})

exports.home_create = [
  body('name').notEmpty(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const { name } = req.body;

    const home = await new Home({ name, users: [ req.user.user._id ] });

    if (errors.isEmpty()) {
      await home.save();
      await User.updateOne(
        { '_id': home.users },
        { $push: { homes: home._id } }
      );
      res.status(201).json(home)
    }

    res.status(422).json({ errors: errors.array() });
  })
]

exports.home_update = [
  body('name').notEmpty(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const home = await Home.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(201).json(home)
    }

    res.status(422).json({ errors: errors.array() });
  })
]

exports.home_delete = asyncHandler(async (req, res, next) => {
  await Home.findOneAndDelete({ _id: req.params.id });

  res.status(200).json(req.params.id);
})
