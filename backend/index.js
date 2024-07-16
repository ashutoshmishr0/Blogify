const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const bodyParser = require("body-parser")
const multer = require("multer");
const path = require("path");
const cors= require('cors');
const { Server } = require("http");
const PORT=process.env.PORT || 5000;

const options = {
	origin:"https://6695c7fcaa2ab1f5ba3ff1b2--vocal-platypus-cdd97d.netlify.app/api",  // Replace with your frontend URL
	credentials: true, // Include if sending cookies
	methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
	allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"], // Allowed headers
};

dotenv.config();
app.use(cors(options));
app.use(bodyParser.json());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(PORT, () => {
  console.log(`Backend is running.on PORT:${PORT}`);
});
