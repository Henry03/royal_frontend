import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import ConfirmModal from '../../../confirmModal';
import toast, { Toaster } from 'react-hot-toast'
import { convertDateFormat, formattedDate, formattedMonthYear, truncateText } from '../../../utils';
import Steps from '../../../steps';
import { set } from 'date-fns';
import Status from '../../../status';
import StatusLeavePermit from '../../../statusLeavePermit';

const LeaveDetailHOD = ({fetchDataParent, id}) => {
    const [dp, setDp] = useState([])
    const [eo, setEo] = useState([])
    const [al, setAl] = useState([])
    const [note, setNote] = useState('')
    const [track, setTrack] = useState('')
    const [status, setStatus] = useState('')

    const fetchData = (e) => {
        e?.preventDefault()
        axios.get('/user/leavepermit/detail/'+id,
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            setNote(res.data.data.note)
            setDp(res.data.dp)
            setEo(res.data.eo)
            setAl(res.data.al)
            setTrack(res.data.data.track)
            setStatus(res.data.data.status)
        })
    }

    const approve = (e, id) => {
        e?.preventDefault()

        toast.promise
        (
            axios.put('/user/leavepermit/approve/'+id, {},
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }),
            {
                loading: 'Approving...',
                success: (res) => {
                    console.log(res)
                    fetchDataParent()
                    fetchData()
                    document.getElementById('confirmModal').close()
                    return res.data.message
                },
                error: (err) => {
                    console.log(err)
                    return err.message
                }
            }
        )
    }

    const rejectDp = (e, id) => {
        e?.preventDefault()

        toast.promise
        (
            axios.put('/user/leavepermit/reject/dp/'+id, {},
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }),
            {
                loading: 'Rejecting...',
                success: (res) => {
                    console.log(res)
                    fetchDataParent()
                    fetchData()
                    document.getElementById('confirmModal').close()
                    return res.data.message
                },
                error: (err) => {
                    console.log(err)
                    return err.message
                }
            }
        )
    }

    const rejectEo = (e, id) => {
        e?.preventDefault()

        toast.promise
        (
            axios.put('/user/leavepermit/reject/eo/'+id, {},
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }),
            {
                loading: 'Rejecting...',
                success: (res) => {
                    console.log(res)
                    fetchDataParent()
                    fetchData()
                    document.getElementById('confirmModal').close()
                    return res.data.message
                },
                error: (err) => {
                    console.log(err)
                    return err.message
                }
            }
        )
    }

    const rejectAl = (e, id) => {
        e?.preventDefault()
        toast.promise
        (
            axios.put('/user/leavepermit/reject/al/'+id, {},
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }),
            {
                loading: 'Rejecting...',
                success: (res) => {
                    console.log(res)
                    fetchDataParent()
                    fetchData()
                    document.getElementById('confirmModal').close()
                    return res.data.message
                },
                error: (err) => {
                    console.log(err)
                    return err.message
                }
            }
        )
    }

    const reject = (e, id) => {
        e?.preventDefault()

        toast.promise
        (
            axios.put('/user/leavepermit/reject/'+id, {},
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }),
            {
                loading: 'Rejecting...',
                success: (res) => {
                    console.log(res)
                    fetchDataParent()
                    fetchData()
                    document.getElementById('confirmModal').close()
                    return res.data.message
                },
                error: (err) => {
                    console.log(err)
                    return err.message
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
            <dialog id="leaveDetail" className="modal">
            <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Leave Request Detail </h3>
                    <div className='grid grid-flow-row gap-3 items-center'>
                        <div className="card card-compact bg-base-100 mt-3 border">
                            <div className="card-body gap-0">
                                <h2 className="card-title">Day Payment Request</h2>
                                {
                                    dp.length > 0 ?
                                    <>
                                        {dp.map((value, index) => (  
                                            <div key={index} className="card mt-3 bg-base-100 border">
                                                <div className="card-body">
                                                    <div className="grid grid-flow-col justify-between">
                                                        <h2 className="text-lg font-semibold">{new Date(value.date_replace).toLocaleString('en-SG', formattedDate)}</h2>
                                                        <StatusLeavePermit status={status} track={track} approval={value.approval}/>
                                                    </div>
                                                    <p>MOD / Incharge : {new Date(value.date).toLocaleString('en-SG', formattedDate)}</p>
                                                    {
                                                        value.approval == 1 && track == 1 &&
                                                        <button className="btn btn-error btn-sm" onClick={(e)=>rejectDp(e, value.id)}>Reject</button>
                                                    }
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                    :
                                    <div className='flex justify-center mt-3'>
                                        <p className='text-center'>No available Day Payment Quota</p>
                                    </div>
                                }
                            </div>
                        </div>
                        
                        <div className="card card-compact bg-base-100 mt-3 border">
                            <div className="card-body gap-0">
                                <h2 className="card-title">Extra Off Request</h2>
                                {
                                    eo.length > 0 ?
                                    <>
                                        {eo.map((value, index) => (  
                                            <div key={index} className="card mt-3 bg-base-100 border">
                                                <div className="card-body">
                                                    <div className="grid grid-flow-col justify-between">
                                                        <h2 className="text-lg font-semibold">{new Date(value.date_replace).toLocaleString('en-SG', formattedDate)}</h2>
                                                        <StatusLeavePermit status={status} track={track} approval={value.approval}/>
                                                    </div>
                                                    <p>Leave Entitilement : {new Date(value.date).toLocaleString('en-SG', formattedMonthYear)}</p>
                                                    {
                                                        value.approval == 1 && track == 1 &&
                                                        <button className="btn btn-error btn-sm" onClick={(e)=>rejectEo(e, value.id)}>Reject</button>
                                                    }
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                    : 
                                    <div className='flex justify-center mt-3'>
                                        <p className='text-center'>No available Extra Off Quota</p>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="card card-compact bg-base-100 mt-3 border">
                            <div className="card-body gap-0">
                                <h2 className="card-title">Annual Leave Request</h2>
                                {
                                    al.length > 0 ?
                                    <>
                                        {al.map((value, index) => (  
                                            <div key={index} className="card mt-3 bg-base-100 border">
                                                <div className="card-body">
                                                    <div className="grid grid-flow-col justify-between">
                                                        <h2 className="text-lg font-semibold">{new Date(value.date_replace).toLocaleString('en-SG', formattedDate)}</h2>
                                                        <StatusLeavePermit status={status} track={track} approval={value.approval}/>
                                                    </div>
                                                    <p>Leave Entitilement : {new Date(value.date).toLocaleString('en-SG', formattedMonthYear)}</p>
                                                    {
                                                        value.approval == 1 && track == 1 &&
                                                        <button className="btn btn-error btn-sm" onClick={(e)=>rejectAl(e, value.id)}>Reject</button>
                                                    }
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                    :
                                    <div className='flex justify-center mt-3'>
                                        <p className='text-center'>No available Annual Leave Quota</p>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="card card-compact bg-base-100 mt-3 border">
                            <div className="card-body gap-0">
                                <h2 className="card-title">Note</h2>
                                <textarea readOnly className="textarea textarea-bordered" placeholder="Give some note here" value={note}></textarea>
                            </div>
                        </div>
                        
                    </div>

                    <div className='my-4'>
                        <Steps track={track} status={status}/>   
                    </div>
                    <div>
                    {
                        status == 1 && track == 1 &&
                        <div className='grid grid-flow-col gap-5 mt-5'>
                            <button className='btn btn-warning w-full' onClick={()=>document.getElementById('confirmModal').showModal()}>Reject</button>
                            <button className='btn btn-success w-full' onClick={(e)=>approve(e,id)}>Approve</button>
                        </div>
                    }

                    </div>
                    
                </div>
                <Toaster 
                    position="top-right"
                />
                    <ConfirmModal title={'Reject Permit Request'} desc={'Are you sure want to Reject this request?'} btn={'Yes'} btnAction={(e)=>reject(e, id)} btnType={'btn-error'}/>
                
            </dialog>
        </>
    );
}

export default LeaveDetailHOD;