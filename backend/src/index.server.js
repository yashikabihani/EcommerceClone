const express = require("express");
const env = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const PORT = 3000;

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');

env.config();

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.epnb3.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex : true
}).then(() => {
    console.log("Database Connected");
});

// app.use(express.json());
app.use(bodyParser());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);

// app.get("/", (req, res, next) => {
//   res.status(200).json({
//     message: "Hello from Server",
//   });
// });

// app.post("/data", (req, res, next) => {
//   res.status(200).json({
//     message: req.body,
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
