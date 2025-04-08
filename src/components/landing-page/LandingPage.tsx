import { Box } from "@mui/material";
import { LandingPageSideBar } from "./LandingPageSideBar.tsx";
import { Admin } from "../admin/Admin.tsx";
import Content from "./Content.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "../../lib/AuthContext";
import { ProtectedRoute } from "../protected-route/ProtectedRoute";
import { LoginPage } from "../login/Login.tsx";

export const LandingPage = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Box sx={{display: "flex", minHeight: "100vh", background: "#1b3554"}}>
                    <LandingPageSideBar/>
                    <Box sx={{flexGrow: 1, padding: 3}}>
                        <Routes>
                            <Route path="/" element={<Content/>}/>
                            <Route path="/login" element={<LoginPage />}/>
                            <Route 
                                path="/admin" 
                                element={
                                    <ProtectedRoute requireAdmin={true}>
                                        <Admin />
                                    </ProtectedRoute>
                                } 
                            />
                        </Routes>
                    </Box>
                </Box>
            </BrowserRouter>
        </AuthProvider>
    );
}