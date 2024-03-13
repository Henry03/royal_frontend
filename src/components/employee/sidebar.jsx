import Logo from '../../assets/logo.png';
import { MdPeopleAlt, MdSpaceDashboard, MdChecklist, MdCalendarMonth, MdForkRight } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Sidebar = ({children, role}) => {
    return (
        <>
            <div className="drawer lg:drawer-open bg-base-200" style={{ maxHeight: 'calc(100vh - 4rem)', overflowY: 'scroll' }}>
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    { children }
                </div> 
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                    
                    <ul className="menu p-5 gap-1 w-72 min-h-full bg-base-100 text-base-content">
                        <li className='mb-5 lg:mb-0'><a className="lg:hidden"><img src={Logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}/></a></li>
                        <li><Link to="/"><MdSpaceDashboard size="20"/>Dashboard</Link></li>
                        <li><Link to="/attendance"><MdChecklist size="20"/>Attendance</Link></li>
                        <li>
                            <details>
                                <summary>
                                    <MdForkRight size={20}/>Request for Leave
                                </summary>
                                <ul className="p-2 bg-base-100 rounded-t-none">
                                    <li><Link to="/permit/outofduty">Out Of Duty</Link></li>
                                    <li><Link to="/permit/leave">Leave Permit</Link></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                
                </div>
        </div>
        </>
    )
}

export default Sidebar;