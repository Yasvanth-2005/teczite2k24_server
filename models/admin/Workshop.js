import mongoose from "mongoose";
// Creating a schema for the workshop
const workshopSchema = new mongoose.Schema({
  sno: {
    type: Number,
    required: true,
    unique: true
  },
  workshopName: {
    type: String,
    required: true
  },
  workshopDept: {
    type: String,
    default: null
  },
  about: {
    type: String,
    default: null
  },
  workshopImg: {
    type: String,
    default: null
  },
  structure: {
    type: String,
    default: null
  },
  isRegistrationsOpened: {
    type: Number,
    default: 0
  },
  contact: {
    type: String,
    default: null
  },
  instructorName: {
    type: String,
    default: null
  },
  instructorSpecifications: {
    type: String,
    default: null
  },
  instructorImage: {
    type: String,
    default: null
  }
});

// Creating a Mongoose model based on the workshopSchema
const Workshop = mongoose.model('Workshop', workshopSchema);

export default Workshop;
