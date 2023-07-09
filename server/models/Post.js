import mongoose from "mongoose";


const postSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
        },
        location: String,
        description: {
            type: String,
            required:true
        },
        picturePath:  [
            {
              public_id: String,
              url: String,
            },
          ],
        usePicturePath: String,
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        ],
        comments: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Comment"
            }
        ]
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;