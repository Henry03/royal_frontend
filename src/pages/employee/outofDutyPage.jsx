import React from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/employee/sidebar";
import AuthCheckEmployee from "../../components/auth/AuthCheckEmployee";
import OutOfDuty from "../../components/employee/permit/outofduty/outofDuty";

const OutOfDutyPage = () => {
    return (
        <div style={{ maxHeight: '100vh', overflowY: 'hidden' }}>
            <AuthCheckEmployee/>
            <Navbar/>
            <Sidebar children={<OutOfDuty/>}/>
        </div>
    );
}

export default OutOfDutyPage;