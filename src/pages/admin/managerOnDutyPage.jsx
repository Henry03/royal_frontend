import ManagerOnDuty from "../../components/admin/managerOnDuty/managerOnDuty.jsx";
import AuthCheckAdmin from "../../components/auth/AuthCheckAdmin";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

const ManagerOnDutyPage = () => {
  return (
    <>
        <AuthCheckAdmin/>
        <Navbar/>
        <Sidebar children={<ManagerOnDuty/>}/>
    </>
  );
}

export default ManagerOnDutyPage;