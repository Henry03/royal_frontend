import SwitchMode from "./switchMode";
import Logo from '../assets/logo.png';
import { FiMenu } from 'react-icons/fi';
import axios from "axios";

const logout = () => {
    if(localStorage.getItem('token') != null) {
        axios.get('/logout', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .then(res => {
            localStorage.removeItem('token');
            window.location.href = '/login';
        })
    }else if(localStorage.getItem('admin-token') != null) {
        axios.get('/admin/logout', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            localStorage.removeItem('admin-token');
            localStorage.removeItem('role');
            window.location.href = '/admin/login';
        })
    }else{
        window.location.href = '/';
        localStorage.removeItem('token');
        localStorage.removeItem('admin-token');
    }
    
}

const Navbar = () => {
    return (
        <>
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden"><FiMenu/></label>
                <a className="btn btn-ghost text-xl hidden lg:block"><img src={Logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}/></a>
            </div>
            <div className="flex-none">
                <SwitchMode/>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                        <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                        </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a onClick={logout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
        
        </>
    );
}

export default Navbar;