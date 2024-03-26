import Logo from '../assets/logo.png';
import { MdPeopleAlt, MdSpaceDashboard, MdChecklist, MdCalendarMonth, MdForkRight, MdOutlineWork, MdWorkOff } from 'react-icons/md'
import { FaBusinessTime, FaUserGear } from 'react-icons/fa6'
import { TbApi } from "react-icons/tb";
import { FaCoffee } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Sidebar = ({children}) => {
    if(!localStorage.getItem('role') ){
        window.location.href = '/loginadmin'
    }
    
    const role = localStorage.getItem('role')

    return (
        <>
            <div className="drawer lg:drawer-open bg-base-200 min-h-max">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content h-[calc(100vh-4rem)] overflow-scroll ">
                    { children }
                </div> 
                <div className="drawer-side lg:h-auto " style={{zIndex: '2'}}>
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                    
                    <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
                        <li className='mb-5 lg:mb-0'><a className="lg:hidden"><img src={Logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}/></a></li>
                        {
                            role == '6' ? 
                            <>
                                <li><Link to="/admin"><MdSpaceDashboard size="20"/>Dashboard</Link></li>
                                <li><Link to="/admin/staff"><MdPeopleAlt size="20"/>Staff</Link></li>
                                <li><Link to="/admin/user"><FaUserGear size="20"/>User</Link></li>
                                <li><Link to="/admin/attendance"><MdChecklist size="20"/>Attendance</Link></li>
                                <li><Link to="/admin/calendar"><MdCalendarMonth size="20"/>Calendar</Link></li>
                                <li>
                                    <details>
                                        <summary>
                                            <MdForkRight size={20}/>Request for Leave
                                        </summary>
                                        <ul className="p-2 bg-base-100 rounded-t-none">
                                            <li><Link to="/admin/staff/permit/outofduty">Out Of Duty</Link></li>
                                            <li><Link to="/admin/staff/permit/leave">Leave Permit</Link></li>
                                        </ul>
                                    </details>
                                </li>
                                <li><Link to="/admin/api/telegram"><TbApi size="20"/>API</Link></li>
                            </>
                            : role == '1' ?
                            <>
                                <li><Link to="/admin"><MdSpaceDashboard size="20"/>Dashboard</Link></li>
                                <li><Link to="/admin/mod"><MdOutlineWork size="20"/>Shift</Link></li>
                                <li><Link to="/admin/leavebalance"><MdWorkOff size="20"/>Leave Balance</Link></li>
                                <li><Link to="/admin/extraoff"><FaCoffee size="20"/>Extra Off</Link></li>
                                <li>
                                    <details>
                                        <summary>
                                            <MdForkRight size={20}/>My Request
                                        </summary>
                                        <ul className="p-2 bg-base-100 rounded-t-none">
                                            <li><Link to="/admin/permit/outofduty">Out Of Duty</Link></li>
                                            <li><Link to="/admin/permit/leave">Leave Permit</Link></li>
                                        </ul>
                                    </details>
                                </li>
                            </>
                            : role == '5' ?
                            <>
                                <li><Link to="/admin"><MdSpaceDashboard size="20"/>Dashboard</Link></li>
                                <li>
                                    <details>
                                        <summary>
                                            <MdForkRight size={20}/>Request for Leave
                                        </summary>
                                        <ul className="p-2 bg-base-100 rounded-t-none">
                                            <li><Link to="/admin/staff/permit/outofduty">Out Of Duty</Link></li>
                                            <li><Link to="/admin/staff/permit/leave">Leave Permit</Link></li>
                                        </ul>
                                    </details>
                                </li>
                            </> 
                            :
                            <>
                                <li><Link to="/admin"><MdSpaceDashboard size="20"/>Dashboard</Link></li>
                                <li>
                                    <details>
                                        <summary>
                                            <MdForkRight size={20}/>Staff Request
                                        </summary>
                                        <ul className="p-2 bg-base-100 rounded-t-none">
                                            <li><Link to="/admin/staff/permit/outofduty">Out Of Duty</Link></li>
                                            <li><Link to="/admin/staff/permit/leave">Leave Permit</Link></li>
                                        </ul>
                                    </details>
                                </li>
                                <li>
                                    <details>
                                        <summary>
                                            <MdForkRight size={20}/>My Request
                                        </summary>
                                        <ul className="p-2 bg-base-100 rounded-t-none">
                                            <li><Link to="/admin/permit/outofduty">Out Of Duty</Link></li>
                                            <li><Link to="/admin/permit/leave">Leave Permit</Link></li>
                                        </ul>
                                    </details>
                                </li>
                            </> 
                            
                        }
                    </ul>
                
                </div>
        </div>
        </>
    )
}

export default Sidebar;