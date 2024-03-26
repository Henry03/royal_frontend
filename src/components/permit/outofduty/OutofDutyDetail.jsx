import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import ConfirmModal from '../../confirmModal';
import Steps from '../../steps';
import { baseURL, convertDateFormat } from '../../utils';

const OutofDutyDetail = ({fetchDataParent, id, ids}) => {
    const [destination, setDestination] = useState('')
    const [purpose, setPurpose] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [track, setTrack] = useState('')
    const [status, setStatus] = useState('')
    const [error, setError] = useState({})
    const [isEdit, setIsEdit] = useState(false)

    const fetchData = (e) => {
        e?.preventDefault()
        axios.get('/outofduty/user/detail/'+id,
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            setDestination(res.data.data.destination)
            setPurpose(res.data.data.purpose)
            setStart(convertDateFormat(res.data.data.start_date))
            setEnd(convertDateFormat(res.data.data.end_date))
            setTrack(res.data.data.track)
            setStatus(res.data.data.status)
        })
    }

    const updateData = (e) => {
        e?.preventDefault()

        toast.promise
        (
            axios.put('/outofduty/user/cancel/'+id, {},
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
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
                    // setError(err.data.errors)
                    return err.message
                }
            }
        )
    }

    const download = async () => {
        toast.promise(
            axios.get(baseURL+'/outofduty/download?id='+id+'&ids='+ids,
            {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
                responseType: 'blob',
            }),
            {
                loading: 'Downloading...',
                success: (res) => {
                    console.log(res)
                    const url = window.URL.createObjectURL(res.data);
                    const link = document.createElement('a');
                    link.href = url;
                    document.body.appendChild(link);
                    link.click();
                    return 'Download Success'
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
            <dialog id="outofDutyDetail" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>setIsEdit(false)}>✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Event Detail</h3>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Destination</span>
                        </div>
                        <input readOnly={!isEdit} type="text" placeholder="Where you go?" className="input input-bordered w-full" value={destination} onChange={(e)=>setDestination(e.target.value)}/>
                        {
                            error && error.destination &&
                            <label className="label-text-alt mt-1 text-red-500">{error.destination}</label>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Purpose</span>
                        </div>
                        <input readOnly={!isEdit} type="text" placeholder="Why go there?" className="input input-bordered w-full" value={purpose} onChange={(e)=>setPurpose(e.target.value)}/>
                        {
                            error && error.purpose &&
                            <label className="label-text-alt mt-1 text-red-500">{error.purpose}</label>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Start Date</span>
                        </div>
                        <input readOnly={!isEdit} type="datetime-local" placeholder="Date" className="input input-bordered w-full" value={start} onChange={(e)=>setStart(e.target.value)}/>
                        {
                            error && error.start_date &&
                            <label className="label-text-alt mt-1 text-red-500">{error.start_date}</label>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">End Date</span>
                        </div>
                        <input readOnly={!isEdit} type="datetime-local" placeholder="Date" className="input input-bordered w-full" value={end} onChange={(e)=>setEnd(e.target.value)}/>
                        {
                            error && error.end_date &&
                            <label className="label-text-alt mt-1 text-red-500">{error.end_date}</label>
                        }
                    </label>
                    <div className='my-4'>
                        <Steps track={track} status={status}/>
                    </div>
                    {
                        track == 6 && status == 1 &&
                        <a href={baseURL+'/outofduty/download?id='+id+'&ids='+ids} rel="noopener noreferrer" target="_blank">
                            <button className='btn btn-success w-full'>Download Permit</button>
                        </a>
                    }
                    {
                        track == 1 && status == 1 &&
                        <button className='btn btn-warning w-full' onClick={()=>document.getElementById('confirmModal').showModal()}>Cancel</button>
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

export default OutofDutyDetail;