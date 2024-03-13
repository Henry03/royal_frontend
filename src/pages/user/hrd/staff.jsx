import AuthCheckAdmin from "../../../components/auth/AuthCheckAdmin";
import Sidebar from "../../../components/sidebar";
import Staff from "../../../components/hrd/staff/staff";
import Navbar from "../../../components/navbar";


const StaffPages = () => {
    return (
        <>
            <AuthCheckAdmin/>
            <Navbar/>
            <Sidebar children={<Staff/>}/>
        </>
    )
}

export default StaffPages