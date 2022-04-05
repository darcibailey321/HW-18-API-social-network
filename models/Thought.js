const { Schema, model } = require("mongoose");

// const dateFormat = (date) => {
//   return date.toLocaleString();
// };
const dateFormat = (v) => {return `${ v.toDateString()} at ${v.toTimeString()}`}

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: [280, "Limit to 280 characters."],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: dateFormat,
    },
    username: {
      type: String,
      required: true,
    },
  },
);

const Thought = model("Thought", thoughtSchema);

const handleError = (err) => console.error(err);

module.exports = Thought;

// Add individual properties and their types
// Setting required to true will disallow null values
//   item: { type: String, required: true },
//   stockCount: Number,
//   price: Number,
//   inStock: Boolean,
//   // Use built in date method to get current date
//   lastAccessed: { type: Date, default: Date.now },
