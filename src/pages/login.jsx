import { useState, useRef, useEffect } from 'react'
import hotel from '../assets/royal_ambarrukmo.jpg'
import axios from 'axios';
import LoginNavbar from '../components/loginNavbar';
import Footer from '../components/footer';

const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const [login, setLogin] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [pin, setPin] = useState(['', '', '', '', '', '']);
    const pinInputs = useRef([]); 

    const [noTelp, setNoTelp] = useState('')
    const [data, setData] = useState({})
    const [error, setError] = useState('')

    const handlePinChange = (index, value) => {
        const newPin = [...pin];
        newPin[index] = value;
    
        // Move focus to the next input field if a character is entered
        if (value && value.length === 1 && index < pinInputs.current.length - 1) {
          pinInputs.current[index + 1].focus();
        }
    
        // Move focus to the previous input field if character is deleted
        if (!value && index > 0 && newPin[index - 1] !== '') {
          pinInputs.current[index - 1].focus();
        }
    
        setPin(newPin);
    };

    const submitLogin = (e) => {
        e.preventDefault()

        axios.post('/login', {no_telp: noTelp})
        .then(res => {
            console.log(res)
            setData(res.data.data)
            setLogin(true)
        })
        .catch(err => {
            console.log(err.response.data.message)
            setLogin(false)
            setError(err.response.data.message)
        })
    }

    const submitOTP = (e) => {
        e.preventDefault()

        const input = {
            no_telp: noTelp,
            otp: pin.join('')
        }

        axios.post('/otp', input)
        .then(res => {
            console.log(res)
            localStorage.setItem('token', res.data.data.token)
            window.location.href = '/';
        })
        .catch(err => {
            console.log(err.response.data.message)
            setError(err.response.data.message)
        })
    }
    
    useEffect(() => {
        if(data && data.otp){
            console.log(data.data)
            const whatsappLink = 'https://wa.me/62'+ noTelp.replace(/^0+/, '') +'?text=OTP anda adalah ' + data.otp; 
            window.open(whatsappLink, '_blank');
        }
    }, [data]);

    useEffect(() => {
        if(localStorage.getItem('token')){
            const token = localStorage.getItem('token')

            if(localStorage.getItem('admin-token')){
                localStorage.removeItem('admin-token')
            }

            axios.post('/authcheck', { token: token })
            .then((res) => {
                window.location.href = '/'
            })
            .catch((err) => {
                localStorage.removeItem('token')
                localStorage.removeItem('admin-token')
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
                            {
                                login == false ?
                                <>
                                    <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                                    <form onSubmit={(e) => submitLogin(e)}>

                                        <div className="mb-4">
                                            <label className="form-control mt-5 w-full">
                                                <div className="label">
                                                    <span className="label-text">Phone Number</span>
                                                </div>
                                                <input type="text" placeholder="08xxxx" className="input input-bordered w-full" onChange={(e)=>setNoTelp(e.target.value)}/>
                                                {
                                                    error && 
                                                    <div className="label">
                                                        <span className="label-text-alt text-red-500">{error}</span>
                                                    </div>
                                                }
                                                
                                            </label>
                                        </div>

                                        {/* <ErrorText styleClass="mt-8">{errorMessage}</ErrorText> */}
                                        <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Send OTP</button>
                                    </form>
                                </>
                                :
                                <>
                                    <h2 className='text-2xl font-semibold mb-2 text-center'>OTP Input</h2>
                                    <form onSubmit={(e) => submitOTP(e)}>   
                                        <div className="mb-4">
                                            <label className="form-control mt-5 w-full grid align-middle justify-center">
                                                <div className="join">
                                                    <div className="flex space-x-2 sm:space-x-5" data-hs-pin-input>
                                                        {pin.map((value, index) => (
                                                        <input
                                                            key={index}
                                                            ref={el => pinInputs.current[index] = el}
                                                            className="block w-[38px] h-[38px] sm:w-[48px] sm:h-[48px] text-center border-gray-200 rounded-md text-lg placeholder:text-gray-300 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                                            type="text"
                                                            placeholder="○"
                                                            maxLength={1}
                                                            value={value}
                                                            onChange={e => handlePinChange(index, e.target.value)}
                                                        />
                                                        ))}
                                                    </div>
                                                </div>
                                                {
                                                    error && 
                                                    <div className="label">
                                                        <span className="label-text-alt text-red-500">{error}</span>
                                                    </div>
                                                }
                                            </label>
                                        </div>

                                        <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Send OTP</button>
                                    </form>
                                </>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default LoginPage