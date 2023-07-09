import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, TextField,Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { useNavigate } from "react-router-dom";
import axios from "axios"


const PostWidget = ({
    key,
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    const [isComments, setIsComment] = useState(false);
    const dispatch = useDispatch();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const [newComment, setNewComment] = useState('')

    const { palette } = useTheme();
    const main = palette.primary.main;
    const primary = palette.primary.main;
    const patchLike = async () => {
        try {
            const response = await axios.put(
                'http://localhost:3011/posts/likepost',
                {
                    postId: '64a2fea71388d4494cd38ba1',
                    userId: loggedInUserId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
    const addNewComment = async () => {
        try {
            if (newComment === '') return;
            const response = await axios.post(
                'http://localhost:3011/posts/addcomment',
                {
                    postId:postId,
                    comment:newComment,
                    userId: loggedInUserId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            setNewComment('')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <WidgetWrapper m="2rem 0">
            <Friend friendId={postUserId} name={name} subtitle={location} userPicturePath={userPicturePath} />
            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>
            {picturePath[0] && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={picturePath[0]?.url}
                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComment(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>

                    </FlexBetween>
                </FlexBetween>


                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {isComments && (
                <Box mt="0.5rem">
                    {
                        comments.map((comment, i) => (
                            <Box key={`${name}-${i}`}>
                                <Divider />
                                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                    {comment.comment}
                                </Typography>
                            </Box>
                        ))
                    }
                    <Box mt="0.5rem" display="flex">
                        <TextField
                            sx={{ flex: 1, height: 'auto' }}
                            placeholder="Nhập bình luận..."
                            onChange={(e) => setNewComment(e.target.value)}
                            value={newComment}
                        />
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={() => addNewComment()}>Đăng</Button>
                    </Box>
                                       
                    <Divider />
                </Box>


            )

            }

        </WidgetWrapper>
    )
};

export default PostWidget;