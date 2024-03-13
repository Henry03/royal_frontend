import React from "react";
import AuthCheckAdmin from "../../../components/auth/AuthCheckAdmin";
import OutOfDuty from "../../../components/departementHead/permit/outofduty/outofDuty";
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import OutOfDutyHRD from "../../../components/hrd/permit/outofduty/outofDuty";
import DashboardHOD from "../../../components/departementHead/dashboard/dashboardHOD";

const dashboardHODPage = () => {
    const role = localStorage.getItem('role')
    return (
        <div>
            <AuthCheckAdmin/>
            <Navbar/>
            <Sidebar children={
                <DashboardHOD/>
            }/>
        </div>
    );
}

export default dashboardHODPage;