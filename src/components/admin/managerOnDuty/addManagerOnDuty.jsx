import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import ConfirmModal from '../../confirmModal';
import toast, { Toaster } from 'react-hot-toast'

const AddManagerOnDuty = ({fetchDataParent}) => {
    const [date, setDate] = useState('')
    const [data, setData] = useState([])
    const [staff, setStaff] = useState('')
    const [type, setType] = useState('')
    const [error, setError] = useState({})

    const fetchData = (e) => {
        e?.preventDefault()
        axios.get('/staff/department',
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            setData(res.data.data)
        })
    }
    const storeData = (e) => {
        e?.preventDefault()
        const input = {
            id_staff: staff,
            date: date,
            type: type
        }   

        toast.promise
        (
            axios.post('/user/manageronduty/store', input,
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
                    defaultData()
                    document.getElementById('addMOD').close()
                    return res.data.message
                },
                error: (err) => {
                    console.log(err)
                    if(err.response){
                        setError(err.response.data.errors)
                        return err.response.data.message
                    }
                    return "Unexpected error"
                }
            }
        )
    }

    const defaultData = () => {
        setStaff('')
        setDate('')
    }

    useEffect (() => {
        fetchData()
    }, [])

    return (
        <>  
            <dialog id="addMOD" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={defaultData}>✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Add MOD </h3>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Staff</span>
                        </div>
                        <select className="select select-bordered" value={staff} onChange={(e)=>setStaff(e.target.value)}>
                            <option value="" hidden>Choose Staff</option>
                            {
                                data.map((item, index) => {
                                    return(
                                        <option key={index} value={item.FID}>{item.Nama}</option>
                                    )
                                })
                            }
                        </select>   
                        {
                            error.id_staff &&
                            <label className="label-text-alt mt-1 text-red-500">{error.id_staff}</label>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Type</span>
                        </div>
                        <select className="select select-bordered" value={type} onChange={(e)=>setType(e.target.value)}>
                            <option value="" hidden>Choose Type</option>
                            <option value="MOD">Manager On Duty</option>
                            <option value="InCharge">In Charge</option>
                        </select>   
                        {
                            error.id_staff &&
                            <label className="label-text-alt mt-1 text-red-500">{error.id_staff}</label>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Date</span>
                        </div>
                        <input type="date" placeholder="Date" className="input input-bordered w-full" value={date} onChange={(e)=>setDate(e.target.value)}/>
                        {
                            error.date &&
                            <label className="label-text-alt mt-1 text-red-500">{error.date}</label>
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
            <Toaster 
                    position="top-right"
                />
        </>
    );
}

export default AddManagerOnDuty;