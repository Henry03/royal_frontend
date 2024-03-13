import AuthCheckAdmin from "../../../components/auth/AuthCheckAdmin";
import Sidebar from "../../../components/sidebar";
import User from "../../../components/hrd/user/user";
import Navbar from "../../../components/navbar";


const UserPage = () => {
    return (
        <>
            <AuthCheckAdmin/>
            <Navbar/>
            <Sidebar children={<User/>}/>
        </>
    )
}

export default UserPage