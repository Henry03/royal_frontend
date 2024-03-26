import React, { useState } from 'react';
import AuthCheckAdmin from "../../../components/auth/AuthCheckAdmin";
import Navbar from '../../../components/navbar';
import Sidebar from '../../../components/sidebar';
import ApiTelegram from '../../../components/api/telegram/api';

const TelegramPage = () => {

    return (
        <div>
            <AuthCheckAdmin/>
            <Navbar/>
            <Sidebar children={<ApiTelegram/>}/>
        </div>
    );
};

export default TelegramPage;