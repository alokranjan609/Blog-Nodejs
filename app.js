require('dotenv').config()
const express=require('express');
const path=require('path');
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const { userRouter } = require('./routes/user');
const { checkForAuthentication } = require('./middleware/authetication');
const { blogRouter } = require('./routes/blog');
const { Blog } = require('./models/blog');
// const publicPath = path.resolve(__dirname,'public');
const app=express();

const PORT=process.env.PORT||8000
mongoose.connect(process.env.MONGO_URL).then(e=>console.log('MongoDB connected'));

//Middleware
app.use("/public",express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthentication("token"))
app.set('view engine','ejs')
app.set('views',path.resolve('./views'))


//Routes
app.get('/',async (req,res)=>{
    const allBlog=await Blog.find({})
    res.render('home',{
        user:req.user,
        blogs:allBlog
    })
})
app.use('/user',userRouter);
app.use('/blog',blogRouter)


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
    // console.log(`${publicPath}`);
})