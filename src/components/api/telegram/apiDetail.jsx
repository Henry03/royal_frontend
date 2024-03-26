import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import ConfirmModal from '../../confirmModal';
import toast, { Toaster } from 'react-hot-toast'
import ApiStatus from './_apiStatus';

const ApiTelegramDetail = ({id, fetchDataParent}) => {
    const [staff, setStaff] = useState({})
    const [session, setSession] = useState([])
    const [idSession, setIdSession] = useState('')

    const fetchData = (e) => {
        e?.preventDefault()
        const input = {
            id: id
        }

        axios.post('/telegram/session', input,
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        })  
        .then(res => {
            setStaff(res.data.staff)
            setSession(res.data.data)
        })
    }

    const activateSession = (e) => {
        e?.preventDefault()
        const input = {
            id: idSession,
        }   

        toast.promise
        (
            axios.post('/telegram/session/activate', input,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }),
            {
                loading: 'Activating...',
                success: (res) => {
                    fetchData()
                    return res.data.message
                },
                error: (err) => {
                    return err.response.data.message
                }
            }
        )
    }

    const revokeSession = (e) => {
        e?.preventDefault()
        const input = {
            id: idSession
        }

        toast.promise (
            axios.post('/telegram/session/revoke', input,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }),
            {
                loading: 'Revoking...',
                success: (res) => {
                    fetchData()
                    return res.data.message
                }
            }
        )
    }

    const banSession = (e) => {
        e?.preventDefault()
        const input = {
            id: idSession
        }

        toast.promise (
            axios.post('/telegram/session/ban', input,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }),
            {
                loading: 'Banning...',
                success: (res) => {
                    fetchData()
                    document.getElementById('confirmModal').close()
                    return res.data.message
                }
            }
        )
    }

    useEffect(() => {
        if(id){
            fetchData()
        }
    },[id])

    return (
        <>  
            <dialog id="staffDetail" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">User Session </h3>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>
                        <input readOnly type="text" placeholder="Staff Name" className="input input-bordered w-full" value={staff.name} onChange={(e)=>setName(e.target.value)}/>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Department</span>
                        </div>
                        <input readOnly type="text" placeholder="Staff Name" className="input input-bordered w-full" value={staff.Namaunit} onChange={(e)=>setName(e.target.value)}/>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Position</span>
                        </div>
                        <input readOnly type="text" placeholder="Staff Name" className="input input-bordered w-full" value={staff.position} onChange={(e)=>setName(e.target.value)}/>
                    </label>
                    <div className="card card-compact bg-base-100 mt-3 border">
                        <div className="card-body gap-0">
                            <h2 className="card-title">Session</h2>
                            {
                                session && session.length > 0 ?
                                <>
                                    {session.map((value, index) => (  
                                        <div key={index} className="card mt-3 bg-base-100 border">
                                            <div className="card-body gap-1">
                                                <div className="grid grid-flow-col justify-between">
                                                    <p className='text-md font-semibold'>{value.id}</p>
                                                    <ApiStatus status={value.status}/>
                                                </div>
                                                <div className='grid grid-flow-co grid-cols-3 mt-2'>
                                                    <p className='text-md'>First Name</p>
                                                    <p className='text-md'>: {value.first_name}</p>
                                                </div>
                                                <div className='grid grid-flow-col grid-cols-3'>
                                                    <p className='text-md'>Username</p>
                                                    <p className='text-md'>: {value.username}</p>
                                                </div>
                                                <div className='grid grid-flow-col grid-cols-3'>
                                                    <p className='text-md'>Phone Number</p>
                                                    <p className='text-md'>: {value.phone_number}</p>
                                                </div>
                                                {
                                                    value.status == "Active" ?
                                                    <div className='grid grid-flow-col grid-cols-2 gap-5 mt-3'>
                                                        <button className='btn btn-warning btn-sm w-full' onClick={(e)=>{revokeSession(e),setIdSession(value.id)}}>Revoke</button>
                                                        <button className='btn btn-error btn-sm w-full' onClick={()=>document.getElementById('confirmModal').showModal()}>Ban</button>
                                                    </div>
                                                    : value.status == "Banned" || value.status == "Inactive" ?
                                                    <div className='grid grid-flow-col gap-5 mt-3'>
                                                        <button className='btn btn-success btn-sm w-full' onClick={(e)=>{activateSession(e),setIdSession(value.id)}}>Activate</button>
                                                    </div>
                                                    : ''
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </>
                                : 
                                <div className='flex justify-center mt-3'>
                                    <p className='text-center'>No session available</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <Toaster 
                position="top-right"
            />
            </dialog>
            <ConfirmModal title={"Ban Session"} desc={"Are you sure want to ban this session?"} btn={"Ban Anyway"} btnAction={banSession} btnType={"btn-error"}/>
            
        </>
    );
}

export default ApiTelegramDetail;