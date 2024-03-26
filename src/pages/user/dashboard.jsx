import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar'; 
import AuthCheckAdmin from '../../components/auth/AuthCheckAdmin';
import DashboardHOD from '../../components/departementHead/dashboard/dashboardHOD';
import Dashboard from '../../components/hrd/dashboard/dashboard';


const DashboardPage = () => {
    const role = localStorage.getItem('role')
    return (
        <div>
            <AuthCheckAdmin/>
            <Navbar/>
            <Sidebar children={
                role == 6 ?
                <Dashboard/> 
                :<DashboardHOD/>
            }/>
        </div>
    );
};

export default DashboardPage;