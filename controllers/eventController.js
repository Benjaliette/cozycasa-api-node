const asyncHandler = require('express-async-handler');

const Event = require('../models/event');
const { body, validationResult } = require('express-validator');

exports.event_list = asyncHandler(async (req, res, next) => {
  const events = await Event
    .find({ homeId: req.params.homeId })
    .exec();

  res.status(200).json({message: "Event List", events});
});

exports.event_create = [
  body("title").notEmpty(),
  body("start_date").notEmpty().isISO8601().toDate(),
  body("end_date").notEmpty().isISO8601().toDate(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const { start_date, end_date, title, content } = req.body;

    const event = new Event({
      start_date,
      end_date,
      title,
      content,
      homeId: req.params.homeId,
      userId: req.user.user._id
    });

    if (errors.isEmpty()) {
      await event.save();
      res.status(201).json(event);
    }

    res.status(422).json({ errors: errors.array() });
  })
];

exports.event_update = [
  body("title").notEmpty(),
  body("start_date").notEmpty().isISO8601().toDate(),
  body("end_date").notEmpty().isISO8601().toDate(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const updatedEvent = await Event.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      )
      res.status(200).json(updatedEvent);
    }

    res.status(422).json({ errors: errors.array() });
  })
];

exports.event_delete = asyncHandler(async (req, res, next) => {
  await Event.findOneAndDelete({ _id: req.params.id })

  res.status(200).json(req.params.id);
})
