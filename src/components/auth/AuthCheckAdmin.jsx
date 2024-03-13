import React, { useEffect } from 'react';
import axios from 'axios';

function AuthCheckAdmin ({}) {

    useEffect(() => {
        if(localStorage.getItem('admin-token')){
            const token = "Bearer " + localStorage.getItem('admin-token')

            if(localStorage.getItem('token')){
                localStorage.removeItem('token')
            }

            axios.get('/authcheckadmin', 
            { 
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                if(res.data.data.role != localStorage.getItem('role')){
                    localStorage.removeItem('admin-token')
                    localStorage.removeItem('role')
                    window.location.href = '/admin/login';
                }
            })
            .catch((err) => {
                localStorage.removeItem('admin-token')
                localStorage.removeItem('role')
                window.location.href = '/admin/login';
            })
        }

        else{
            localStorage.removeItem('token')
            localStorage.removeItem('admin-token')
            localStorage.removeItem('role')
            window.location.href = '/admin/login';
        }
    },[])
}

export default AuthCheckAdmin;