require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { userRouter } = require('./routes/user');
const { checkForAuthentication } = require('./middleware/authetication');
const { blogRouter } = require('./routes/blog');
const { Blog } = require('./models/blog');

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'));

// Middleware
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication("token"));
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Rate limiting middleware
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again after 15 minutes."
});

// Apply the rate limiter to all API routes
app.use(apiLimiter);

// Routes
app.get('/', async (req, res) => {
  const allBlog = await Blog.find({});
  res.render('home', {
    user: req.user,
    blogs: allBlog
  });
});

app.use('/user', apiLimiter, userRouter); // Apply rate limiter on /user routes
app.use('/blog', apiLimiter, blogRouter); // Apply rate limiter on /blog routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
