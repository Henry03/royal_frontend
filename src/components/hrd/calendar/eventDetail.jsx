import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import ConfirmModal from '../../confirmModal';
import toast, { Toaster } from 'react-hot-toast'
import { convertDateFormat, truncateText } from '../../utils';

const EventDetail = ({fetchDataParent, fetchDataByDateParent, data, calendar, id}) => {
    const [date, setDate] = useState('')
    const [title, setTitle] = useState('')
    const [error, setError] = useState({})
    const [isEdit, setIsEdit] = useState(false)

    const fetchData = (e) => {
        e?.preventDefault()
        axios.get('/event/detail/'+id,
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            setTitle(res.data.data.Nama_libur)
            setDate(res.data.data.tgl_libur)
        })
    }

    const updateData = (e) => {
        e?.preventDefault()
        const input = {
            Nama_libur: title,
            tgl_libur: date
        }   

        toast.promise
        (
            axios.put('/event/update/'+id, input,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }),
            {
                loading: 'Updating...',
                success: (res) => {
                    fetchDataParent()
                    fetchDataByDateParent()
                    setIsEdit(!isEdit)
                    return res.data.message
                },
                error: (err) => {
                    setError(err.response.data.errors)
                    setIsEdit(!isEdit)
                    return err.response.data.message
                }
            }
        )
    }

    const deleteData = (e) => {
        e?.preventDefault()

        data.forEach(element => {
            // console.log(element.title)
            calendar.events.remove(element.id)
        });

        const input = {
            id: id
        }

        toast.promise (
        axios.post('/event/delete', input,
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        }),
        {
            loading: 'Deleting...',
            success: (res) => {
                fetchDataParent()
                fetchDataByDateParent()
                document.getElementById('eventDetail').close()
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

    const cancel = (e) => {
        e?.preventDefault()
        fetchData()
        setIsEdit(!isEdit)
    }

    useEffect(() => {
        if(id){
            fetchData()
        }
    },[id])

    return (
        <>  
            <dialog id="eventDetail" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>setIsEdit(false)}>✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Event Detail</h3>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Title</span>
                        </div>
                        <input readOnly={!isEdit} type="text" placeholder="Title" className="input input-bordered w-full" value={title} onChange={(e)=>{setTitle(truncateText(e.target.value, 50))}}/>
                        {
                            error.Nama_libur &&
                            <label className="label-text-alt mt-1 text-red-500">{error.Nama_libur}</label>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Date</span>
                        </div>
                        <input readOnly={!isEdit} type="date" placeholder="Date" className="input input-bordered w-full" value={convertDateFormat(date)} onChange={(e)=>setDate(e.target.value)}/>
                        {
                            error.tgl_libur &&
                            <label className="label-text-alt mt-1 text-red-500">{error.tgl_libur}</label>
                        }
                    </label>
                    {
                        !isEdit &&
                        <div className='grid grid-flow-col gap-5 mt-5'>
                            <button className='btn btn-warning w-full' onClick={()=>setIsEdit(!isEdit)}>Edit</button>
                            <button className='btn btn-error w-full' onClick={()=>document.getElementById('confirmModal').showModal()}>Delete</button>
                        </div>
                    }
                    {
                        isEdit &&
                        <div className='grid grid-flow-col gap-5 mt-5'>
                            <button className='btn w-full' onClick={(e)=>cancel(e)}>Cancel</button>
                            <button className='btn btn-success w-full' onClick={(e)=>updateData(e)}>Save</button>
                        </div>
                    }
                    
                </div>
                <Toaster 
                    position="top-right"
                />
                <ConfirmModal title={"Delete Event"} desc={"Are you sure want to delete this Event?"} btn={"Delete"} btnAction={deleteData} btnType={"btn-error"}/>
            
            </dialog>
        </>
    );
}

export default EventDetail;