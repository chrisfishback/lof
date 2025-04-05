import {Box} from "@mui/material";
import {LandingPageSideBar} from "./LandingPageSideBar.tsx";
import {Admin} from "../admin/Admin.tsx"
import Content from "./Content.tsx";
import { BrowserRouter, Route, Routes } from "react-router";

export const LandingPage = () => {
    return (
        <BrowserRouter>
            <Box sx={{display: "flex", minHeight: "100vh", background: "#1b3554"}}>
                <LandingPageSideBar/>
                <Box sx={{flexGrow: 1, padding: 3}}>
                        <Routes>
                            <Route path="/" element={<Content/>}/>
                            <Route path="/admin" element={<Admin/>}/>
                        </Routes>
                    
                </Box>
            </Box>
        </BrowserRouter>
    );
}