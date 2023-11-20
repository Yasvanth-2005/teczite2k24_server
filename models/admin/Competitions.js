import mongoose from "mongoose";
const validDepartments = [
  "CSE",
  "ECE",
  "CIVIL",
  "CHEM",
  "MECH",
  "EEE",
  "MME",
  "PUC",
  "OPENTOALL",
];

const competitionSchema = new mongoose.Schema({
  eveID: {
    type: String,
    required: true,
    unique: true,
  },
  eveName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  eveDepartment: {
    type: String,
    required: true,
    enum: validDepartments,
  },
  eveImg: {
    type: String,
    default: "card_back.jpg",
  },
  about: {
    type: String,
    default: "Updating soon...",
  },
  structure: {
    type: String,
    default: "Updating soon...",
  },
  timeline: {
    type: String,
    default: "Updating soon...",
  },
  rules: {
    type: String,
    default: "Updating soon...",
  },
  TeamSize: {
    type: Number,
    default: 1,
  },
  contact_info: {
    type: String,
    default: "Updating soon...",
  },
  isRegistrationsOpened: {
    type: Boolean, 
    required: true,
    default: false, 
  },
  RegisterStudents: {
    type: [[String]],
    default: [],
  },
});


const Competitions = mongoose.model("Competitions", competitionSchema);

export default Competitions;
