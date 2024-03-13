import React from "react";
import AuthCheckAdmin from "../../../components/auth/AuthCheckAdmin";
import OutOfDuty from "../../../components/departementHead/permit/outofduty/outofDuty";
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import OutOfDutyHRD from "../../../components/hrd/permit/outofduty/outofDuty";

const OutOfDutyUserPage = () => {
    const role = localStorage.getItem('role')
    return (
        <div>
            <AuthCheckAdmin/>
            <Navbar/>
            <Sidebar children={
                role == 6 ?
                <OutOfDutyHRD/>
                :<OutOfDuty/>
            }/>
        </div>
    );
}

export default OutOfDutyUserPage;