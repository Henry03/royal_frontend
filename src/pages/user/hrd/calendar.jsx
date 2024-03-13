import AuthCheckAdmin from "../../../components/auth/AuthCheckAdmin";
import Sidebar from "../../../components/sidebar";
import Calendar from "../../../components/hrd/calendar/calendar";
import Navbar from "../../../components/navbar";


const CalendarPage = () => {
    return (
        <>
            <AuthCheckAdmin/>
            <Navbar/>
            <Sidebar children={<Calendar/>}/>
        </>
    )
}

export default CalendarPage