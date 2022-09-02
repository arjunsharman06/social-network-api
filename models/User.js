const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'Username is required',
      trim: true,
    },
    email: {
      type: String,
      required: 'Email is required in the right format',
      unique: true,
      validate: {
        validator: (email) => {
          return new RegExp(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
          ).test(email);
        },
      },
    },
    thoughts: [],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    // Do not return the virtual id
    id: false,
  }
);

// Creating a virtual function for calculating the total friends
userSchema.virtual('friendCount').get(function () {
  return this.friends && this.friends.length ? this.friends.length : 0;
});

// Create the user model using the userSchema
const User = model('User', userSchema);

module.exports = User;
