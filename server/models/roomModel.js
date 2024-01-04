const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    roomadmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPending: {
      type: Boolean,
      default: true,
    },
    isGeneral: {
      type: Boolean,
      default: false,
    },
    messages: [
      {
        sender: {
          id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          name: String,
        },
        content: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
        type: String,
        threadId: String,
        responses: [
          {
            sender: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            content: String,
            timestamp: {
              type: Date,
              default: Date.now,
            },
            threadId: String,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);
