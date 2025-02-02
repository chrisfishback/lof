import {Box, Button, Drawer, IconButton, Typography} from "@mui/material";
import {Groups, Home, Leaderboard} from "@mui/icons-material";

export function LandingPageSideBar() {

    const DRAWER_WIDTH = 64;

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
                    paddingY: 2,
                    backgroundColor: "#111827", // Dark sidebar
                    borderRight: "2px solid #c9aa71", // Gold border
                },
            }}
        >
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
                <IconButton sx={{color: "#c9aa71"}}>
                    <Leaderboard/>
                </IconButton>
            </Box>
            <Box sx={{height: 20}}/>
        </Drawer>
    );
}