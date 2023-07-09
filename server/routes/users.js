import express from 'express';
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    uploadImages,

} from "../controllers/users.js";
import { verifyToken } from '../middleware/auth.js';
import { cloudinaryUploadImg } from '../utils/cloudinary.js';
import {productImgResize,uploadPhoto} from '../middleware/uploadImages.js'
const router = express.Router();


router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

router.put("/addfriend", verifyToken, addRemoveFriend);
router.put("/uploadavatar/:id",verifyToken,uploadPhoto.array("images",10),productImgResize,uploadImages)


export default router;