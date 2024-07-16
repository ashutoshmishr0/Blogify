const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { uploadOnCloudinary } = require('./utils/cloudinary');
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
	origin: "*", // Replace with your frontend URL
	credentials: true, // Include if sending cookies
	methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
	allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"], // Allowed headers
};

dotenv.config();
app.use(cors(options));
app.use(bodyParser.json());
app.use(express.json());

// app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/images/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"),async (req, res) => {
  const ProfileFile = await uploadOnCloudinary(localFilePath);
     console.log(ProfileFile)
  res.status(200).json("File has been uploaded");
});


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(PORT, () => {
  console.log(`Backend is running.on PORT:${PORT}`);
});
