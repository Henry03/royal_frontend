import React from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import AuthCheckAdmin from "../../components/auth/AuthCheckAdmin";
import OutOfDuty from "../../components/permit/outofduty/outofDuty";

const OutOfDutyUserPage = () => {
    const role = localStorage.getItem('role')
    return (
        <div>
            <AuthCheckAdmin/>
            <Navbar/>
            <Sidebar children={
                <OutOfDuty/>
            }/>
        </div>
    );
}

export default OutOfDutyUserPage;