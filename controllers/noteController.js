const asyncHandler = require("express-async-handler");

const Note = require("../models/note");
const Home = require("../models/home");
const { body, validationResult } = require("express-validator");

exports.note_list = asyncHandler(async (req, res, next) => {
  const notes = await Note
    .find({ homeId: req.params.homeId })
    .exec();

  res.status(200).json({ message: 'Note List', notes });
})

exports.note_create = [
  body('title').notEmpty(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
      homeId: req.params.homeId,
      userId: req.user.user._id
    });

    if (errors.isEmpty()) {
      await note.save();
      res.status(201).json(note);
    }

    res.status(422).json({ errors: errors.array() });
  })
]

exports.note_update = [
  body('title').notEmpty(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const updatedNote = await Note.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );

      res.status(200).json(updatedNote);
    }

    res.status(422).json({ errors: errors.array() })
  })
]

exports.note_delete = asyncHandler(async (req, res, next) => {
  await Note.findOneAndDelete({ _id: req.params.id });

  res.status(200).json(req.params.id);
})
