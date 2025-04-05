import {Box, Button, Drawer, IconButton, Typography} from "@mui/material";
import {Groups, Home, AdminPanelSettings} from "@mui/icons-material";
import { useNavigate } from "react-router";

export function LandingPageSideBar() {

    let navigate = useNavigate();
    const DRAWER_WIDTH = 70;

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
                    borderRight: "2px solid #c9aa71",
                },
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Button sx={{mb: 2}}>
                    <Typography variant="h5" sx={{fontWeight: "bold", color: "#c9aa71"}}>
                        lof
                    </Typography>
                </Button>
                <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                    <IconButton sx={{color: "#c9aa71"}}>
                        <Home/>
                    </IconButton>
                    <IconButton sx={{color: "#c9aa71"}}>
                        <Groups/>
                    </IconButton>
                </Box>
            </Box>
            <IconButton sx={{color: "#c9aa71"}} onClick={() => {navigate('/admin')}}>
                <AdminPanelSettings />
            </IconButton>
        </Drawer>
    );
}