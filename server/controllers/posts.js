import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js"
import { cloudinaryUploadImg } from "../utils/cloudinary.js";
import fs from "fs"

export const createPost = async (req, res) => {
    try {
        const userId = req.id;
        const { description } = req.body;
        console.log("des",description)
        const uploader = (path) => cloudinaryUploadImg(path, "image");
        const urls = [];
        const files = req.files;
        if (files) {
            for (const file of files) {
                const { path } = file;
                const newpath = await uploader(path);
                urls.push(newpath);
                fs.unlinkSync(path)
            }
        }     
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath:urls.map((file) => {
                return file;
            }),
        })

        await newPost.save();
        res.status(201).json({ message: "Success", post: newPost });
            
    }catch(error) {
        res.status(409).json({ message: error.message })
        console.log(error)
    }
};

export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find().populate("userId").populate("comments");
         return  res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const likePost = async (req, res) => {
    try {
        const  id  = req.id;
        const  {postId}  = req.body;
        const post = await Post.findById(postId);
        const isLiked = post.likes.includes(id);

        if (isLiked) {
            post.likes.pull(id);
            res.status(200).json("Unlike post successfully");
        } else {
            post.likes.push(id)
            res.status(200).json({message:"Like post successfully",post:post});
        }
        await post.save();
       
    } catch (error) {
        
        res.status(404).json({ message: error.message })
    }
}

export const addCommentPost = async (req, res) => {
    try {
        const  id  = req.id;
        const {postId,comment } = req.body;
        const post = await Post.findById(postId).populate("comments");
        
        if (post && id) {
            const newComment = new Comment({
                user: id,
                comment: comment,
              });

            const savedCommnet = await newComment.save();
            
            post.comments.push(savedCommnet._id);
            await post.save();

            res.json({ message: "Add comment successfully", post: post })
            console.log("addcomment success")

        } else {
            res.json("Add comment failed")
        }
        await post.save();
       
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deleteComment = async (req,res) => {
    try {
        const  id  = req.id;
        const {postId,commentId } = req.body;
        const post = await Post.findById(postId);
        
        if (postId && id && commentId) {

            const comment = await Comment.findById(commentId);
            if (comment.user.toString() !== id || !post.comments.includes(commentId)) {
                return res.status(403).json({ error: 'Not author' });
            }
            await Comment.findByIdAndDelete(commentId);

            post.comments = post.comments.filter(id => id.toString() !== commentId);
            await post.save();

            res.json({message:"Delete comment successfully",post:post.populate("comments")})
          
        } else {
            res.json("Add comment failed")
        }
        await post.save();
    } catch (error) {
        res.status(404).json({ message: error.message })      
    }
}