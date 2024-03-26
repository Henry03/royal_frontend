import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import ConfirmModal from '../../confirmModal';
import toast, { Toaster } from 'react-hot-toast'

const AddEvent = ({fetchDataParent, fetchDataByDateParent}) => {
    const [date, setDate] = useState('')
    const [title, setTitle] = useState('')
    const [error, setError] = useState({})

    const storeData = (e) => {
        e?.preventDefault()
        const input = {
            Nama_libur: title,
            tgl_libur: date
        }   

        toast.promise
        (
            axios.post('/event/store', input,
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
                    fetchDataByDateParent()
                    defaultData()
                    document.getElementById('addEvent').close()
                    return res.data.message
                },
                error: (err) => {
                    console.log(err)
                    setError(err.response.data.errors)
                    return err.response.data.message
                }
            }
        )
    }

    const defaultData = () => {
        setTitle('')
        setDate('')
    }

    return (
        <>  
            <dialog id="addEvent" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={defaultData}>✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Add Event </h3>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Title</span>
                        </div>
                        <input type="text" placeholder="Title" className="input input-bordered w-full" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        {
                            error && error.Nama_libur &&
                            <label className="label-text-alt mt-1 text-red-500">{error.Nama_libur}</label>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Date</span>
                        </div>
                        <input type="date" placeholder="Date" className="input input-bordered w-full" value={date} onChange={(e)=>setDate(e.target.value)}/>
                        {
                            error && error.tgl_libur &&
                            <label className="label-text-alt mt-1 text-red-500">{error.tgl_libur}</label>
                        }
                    </label>
                    <div className='grid grid-flow-col gap-5 mt-5'>
                        <button className='btn btn-success w-full' onClick={(e)=>storeData(e)}>Save</button>
                    </div>
                    
                </div>
                <Toaster 
                position="top-right"
            />
            </dialog>
        </>
    );
}

export default AddEvent;