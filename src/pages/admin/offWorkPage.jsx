
import OffWork from "../../components/admin/offWork/offWork";
import AuthCheckAdmin from "../../components/auth/AuthCheckAdmin";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

const OffWorkPage = () => {
    return (
        <div className="min-h-dvh">
            <AuthCheckAdmin/>
            <Navbar/>
            <Sidebar children={<OffWork/>}/>
        </div>
    );
}

export default OffWorkPage;