import { useState, useRef, useEffect } from 'react'
import {Link} from 'react-router-dom'
import SwitchMode from "../components/switchMode";
import Logo from '../assets/logo.png';
import { FiMenu } from 'react-icons/fi';
import hotel from '../assets/royal_ambarrukmo.jpg'
import axios from 'axios';
import LoginNavbar from '../components/loginNavbar';
import AuthCheckAdmin from '../components/auth/AuthCheckAdmin';
import Footer from '../components/footer';

const LoginAdminPage = () => {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const {username, password} = formData
    const [data, setData] = useState({})
    const [error, setError] = useState('')

    const submitLogin = (e) => {
        e.preventDefault()

        const input = {
            username: username,
            password: password
        }

        axios.post('/loginadmin', input)
        .then(res => {
            setData(res.data.data)
            localStorage.setItem('admin-token', res.data.token)
            localStorage.setItem('role', res.data.data.role)
            window.location.href = '/admin';
        })
        .catch(err => {
            console.log(err.response.data.message)
            setError(err.response.data.message)
        })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value})
    }

    useEffect(() => {
        if(localStorage.getItem('admin-token')){
            const token = localStorage.getItem('admin-token')

            if(localStorage.getItem('token')){
                localStorage.removeItem('token')
            }

            axios.get('/authcheckadmin', 
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
            )
            .then((res) => {
                window.location.href = '/admin/'
            })
            .catch((err) => {
                // localStorage.removeItem('token')
                // localStorage.removeItem('admin-token')
            })
        }

        else{
            localStorage.removeItem('token')
            localStorage.removeItem('admin-token')
        }
    },[])

    return (
        <>
            <LoginNavbar/>
            <div className="min-h-screen bg-cover bg-center flex items-center bg-opacity-50" style={{ backgroundImage: `url(${hotel})`}}>
                <div className="card mx-auto w-full max-w-xs sm:max-w-xl  shadow-xl">
                    <div className="bg-base-100 rounded-xl">
                        <div className='py-16 px-10'>

                            <h2 className='text-2xl font-semibold mb-2 text-center'>Admin Login</h2>
                            <form onSubmit={(e) => submitLogin(e)}>

                                <div className="mb-4">
                                    <label className="form-control mt-5 w-full">
                                        <div className="label">
                                            <span className="label-text">Username</span>
                                        </div>
                                        <input type="text" name='username' placeholder="Input Username" className="input input-bordered w-full mb-3" onChange={handleChange}/>
                                        <div className="label">
                                            <span className="label-text">Password</span>
                                        </div>
                                        <input type="password" name='password' placeholder="Input Password" className="input input-bordered w-full" onChange={handleChange}/>
                                        {
                                            error && 
                                            <div className="label">
                                                <span className="label-text-alt text-red-500">{error}</span>
                                            </div>
                                        }
                                        
                                    </label>
                                </div>

                                {/* <ErrorText styleClass="mt-8">{errorMessage}</ErrorText> */}
                                <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default LoginAdminPage