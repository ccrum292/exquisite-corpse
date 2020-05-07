const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoriesSchema = new Schema({
  authors: [
    {
      authorName: {
        type: String,
        trim: true,
        required: "Please Enter a Pen Name",
        minlength: 1,
        maxlength: 50
      }
    }
  ],
  numberOfEntries: {
    type: Number,
    default: 1
  },
  text: {
    type: String,
    trim: true,
    required: "Please Enter Story Text",
    minlength: 1,
    maxlength: 500
  },
  dateCreated: {
    type: Date,
    default: () => new Date()
  }
});

const Stories = mongoose.model("Stories", StoriesSchema);

module.exports = Stories;
