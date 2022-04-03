const { Schema, Types, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (valid) {
                  return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(valid);
                },
                message: (props) => `${props.value} is not a valid email address!`,
              },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought"
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }   
);

const User = model("User", userSchema);

const handleError = (err) => console.error(err);

module.exports = User;
