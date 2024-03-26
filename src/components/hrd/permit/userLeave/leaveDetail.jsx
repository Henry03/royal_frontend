import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import ConfirmModal from '../../../confirmModal';
import toast, { Toaster } from 'react-hot-toast'
import { baseURL, convertDateFormat, formattedDate, formattedMonthYear, truncateText } from '../../../utils';
import Steps from '../../../steps';
import { set } from 'date-fns';
import Status from '../../../status';
import StatusLeavePermit from '../../../statusLeavePermit';

const LeaveDetail = ({fetchDataParent, id, ids}) => {
    const [dp, setDp] = useState([])
    const [eo, setEo] = useState([])
    const [al, setAl] = useState([])
    const [note, setNote] = useState('')
    const [track, setTrack] = useState('')
    const [status, setStatus] = useState('')

    const fetchData = (e) => {
        e?.preventDefault()
        axios.get('/leavepermit/detail/'+id,
        {
            headers: {
                Authorization: localStorage.getItem('token')
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

    const updateData = (e) => {
        e?.preventDefault()

        toast.promise
        (
            axios.put('/leavepermit/cancel/'+id, {},
            {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }),
            {
                loading: 'Updating...',
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

    const download = async () => {
        toast.promise(
            axios.get(baseURL+'/leave/download?id='+id+'&ids='+ids,
            {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
                responseType: 'blob',
            }),
            {
                loading: 'Downloading...',
                success: (res) => {
                    const url = window.URL.createObjectURL(res.data);
                    const newTab = window.open(url, '_blank');

                        newTab.focus();
                        return 'Download Success';

                },
                error: (err) => {
                    console.log(err)
                    return 'Download Failed'
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
                    {
                        track == 6 && status == 1 &&
                        <a href={baseURL+'/leave/download?id='+id+'&ids='+ids} rel="noopener noreferrer" target="_blank">
                            <button className='btn btn-success w-full'>Download Permit</button>
                        </a>
                    }
                    {
                        status == 1 && track == 1 &&
                        <div className='grid grid-flow-col gap-5 mt-5'>
                            <button className='btn btn-warning w-full' onClick={()=>document.getElementById('confirmModal').showModal()}>Cancel</button>
                        </div>
                    }
                    
                </div>
                <Toaster 
                    position="top-right"
                />
                    <ConfirmModal title={'Cancel Permit Request'} desc={'Are you sure want to cancel this request?'} btn={'Yes'} btnAction={updateData} btnType={'btn-error'}/>
                
            </dialog>
        </>
    );
}

export default LeaveDetail;