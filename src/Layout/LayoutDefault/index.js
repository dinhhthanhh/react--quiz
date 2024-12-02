import { Link, NavLink, Outlet } from "react-router-dom";
import "./layoutDefault.scss";
import { getCookie } from "../../helper/cookie";
import { useSelector } from "react-redux";

function LayoutDefault() {
    const token = getCookie("token");
    const isLogin = useSelector(state => state.loginReducer);
    return (
        <>
            <div className="layout-default">
                <header className="layout-default__header">
                    <div className="layout-default__logo">
                        <Link to="/">Quiz</Link>
                    </div>
                    <div className="layout-default__menu">
                        <ul>
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            {token && (
                                <>
                                    <li>
                                        <NavLink to="/topic">Topic</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/answer">Answer</NavLink>
                                    </li>
                                </>
                            )}
                            
                        </ul>
                    </div>

                    {token ? (
                        <>
                            <div className = "layout-default__account">
                                <NavLink to="/logout">Log Out</NavLink>
                            </div>
                        </>
                    ): (
                        <>
                            <div className = "layout-default__account">
                                <NavLink to = "/login">Login</NavLink>
                                <NavLink to="/register">Sign Up</NavLink>
                            </div>
                        </>
                    )}
                </header >
                <main className="layout-default__main">
                    <Outlet />
                </main>
                <footer className="layout-default__footer">
                    Copyright by ...
                </footer>
            </div >
        </>
    )
}
export default LayoutDefault; 