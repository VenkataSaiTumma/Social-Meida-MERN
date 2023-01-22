const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");

// morgan display log
const morgan = require("morgan");

const userRoute = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");

// for uploading files
const multer = require("multer");

const path = require("path");

dotenv.config();

mongoose.set("strictQuery", false);

// Node.js Version "2.2.12 or later" MONGO_URL
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB...");
  }
);

// http://localhost:8000/images/gift.png
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// For Uploding File Share Component
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File Upload Successfully");
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/user", userRoute);

app.use("/api/auth", authRouter);

app.use("/api/post", postRouter);

app.listen(8000, () => {
  console.log("Server is running...");
});
