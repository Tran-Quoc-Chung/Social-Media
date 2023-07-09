import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useThme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import axios from "axios";

const Friend = ({friendId,name,subtitle,userPicturePath}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    console.log("user",friends)
    //console.log(friends)
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDarkk = palette.primary.dark;
    const main = palette.primary.main;
    const medium = palette.primary.medium;
    
    const isFriend = friends?.find((friend) => friend === friendId);
    const patchFriend = async () => {
      const response = await axios.put(
        'http://localhost:3011/users/addfriend',
        {
            friendId: friendId
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    )
      dispatch(setFriends({ friends: response }));  
    };
    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px" />
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor:"pointer"
                            }
                        }}
                    >{name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">{subtitle}</Typography>
                </Box>
            </FlexBetween>
            <IconButton
                onClick={() => patchFriend()}
                sx={{backgroundColor:primaryLight,p:"0.6rem"}}
            >
                {isFriend ? ( 
                    <PersonRemoveOutlined  sx={{ color: primaryDarkk }} />
                ) : (
                        <PersonAddOutlined sx={{ color:primaryDarkk}} />
                )
            }
            </IconButton>
        </FlexBetween>
    )
}

export default Friend;