import { useNavigate } from "react-router-dom";
import { deleteAllCookie } from "../../helper/cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../../action/login";

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogout = useSelector(state => state.loginReducer);
    
    deleteAllCookie();
    
    useEffect(()=>{
        dispatch(checkLogin(false));
        navigate("/login");
    },[])

    return (
        <></>
    )
}
export default Logout;