const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./routes/route");
const PORT =  4000

const app = express();
app.use(express.json());

app.use(cors());

mongoose
  .connect("mongodb+srv://PrachiSharma:H5dAJbvR7AIla7bk@newproject.ufw9pum.mongodb.net/ToDo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

app.use("/", route);

app.listen(PORT, () => console.log("server running on port 4000"));
