import React from "react";
import Sidebar from "../../components/sidebar";
import AuthCheckAdmin from "../../components/auth/AuthCheckAdmin";
import Navbar from "../../components/navbar";
import Leave from "../../components/permit/leave/leave";

const LeaveUserPage = () => {
    const role = localStorage.getItem('role')
    return (
        <div>
            <AuthCheckAdmin />
            <Navbar/>
            <Sidebar children={
                <Leave/>
            }/>
        </div>
    );
}

export default LeaveUserPage;