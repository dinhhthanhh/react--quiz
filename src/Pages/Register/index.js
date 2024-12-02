import { checkExits, getAllUser, register } from "../../service/userService";
import "./register.scss";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { generateRandomString } from "../../helper/generate";
import { deleteAllCookie } from "../../helper/cookie";

function Register() {
    deleteAllCookie();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputShowPassWord = useRef();
    const inputShowConfirmPassword = useRef();
    const [isPasswordVisible,setPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [countUSer,setDataCountUSer] = useState(0);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
        inputShowPassWord.current.type = isPasswordVisible ? 'password' : 'text';
    }

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!isConfirmPasswordVisible);
        inputShowConfirmPassword.current.type = isConfirmPasswordVisible ? 'password' : 'text';
    }

    useEffect(()=>{
        const fetchApi = async () => {
            const result = await getAllUser();
            setDataCountUSer(result.length);
        }
        fetchApi();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const ConfirmPassword = e.target[3].value;
        if(password != ConfirmPassword){
            alert("Your confirmation password is not the same as yours!")
        }else{
            const checkExitsEmail = await checkExits("email",email);
            if(checkExitsEmail.length > 0){
                alert("Email exist!");
            }else{
                const option = {
                    fullName: fullName,
                    email: email,
                    password: password,
                    token: generateRandomString(20),
                    id: (countUSer + 1).toString()
                }
                const response = await register(option);
                if(response){
                    navigate("/login");
                }else{
                    alert("Registration failed!")
                }
            }
        }
    }

    return (
        <div className="login">
            <form className="login__form" onSubmit={handleSubmit}>
                <h2 className="login__title">Sign up</h2>
                <div className="login__field">
                    <input type="fullName" placeholder="Enter FullName"  class="login__input" required/>
                </div>
                <div className="login__field">
                    <input type="email" placeholder="Enter email" className="login__input" required/>
                </div>
                <div className="login__field">
                    <input
                        ref={inputShowPassWord}
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder="Enter password"
                        className="login__input"
                        required
                    />
                    <i
                        className={`fa-regular ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'} login__toggle`}
                        onClick={togglePasswordVisibility}
                    ></i>
                </div>
                <div className="login__field">
                    <input
                        ref={inputShowConfirmPassword}
                        type={isConfirmPasswordVisible ? 'text' : 'password'}
                        placeholder="Cofirm your password"
                        className="login__input"
                        required
                    />
                    <i
                        className={`fa-regular ${isConfirmPasswordVisible ? 'fa-eye-slash' : 'fa-eye'} login__toggle`}
                        onClick={toggleConfirmPasswordVisibility}
                    ></i>
                </div>
                <button type="submit" className="login__button">Register</button>
            </form>
        </div>
    );
}

export default Register;