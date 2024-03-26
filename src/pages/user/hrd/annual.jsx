import AuthCheckAdmin from "../../../components/auth/AuthCheckAdmin";
import Sidebar from "../../../components/sidebar";
import Staff from "../../../components/hrd/staff/staff";
import Navbar from "../../../components/navbar";
import AttendanceHRD from "../../../components/hrd/attendance/attendance";
import Annual from "../../../components/hrd/annualLeave/annual";


const AnnualPage = () => {
    return (
        <>
            <AuthCheckAdmin/>
            <Navbar/>
            <Sidebar children={<Annual/>}/>
        </>
    )
}

export default AnnualPage