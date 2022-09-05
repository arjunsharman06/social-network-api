const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
  {
    reactionID: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      require: true,
      max: 280,
    },
    username: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
      default: Date.now(),
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {},
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 280,
    },
    created: {
      type: Date,
      default: Date.now(),
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    //   User that created the thought
    username: {
      type: String,
      required: true,
    },
    // association of reactions and thoughts
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Virtual for the calculation of replies
thoughtSchema.virtual('reactionCount ').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
