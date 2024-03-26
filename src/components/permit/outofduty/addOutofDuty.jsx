import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'

const AddOutofDuty = ({fetchDataParent}) => {
    const [destination, setDestination] = useState('')
    const [purpose, setPurpose] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [error, setError] = useState({})

    const storeData = (e) => {
        e?.preventDefault()
        const input = {
            destination: destination,
            purpose: purpose,
            start_date: start,
            end_date: end
        }   

        toast.promise
        (
            axios.post('/outofduty/user/store', input,
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
                    document.getElementById('addOutofDuty').close()
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
        setDestination('')
        setPurpose('')
        setStart('')
        setEnd('')
    }

    return (
        <>  
            <dialog id="addOutofDuty" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={defaultData}>✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Add Out of Duty Permit </h3>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Destination</span>
                        </div>
                        <input type="text" placeholder="Where you go?" className="input input-bordered w-full" value={destination} onChange={(e)=>setDestination(e.target.value)}/>
                        {
                            error && error.destination &&
                            <label className="label-text-alt mt-1 text-red-500">{error.destination}</label>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Purpose</span>
                        </div>
                        <input type="text" placeholder="Why go there?" className="input input-bordered w-full" value={purpose} onChange={(e)=>setPurpose(e.target.value)}/>
                        {
                            error && error.purpose &&
                            <label className="label-text-alt mt-1 text-red-500">{error.purpose}</label>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Start Date</span>
                        </div>
                        <input type="datetime-local" placeholder="Date" className="input input-bordered w-full" value={start} onChange={(e)=>setStart(e.target.value)}/>
                        {
                            error && error.start_date &&
                            <label className="label-text-alt mt-1 text-red-500">{error.start_date}</label>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">End Date</span>
                        </div>
                        <input type="datetime-local" placeholder="Date" className="input input-bordered w-full" value={end} onChange={(e)=>setEnd(e.target.value)}/>
                        {
                            error && error.end_date &&
                            <label className="label-text-alt mt-1 text-red-500">{error.end_date}</label>
                        }
                    </label>
                    <div className='grid grid-flow-col gap-5 mt-5'>
                        <button className='btn btn-success w-full' onClick={(e)=>storeData(e)}>Submit</button>
                    </div>
                    
                </div>
                <Toaster 
                position="top-right"
                toastOptions={{
                    duration:2000
                }}
            />
            </dialog>
        </>
    );
}

export default AddOutofDuty;