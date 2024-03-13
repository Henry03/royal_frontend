import React, { useEffect } from 'react';
import axios from 'axios';

function AuthCheckEmployee ({}) {

    useEffect(() => {
        if(localStorage.getItem('token')){
            const token = localStorage.getItem('token')

            if(localStorage.getItem('admin-token')){
                localStorage.removeItem('admin-token')
            }

            axios.post('/authcheck', { token: token })
            .then((res) => {
            })
            .catch((err) => {
                localStorage.removeItem('token')
                localStorage.removeItem('admin-token')
                window.location.href = '/login';
            })
        }

        else{
            localStorage.removeItem('token')
            localStorage.removeItem('admin-token')
            window.location.href = '/login';
        }
    },[])
}

export default AuthCheckEmployee;