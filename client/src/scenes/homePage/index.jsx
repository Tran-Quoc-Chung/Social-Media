import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import userimage from "../../imageNull/user.png"

const Homepage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);


    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={_id } picturePath={picturePath[0].url ? picturePath[0]?.url : userimage} />
                </Box>
                <Box
                flexBasis={isNonMobileScreens ? "26%" : undefined}
                mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPostWidget picturePath={picturePath[0].url ? picturePath[0]?.url : userimage } />
                    <PostsWidget userId={ _id} />
                </Box>
                {isNonMobileScreens &&
                    <Box flexBasis="26%" >
                        <AdvertWidget />
                        <Box m="2rem 0" />
                        {/* <FriendListWidget userId={_id} /> */}
                    </Box>
                }
            </Box>
        </Box>
    )
}
export default Homepage