require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Student = require("./models/Student");

const app = express();

const DEFAULT_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174"
];

const extraOrigins = [process.env.FRONTEND_URL, process.env.FRONTEND_URLS]
  .flatMap((value) => (value ? value.split(",") : []))
  .map((value) => value.trim())
  .filter(Boolean);

const allowedOrigins = new Set([...DEFAULT_ORIGINS, ...extraOrigins]);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 5002;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/studentRecordsDB";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Student Record API Running");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/students", async (req, res) => {
  try {
    const { search, department, year, status } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { studentId: { $regex: search, $options: "i" } },
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } }
      ];
    }

    if (department) {
      filter.department = department;
    }

    if (year) {
      filter.year = year;
    }

    if (status) {
      filter.status = status;
    }

    const students = await Student.find(filter).sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch student records" });
  }
});

app.get("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(400).json({ message: "Invalid student id" });
  }
});

app.post("/students", async (req, res) => {
  try {
    const student = new Student({
      studentId: req.body.studentId,
      fullName: req.body.fullName,
      email: req.body.email,
      department: req.body.department,
      year: req.body.year,
      phone: req.body.phone,
      dateOfBirth: req.body.dateOfBirth,
      gpa: req.body.gpa,
      status: req.body.status,
      address: req.body.address
    });

    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create student record",
      error: error.message
    });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        studentId: req.body.studentId,
        fullName: req.body.fullName,
        email: req.body.email,
        department: req.body.department,
        year: req.body.year,
        phone: req.body.phone,
        dateOfBirth: req.body.dateOfBirth,
        gpa: req.body.gpa,
        status: req.body.status,
        address: req.body.address
      },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update student record",
      error: error.message
    });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete student record" });
  }
});

app.use((err, req, res, next) => {
  if (err && err.message === "Not allowed by CORS") {
    return res.status(403).json({
      message: err.message,
      origin: req.headers.origin || null
    });
  }

  console.error(err);
  return res.status(500).json({ message: "Unexpected server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});