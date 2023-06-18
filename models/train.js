const { Schema, model } = require('mongoose');
const Joi = require('joi');

const trainSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    departureStation: {
      type: String,
      required: true,
    },
    arrivalStation: {
      type: String,
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
    numberOfCoaches: {
      type: Number,
      required: true,
      default: 10
    },
    availableSeats: {
      type: Number,
      required: true,
      default: 1
    },
    ticketPrice: {
      type: Number,
      required: true,
      default: 0
    },
    trainClass: {
      type: String,
      required: true,
      default: "Econom"
    },
    note: {
      type: String,
    },
    creater: {
      type: Schema.Types.ObjectId,
      ref: 'admin',
    },
    editor: {
      type: Schema.Types.ObjectId,
      ref: 'admin',
    }
  },
  { versionKey: false, timestamps: true },
);

const schemaValidateTrain = Joi.object({
  name: Joi.string().required(),
  number: Joi.string().required(),
  departureStation: Joi.string().required(),
  arrivalStation: Joi.string().required(),
  departureTime: Joi.date().required(),
  arrivalTime: Joi.date().required(),
  numberOfCoaches: Joi.number().min(1).integer().required(),
  availableSeats: Joi.number().min(0).integer().required(),
  ticketPrice: Joi.number().min(0).required(),
  trainClass: Joi.string().required(),
  note: Joi.string().optional(),
})


const Train = model('train', trainSchema);

module.exports = {
  Train,
  trainSchema,
  schemaValidateTrain,
};
