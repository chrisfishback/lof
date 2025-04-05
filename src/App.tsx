import './App.css'
import {LandingPage} from "./components/landing-page/LandingPage.tsx";
import {BrowserRouter, Routes, Route} from "react-router";
import {ThemeProvider} from "@mui/material";
import theme from "../src/assets/theme.ts";

function App() {

    return (
        <ThemeProvider theme={theme}>
            {/* <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<LandingPage/>}/>
                </Routes>
            </BrowserRouter> */}
            <LandingPage/>
        </ThemeProvider>
    );
}

export default App
