import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: 'Text is required',
    },
  },
  {timestamps: true},
);

module.exports = mongoose.model('Comment', CommentSchema);
