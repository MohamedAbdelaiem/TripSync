const express = require("express");
const path = require("path");
const helmet = require("helmet");
const xss = require("xss-clean");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//Intialize Routers
const UserRouter = require("./Routes/userRouter");
const PoliciesRouter = require("./Routes/policesRouter");
const rewardsRouter = require("./Routes/RewardsRouter");
const BlogRouter = require("./Routes/BlogsRouter");
const ChatRouter = require("./Routes/CharRoutes");
const tripRouter = require("./Routes/tripRouter");
const reportRouter = require("./Routes/reportRouter");


const app = express();
//create an http server using the express app
const server = http.createServer(app);

//create a socket connection using the http server
const io = socketio(server);
app.use(cors({credentials: true,origin:"http://localhost:5173"}));
//api security
app.use(helmet());
app.use(xss());
app.use(cookieParser());

//Body Parser
app.use(express.json()); //for json data
app.use(express.urlencoded({ extended: true })); //for form data

//Serve Static Files
// app.use(express.static(path.join(__dirname,'public')));

//Mount Routers

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/policies", PoliciesRouter);
app.use("/api/v1/rewards", rewardsRouter);
app.use("/api/v1/blogs", BlogRouter);
app.use("/api/v1/chats", ChatRouter);
app.use("/api/v1/trips", tripRouter);
app.use("/api/v1/reports", reportRouter);

//Error Handler
app.use((req, res, next) => {
  res.status(404).send("Page Not Found");
});

const { handleSocketConnection } = require("./Controllers/CharController");

//Error Handler
io.on("connection", (socket) => {
  console.log("A user connected");
  handleSocketConnection(socket, io);
});

// server.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });


app.listen(process.env.PORT,()=> {
})