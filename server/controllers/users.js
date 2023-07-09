import User from "../models/User.js";
import { cloudinaryUploadImg } from "../utils/cloudinary.js";
import fs from "fs"
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        }
    )
        res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
};

export const addRemoveFriend = async (req, res) => {
    try {
        const id=req.id
        const { friendId } = req.body;
        console.log("id:",id,"friendId:",friendId)
        const user = await User.findById(id)
        const friend = await User.findById(friendId);

        if (user.friends.includes(friend?.id)) {
            user.friends = user.friends.pull(friendId);
            friend.friends = friend.friends.pull(id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        )

        return res.status(200).json(formattedFriends);

    } catch (err) {
        res.status(404).json({ message: err.message })
        console.log(err)
    }
}

export const uploadImages = async (req, res) => {
    const { id } = req.params;

    try {
        const uploader = (path) => cloudinaryUploadImg(path, "image");
        const urls = [];
        const files = req.files;
        
        for (const file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            urls.push(newpath);
            fs.unlinkSync(path)
        }
        
        const findUser = await User.findByIdAndUpdate(
            id,
            {
                picturePath: urls.map((file) => {
                    return file;
                }),
            },
            { new: true }
        );
        res.json(findUser);
    } catch (error) {
        console.log(error)
    }
}