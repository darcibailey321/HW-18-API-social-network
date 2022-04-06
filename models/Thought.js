const { Schema, Types, model } = require("mongoose");

const dateFormat = (v) => {
  return `${v.toDateString()} at ${v.toTimeString()}`;
};

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      minLength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: dateFormat,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxlength: 280,
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
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

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
