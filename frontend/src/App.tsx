import './App.css'
import {LandingPage} from "./components/landing-page/LandingPage.tsx";
import {BrowserRouter, Routes, Route} from "react-router";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<LandingPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
