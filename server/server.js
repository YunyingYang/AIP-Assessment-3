const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport"); //authentication module
const path = require('path'); // path module
var io = require("socket.io")();

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const movies = require("./routes/api/movies");

const chats = require("./routes/api/chats");
const usermovieratings = require("./routes/api/usermovieratings");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to mongodb
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
    //这个去掉也可以传值，但是为了DeprecationWarning
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/movies", movies);

app.use("/api/chats", chats);
app.use("/api/usermovieratings", usermovieratings);


// server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
    app.use(express.static('../client/build'));

    app.get('*', (req, res) => {
      //path.resolve(): resolves a sequence of paths or path segments into an absolute path
      res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
}


const port = process.env.PORT || 5000;

var server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

io.attach(server);
io.on("connection", function (socket) {
  socket.on("SEND_MESSAGE", function (data) {
    io.emit("RECEIVE_MESSAGE", data);
  });
});
