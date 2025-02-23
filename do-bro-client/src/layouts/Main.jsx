import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const Main = () => {
    return (
        <div>
            {/* MavBar */}
            <Navbar></Navbar>
            {/* OutLet */}
            <div className="min-h-[calc(100vh-306px)]">
                <Outlet></Outlet>
            </div>
            {/* Footer */}
            <Footer></Footer>
        </div>
    );
};

export default Main;