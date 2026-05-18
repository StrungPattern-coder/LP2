const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true
    },
    department: {
      type: String,
      required: true,
      trim: true
    },
    year: {
      type: String,
      required: true,
      enum: ["1", "2", "3", "4"]
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    dateOfBirth: {
      type: String,
      default: ""
    },
    gpa: {
      type: Number,
      default: 0,
      min: 0,
      max: 10
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Graduated"],
      default: "Active"
    },
    address: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);