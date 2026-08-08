const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

const testRoutes = require('./routes/test.route');
const authRoutes = require('./routes/auth.route');
const protectedRoutes = require('./routes/protected.route');
const busRoutes = require('./routes/bus.route');
const bookingRoutes = require('./routes/booking.route');
const profileRoutes = require('./routes/profile.route');
const postRoutes = require("./routes/post.route");
const commentRoutes = require("./routes/comment.route");
const forumRoutes = require("./routes/forum.route");
const reportRoutes = require("./routes/report.route");

require('./config/passport');

const app = express();

/*
========================================
MIDDLEWARE
========================================
*/

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());

app.use(passport.session());

/*
========================================
ROUTES
========================================
*/

app.use('/api/test', testRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/protected', protectedRoutes);

app.use('/api/profile', profileRoutes);

app.use('/api/buses', busRoutes);

app.use('/api/bookings', bookingRoutes);

app.use("/api/community/posts", postRoutes);

app.use("/api/community/comments", commentRoutes);

app.use("/api/community/forums", forumRoutes);

app.use("/api/community/reports", reportRoutes);

/*
========================================
HOME ROUTE
========================================
*/

app.get('/', (req, res) => {

  res.json({
    success: true,
    message: 'TedBus API Running'
  });

});

/*
========================================
EXPORT
========================================
*/

module.exports = app;