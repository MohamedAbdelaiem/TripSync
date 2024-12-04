const express = require("express");
const path = require("path");
const helmet = require("helmet");
const xss = require("xss-clean");

//Intialize Routers
const UserRouter = require("./Routes/userRouter");
const tripRouter = require("./Routes/tripRouter");
const reportRouter = require("./Routes/reportRouter");

const app = express();

//api security
app.use(helmet());
app.use(xss());

//Body Parser
app.use(express.json()); //for json data
app.use(express.urlencoded({ extended: true })); //for form data

//Serve Static Files
// app.use(express.static(path.join(__dirname,'public')));

//Mount Routers
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/trips", tripRouter);
// app.use("/api/v1/reports", reportRouter);


//Error Handler
app.use((req, res, next) => {
  res.status(404).send("Page Not Found");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
