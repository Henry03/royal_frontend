import AuthCheckAdmin from "../../../components/auth/AuthCheckAdmin";
import Sidebar from "../../../components/sidebar";
import Staff from "../../../components/hrd/staff/staff";
import Navbar from "../../../components/navbar";
import AttendanceHRD from "../../../components/hrd/attendance/attendance";


const AttendanceHRDPage = () => {
    return (
        <>
            <AuthCheckAdmin/>
            <Navbar/>
            <Sidebar children={<AttendanceHRD/>}/>
        </>
    )
}

export default AttendanceHRDPage