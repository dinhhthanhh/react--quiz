import { deleteAllCookie, setCookie } from "../../helper/cookie";
import { login } from "../../service/userService";
import "./login.scss";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../action/login";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputShowPassWord = useRef();
    const [isPasswordVisible,setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
        inputShowPassWord.current.type = isPasswordVisible ? 'password' : 'text';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const response = await login(email,password);
        if(response.length > 0){
            setCookie("id" , response[0].id , 1);
            setCookie("fullName",response[0].fullName,1);
            setCookie("email",response[0].email,1);
            setCookie("token",response[0].token,1);
            dispatch(checkLogin(true));
            navigate("/");
        }else{
            alert("Your password wrong!! Or don't exits email!!")
        }
    }

    return (
        <div className="login">
            <form className="login__form" onSubmit={handleSubmit}>
                <h2 className="login__title">Login</h2>
                <div className="login__field">
                    <input type="email" placeholder="Enter email" className="login__input" />
                </div>
                <div className="login__field">
                    <input
                        ref={inputShowPassWord}
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder="Enter password"
                        className="login__input"
                    />
                    <i
                        className={`fa-regular ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'} login__toggle`}
                        onClick={togglePasswordVisibility}
                    ></i>
                </div>
                <button type="submit" className="login__button">Login</button>
            </form>
        </div>
    );
}

export default Login;