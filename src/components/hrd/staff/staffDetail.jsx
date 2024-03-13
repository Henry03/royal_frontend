import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import ConfirmModal from '../../confirmModal';
import toast, { Toaster } from 'react-hot-toast'

const StaffDetail = ({id, fetchDataParent}) => {
    const [data, setData] = useState({})
    const [dataUnit, setDataUnit] = useState([{}])
    const [units, setUnits] = useState([])
    const [positions, setPositions] = useState([])
    const [idStaff, setIdStaff] = useState('')
    const [name, setName] = useState('')
    const [nik, setNik] = useState('')
    const [unit, setUnit] = useState('')
    const [position, setPosition] = useState('')
    const [startDate, setStartDate] = useState('06/02/2013')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isEdit, setIsEdit] = useState(true) 
    const [error, setError] = useState({})

    const fetchData = (e) => {
        e?.preventDefault()
        const input = {
            id: id
        }

        axios.get('/unit',
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            setDataUnit(res.data.data)
            
        })

        axios.post('/staff/detail', input,
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        })  
        .then(res => {
            setData(res.data.data)
        })
    }

    const updateData = (e) => {
        e?.preventDefault()
        const input = {
            FID: id,
            Nama: name,
            NIK: nik,
            DEPT_NAME: unit,
            JABATAN: position,
            TGL_MASUK: startDate,
            Notelp: phoneNumber
        }   

        toast.promise
        (
            axios.post('/staff/update', input,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }),
            {
                loading: 'Updating...',
                success: (res) => {
                    console.log(res)
                    setIsEdit(!isEdit)
                    fetchDataParent()
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

    const deleteData = (e) => {
        e?.preventDefault()
        const input = {
            id: id
        }

        toast.promise (
            axios.post('/staff/delete', input,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }),
            {
                loading: 'Deleting...',
                success: (res) => {
                    fetchDataParent()
                    document.getElementById('staffDetail').close()
                    document.getElementById('confirmModal').close()
                    return res.data.message
                }
            }
        )
    }


    const formatDate = (dateString) => {
        if(dateString && dateString.includes('/')){
            const [day, month, year] = dateString.split('/'); // Split date string into day, month, and year
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`; // Format the date
        }
    };

    const handleMouseDown = (e) => {
        if(isEdit){
            e.preventDefault(); // Prevent mouse click
        }
    };

    const handleKeyDown = (e) => {
        if(isEdit){
            e.preventDefault(); // Prevent keyboard input
        }
    };

    const cancel = (e) => {
        e.preventDefault()

        setIdStaff(data.FID)
        setName(data.Nama)
        setNik(data.NIK)
        setUnit(data.DEPT_NAME)
        setPosition(data.JABATAN)
        setStartDate(data.TGL_MASUK)
        setPhoneNumber(data.Notelp)
        setIsEdit(!isEdit)
    }

    const unitsWithId = Array.from(new Set(dataUnit.map(item => item.unit)))
    .map(unit => {
        const item = dataUnit.find(item => item.unit === unit);
        return { unit, idUnit: item.idUnit };
    });

    useEffect(() => {
        setError({})
    },[isEdit])

    useEffect(() => {
        if(id){
            fetchData()
        }
    },[id])

    useEffect(() => {
        if(data){
            setIdStaff(data.FID)
            setName(data.Nama)
            setNik(data.NIK)
            setUnit(data.DEPT_NAME)
            setPosition(data.JABATAN)
            setStartDate(data.TGL_MASUK)
            setPhoneNumber(data.Notelp)
        }
    },[data])

    useEffect(() => {
        if(dataUnit){
            setUnits(unitsWithId)
        }
    },[dataUnit])

    useEffect(() => {
        const positionsTemp = dataUnit.filter(item => item.idUnit === unit).map(item => item.jabatan);
        setPositions(positionsTemp);
    },[unit, dataUnit])

    return (
        <>  
            <dialog id="staffDetail" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Staff Detail </h3>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">ID</span>
                        </div>
                        <input readOnly={isEdit} type="text" placeholder="Staff ID" className="input input-bordered w-full" value={idStaff} onChange={(e)=>setIdStaff(e.target.value)}/>
                        {
                            error.FID &&
                            <label className="label-text-alt mt-1 text-red-500">{error.FID}</label>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>
                        <input readOnly={isEdit} type="text" placeholder="Staff Name" className="input input-bordered w-full" value={name} onChange={(e)=>setName(e.target.value)}/>
                        {
                            error.Nama &&
                            <label className="label-text-alt mt-1 text-red-500">{error.Nama}</label>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">NIK</span>
                        </div>
                        <input readOnly={isEdit} type="text" placeholder="Staff NIK" className="input input-bordered w-full" value={nik} onChange={(e)=>setNik(e.target.value)}/>
                        {
                            error.NIK &&
                            <label className="label-text-alt mt-1 text-red-500">{error.NIK}</label>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Unit</span>
                        </div>
                        <select className="select select-bordered" value={unit} onChange={(e)=>setUnit(e.target.value)} onMouseDown={(e)=>handleMouseDown(e)} onKeyDown={(e)=>handleKeyDown(e)}>
                            {
                                units.map((item, index) => {
                                    return(
                                        <option key={index} value={item.idUnit}>{item.unit}</option>
                                    )
                                })
                            }
                        </select>   
                        {
                            error.DEPT_NAME &&
                            <label className="label-text-alt mt-1 text-red-500">{error.DEPT_NAME}</label>
                        }
                    </label>
                    {
                        unit &&
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Position</span>
                            </div>
                            <select className="select select-bordered" value={position} onChange={(e)=>setPosition(e.target.value)} onMouseDown={(e)=>handleMouseDown(e)} onKeyDown={(e)=>handleKeyDown(e)}>
                                {
                                    positions.map((item, index) => {
                                        return(
                                            <option key={index}>{item}</option>
                                        )
                                    })
                                }
                            </select>   
                            {
                                error.JABATAN &&
                                <label className="label-text-alt mt-1 text-red-500">{error.JABATAN}</label>
                            }
                        </label>
                    }
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Start Date</span>
                        </div>
                        <input readOnly={isEdit} type="date" placeholder="Start Date" className="input input-bordered w-full" value={formatDate(startDate)} onChange={(e)=>setStartDate(e.target.value)}/>
                        {
                            error.TGL_MASUK &&
                            <label className="label-text-alt mt-1 text-red-500">{error.TGL_MASUK}</label>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Phone Number</span>
                        </div>
                        <input readOnly={isEdit} type="text" placeholder="Phone Number Not Available" className="input input-bordered w-full" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
                        {
                            error.Notelp &&
                            <label className="label-text-alt mt-1 text-red-500">{error.Notelp}</label>
                        }
                    </label>
                    {
                        isEdit &&
                        <div className='grid grid-flow-col gap-5 mt-5'>
                            <button className='btn btn-warning w-full' onClick={()=>setIsEdit(!isEdit)}>Edit</button>
                            <button className='btn btn-error w-full' onClick={()=>document.getElementById('confirmModal').showModal()}>Delete</button>
                        </div>
                    }
                    {
                        !isEdit &&
                        <div className='grid grid-flow-col gap-5 mt-5'>
                            <button className='btn w-full' onClick={(e)=>cancel(e)}>Cancel</button>
                            <button className='btn btn-success w-full' onClick={(e)=>updateData(e)}>Save</button>
                        </div>
                    }
                </div>
                <Toaster 
                position="top-right"
                toastOptions={{
                    duration:2000
                }}
            />
            </dialog>
            <Toaster 
                position="top-right"
            />
            <ConfirmModal title={"Delete Staff"} desc={"Are you sure want to delete this staff data?"} btn={"Delete"} btnAction={deleteData} btnType={"btn-error"}/>
            
        </>
    );
}

export default StaffDetail;