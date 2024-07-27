const { Router } = require("express");
const { Blog } = require("../models/blog");
const { Comment } = require("../models/comment");
const blogRouter=Router();

blogRouter.get('/add-blog',(req,res)=>{
    return res.render('addBlog',{
        user:req.user
    })

})

blogRouter.get('/:id',async(req,res)=>{
    const blog=await Blog.findById(req.params.id).populate('createdBy')
    const comments= await Comment.find({blogID:req.params.id}).populate('createdBy')
    return res.render('blog',{
        user:req.user,
        blog,
        comments
    })
})

blogRouter.post("/",async (req,res)=>{
    const {title,body}=req.body;
    const blog=await Blog.create({
        body,
        title,
        createdBy:req.user._id
    })
    return res.redirect(`/blog/${blog._id}`);
})

blogRouter.post('/comment/:blogID', async (req,res)=>{
 const comment=await Comment.create({
    content:req.body.content,
    blogID:req.params.blogID,
    createdBy:req.user._id
 });
 return res.redirect(`/blog/${req.params.blogID}`)
})

module.exports={blogRouter}