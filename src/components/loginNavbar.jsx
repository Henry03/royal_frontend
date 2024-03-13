import SwitchMode from "./switchMode";
import Logo from '../assets/logo.png';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const LoginNavbar = () => {
    return (
        <>
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl"><img src={Logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}/></a>
            </div>
            <div className="flex-none md:me-10">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <details>
                        <summary>
                            Role
                        </summary>
                        <ul className="p-2 bg-base-100 rounded-t-none">
                            <li><Link to="/admin/login">Admin</Link></li>
                            <li><Link to="/login">Employee</Link></li>
                        </ul>
                        </details>
                    </li>
                </ul>
                <SwitchMode/>
            </div>
        </div>
        
        </>
    );
}

export default LoginNavbar;