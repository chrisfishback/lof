import { Box, Button, Drawer, IconButton, Typography, Tooltip } from "@mui/material";
import { Groups, Home, AdminPanelSettings, Login, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useAuth } from "../../lib/AuthContext";

export function LandingPageSideBar() {
    const navigate = useNavigate();
    const { user, isAdmin, logout } = useAuth();
    const DRAWER_WIDTH = 70;

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    const handleAdminClick = () => {
        if (user && isAdmin) {
            navigate('/admin');
        } else if (user) {
            alert("You don't have admin privileges");
        } else {
            navigate('/login');
        }
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: DRAWER_WIDTH,
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingY: 2,
                    backgroundColor: "#111827",
                    borderRight: "2px solid rgb(201, 170, 113)",
                },
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Button sx={{ mb: 2 }} onClick={() => navigate('/')}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#c9aa71" }}>
                        lof
                    </Typography>
                </Button>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Tooltip title="Home" placement="right">
                        <IconButton sx={{ color: "#c9aa71" }} onClick={() => navigate('/')}>
                            <Home />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Teams" placement="right">
                        <IconButton sx={{ color: "#c9aa71" }}>
                            <Groups />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
                <Tooltip title={isAdmin ? "Admin Panel" : "Admin Login"} placement="right">
                    <IconButton 
                        sx={{ color: user && isAdmin ? "#c9aa71" : "rgba(70, 70, 70, 0.5)" }} 
                        onClick={handleAdminClick}
                    >
                        <AdminPanelSettings />
                    </IconButton>
                </Tooltip>

                {isAdmin ? (
                    <Tooltip title="Logout" placement="right">
                        <IconButton sx={{ color: "#c9aa71" }} onClick={handleLogout}>
                            <Logout />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <></>
                )}
            </Box>
        </Drawer>
    );
}