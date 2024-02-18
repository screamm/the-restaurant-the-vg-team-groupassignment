import { NavLink } from "react-router-dom";

export const Navigation = () => {
    return (
        <nav>
            <ul className="flex flex-row gap-10 border-2 border-gray-600 ">
                <li>
                    <NavLink to={"/"} className="border-2 border-gray-600">Start</NavLink>
                </li>
                <li>
                    <NavLink to={"/booking"} className="border-2 border-gray-600">Bokning</NavLink>
                </li>
                <li>
                    <NavLink to={"/contact"} className="border-2 border-gray-600">Kontakt</NavLink>
                </li>
                <li>
                    <NavLink to={"/admin"} className="border-2 border-gray-600">Admin</NavLink>
                </li>
            </ul>
        </nav>
    );
};