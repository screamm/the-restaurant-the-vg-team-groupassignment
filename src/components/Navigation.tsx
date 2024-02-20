import { NavLink } from "react-router-dom";

export const Navigation = () => {
    return (
        <nav>
            <ul className="flex flex-row gap-10  ">
                <li>
                    <NavLink to={"/"} className="">Start</NavLink>
                </li>
                <li>
                    <NavLink to={"/booking"} className="">Bokning</NavLink>
                </li>
                <li>
                    <NavLink to={"/contact"} className="">Kontakt</NavLink>
                </li>
                <li>
                    <NavLink to={"/admin"} className="">Admin</NavLink>
                </li>
            </ul>
        </nav>
    );
};