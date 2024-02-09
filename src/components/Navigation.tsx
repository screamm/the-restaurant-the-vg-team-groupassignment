import { NavLink } from "react-router-dom";

export const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to={"/"}>Start</NavLink>
                </li>
                <li>
                    <NavLink to={"/booking"}>Bokning</NavLink>
                </li>
                <li>
                    <NavLink to={"/contact"}>Kontakt</NavLink>
                </li>
                <li>
                    <NavLink to={"/admin"}>Admin</NavLink>
                </li>
            </ul>
        </nav>
    );
};