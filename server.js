require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
// app.use(logger);
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/order", require("./routes/OrderRoutes"));
app.use("/user", require("./routes/UserRoutes"));
app.use("/rider", require("./routes/RiderRoutes"));
app.use("/orderDetails", require("./routes/OrderDetailsRoutes"));

// app.use(errorHandler);
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
