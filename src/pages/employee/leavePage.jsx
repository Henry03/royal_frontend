import React from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/employee/sidebar";
import AuthCheckEmployee from "../../components/auth/AuthCheckEmployee";
import Leave from "../../components/employee/permit/leave/leave";

const LeavePage = () => {
    return (
        <div>
            <AuthCheckEmployee/>
            <Navbar/>
            <Sidebar children={<Leave/>}/>
        </div>
    );
}

export default LeavePage;