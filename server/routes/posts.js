import express from "express";
import {createPost ,getFeedPosts, getUserPosts, likePost,addCommentPost,deleteComment } from '../controllers/posts.js'
import { verifyToken } from "../middleware/auth.js";
import cloudinary from "cloudinary";
import { uploadPhoto } from "../middleware/uploadImages.js";

const router = express.Router();

router.post("/createpost",verifyToken,uploadPhoto.array('images',1),createPost)

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

//router.patch("/:id/like", verifyToken, likePost);
router.put("/likepost", verifyToken, likePost)
router.put("/deletecomment", verifyToken, deleteComment)

router.post("/addcomment",verifyToken,addCommentPost)

export default router;