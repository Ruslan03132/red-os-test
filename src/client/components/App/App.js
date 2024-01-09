import { Routes, Route } from "react-router-dom";

import AuthPage from "../pages/AuthPage/AuthPage";
import BrowsePage from "../pages/BrowsePage/BrowsePage";
import MainPage from "../pages/MainPage/MainPage";
import NavigationPanel from "../NavigationPanel/NavigationPanel";

import styles from "./index.module.css";

function App() {
    return (
        <div className={styles.container}>
            <NavigationPanel></NavigationPanel>
            <Routes>
                <Route path="/" element={<MainPage />}></Route>

                <Route path="/login" element={<AuthPage />}></Route>

                <Route path="/browse" element={<BrowsePage />}></Route>
            </Routes>
        </div>
    );
}

export default App;
