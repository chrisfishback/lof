import {Box} from "@mui/material";
import {LandingPageSideBar} from "./LandingPageSideBar.tsx";
import Content from "./Content.tsx";

export const LandingPage = () => {
    return (
        <Box sx={{display: "flex", minHeight: "100vh", background: "#1b3554"}}>
            <LandingPageSideBar/>
            <Box sx={{flexGrow: 1, padding: 3}}>
                <Content/>
            </Box>
        </Box>
    );
}