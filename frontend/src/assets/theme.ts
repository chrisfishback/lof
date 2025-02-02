import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark", // Dark mode theme
        primary: { main: "#c9aa71" }, // Gold accents
        secondary: { main: "#1b3554" }, // Deep blue
        background: { default: "#0a0f1b", paper: "#111827" }, // Dark background
        text: { primary: "#e5e5e5", secondary: "#c9aa71" },
    },
    typography: {
        fontFamily: `"Merriweather", serif`, // Fantasy-style font
    },
});

export default theme;