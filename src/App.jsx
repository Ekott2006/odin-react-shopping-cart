import {Link, NavLink, Outlet, useLoaderData} from "react-router-dom";
import "./css/App.css";
import {useState} from "react";
import Image from "./assets/pexels-shattha-pilabut-38930-135620.jpg";

function App() {
    const [cart, setCart] = useState({});
    return (
        <div
            id="app"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${Image})`,
            }}
        >
            <header>
                <nav>
                    <h2>
                        <Link to="/"> Amazon Clone </Link>
                    </h2>
                    <ul>
                        <li>
                            <NavLink to={"/products"}> Products </NavLink>
                        </li>
                    </ul>
                    <ul className="header-right">
                        <li>Cart: {Object.values(cart).reduce((x, y) => x + y, 0)}</li>
                    </ul>
                </nav>
            </header>
            <div className="container">
                <Outlet context={{cart, setCart, data: useLoaderData()}}/>
            </div>
        </div>
    );
}

export default App;
