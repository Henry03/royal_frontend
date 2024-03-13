import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/employee/sidebar';
import AuthCheckEmployee from '../../components/auth/AuthCheckEmployee';
import Dashboard from '../../components/employee/dashboard/dashboard';


const DashboardEmployeePage = () => {

    return (
        <div>
            <AuthCheckEmployee/>
            <Navbar/>
            <Sidebar children={<Dashboard/>}/>
        </div>
    );
};

export default DashboardEmployeePage;