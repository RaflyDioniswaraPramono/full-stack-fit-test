require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const path = require("path");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cors());
app.use(bodyParser.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
