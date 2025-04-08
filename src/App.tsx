import './App.css'
import {LandingPage} from "./components/landing-page/LandingPage.tsx";
import {ThemeProvider} from "@mui/material";
import theme from "../src/assets/theme.ts";

function App() {

    return (
        <ThemeProvider theme={theme}>
            <LandingPage/>
        </ThemeProvider>
    );
}

export default App
