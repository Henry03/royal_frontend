
import ExtraOff from "../../components/admin/extraOff/extraOff";
import AuthCheckAdmin from "../../components/auth/AuthCheckAdmin";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

const ExtraOffPage = () => {
    return (
        <div className="min-h-dvh">
            <AuthCheckAdmin/>
            <Navbar/>
            <Sidebar children={<ExtraOff/>}/>
        </div>
    );
}

export default ExtraOffPage;