import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import space from "../assets/image/wallpaper/scenery_1.jpg";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {message} from "../utils/message.jsx";
import {useDispatch} from "react-redux";
import useDocumentTitle from "../hooks/useDocumentTitle.jsx";
import {fetchResetPassword} from "../redux/slices/userSlice.jsx";
import {toast} from "react-toastify";

const ResetPassword = () => {
    useDocumentTitle("Reset password", true)
    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const handleTogglePassword = () => {
        setShowPassword((showPassword) => !showPassword)
    }
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)
    }
    const handleResetPassword = async e => {
        e.preventDefault()
        if (password.trim() === "" || confirmPassword.trim() === "") {
            toast.error(message.error.password.isEmpty)
            return
        } else if (password.trim() !== confirmPassword.trim()) {
            toast.error(message.error.password.confirm_password)
            return
        }
        const data = {
            token: token,
            password: password
        }
        const res =  await dispatch(fetchResetPassword({data})).unwrap()
        if (res && res.code === 200) {
            toast.success(res.message)
            navigate("")
        } else {
            toast.error(res.message)
        }
    }
    return (
        <section
            style={{
                backgroundImage: `url(${space})`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
                backgroundPosition: `center`
            }}
            className={`min-h-screen`}
        >
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full relative rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-[#423c5a80] shadow-signIn backdrop-blur-[33px] bg-blend-overlay">
                    <div className="p-6 space-y-8 md:space-y-10 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-center md:text-2xl text-white">
                            <div
                                className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p className="mx-4 mb-0 text-center font-semibold text-white text-lg">
                                    Đổi mật khẩu
                                </p>
                            </div>
                        </h1>
                        <form className="space-y-6 md:space-y-8">
                            <div className="relative mb-6">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400 peer"
                                    id="password"
                                    autoComplete={`off`}
                                    placeholder={" "}
                                    required={true}
                                    onChange={(e) => setPassword(e.target.value)
                                    }
                                />
                                <span
                                    className={`absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer`}
                                    onClick={handleTogglePassword}>
                                    {
                                        showPassword ?
                                            <AiFillEye className={`w-5 h-5 text-white`}/> :
                                            <AiFillEyeInvisible className={`w-5 h-5 text-white`}/>
                                    }
                                </span>
                                <label
                                    htmlFor="password"
                                    className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6">
                                    Mật khẩu mới
                                </label>
                            </div>
                            <div className="relative mb-6">
                                <input
                                    type={showConfirmPassword? "text" : "password"}
                                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400 peer"
                                    id="confirm-password"
                                    autoComplete={`off`}
                                    placeholder={" "}
                                    required={true}
                                    onChange={(e) => setConfirmPassword(e.target.value)
                                    }
                                />
                                <span
                                    className={`absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer`}
                                    onClick={handleToggleConfirmPassword}>
                                    {
                                        showConfirmPassword ?
                                            <AiFillEye className={`w-5 h-5 text-white`}/> :
                                            <AiFillEyeInvisible className={`w-5 h-5 text-white`}/>
                                    }
                                </span>
                                <label
                                    htmlFor="confirm-password"
                                    className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6">
                                    Nhập lại mật khẩu
                                </label>
                            </div>
                            <button type="submit"
                                    className="w-full text-dark bg-white hover:bg-primaryColor_hover hover:text-white duration-300 outline-none ring-0 border-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    onClick={handleResetPassword}>
                               Cập nhật mật khẩu
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResetPassword;