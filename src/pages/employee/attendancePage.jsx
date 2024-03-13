import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/employee/sidebar';
import AuthCheckEmployee from '../../components/auth/AuthCheckEmployee';
import Attendance from '../../components/employee/attendance/attendance';

const AttendancePage = () => {

    return (
        <div>
            <AuthCheckEmployee/>
            <Navbar/>
            <Sidebar children={<Attendance/>}/>
        </div>
    );
};

export default AttendancePage;