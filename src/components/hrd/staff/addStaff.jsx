import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import ConfirmModal from '../../confirmModal';
import toast, { Toaster } from 'react-hot-toast'

const AddStaff = ({fetchDataParent}) => {
    const [data, setData] = useState({})
    const [dataUnit, setDataUnit] = useState([{}])
    const [units, setUnits] = useState([])
    const [positions, setPositions] = useState([])
    const [name, setName] = useState('')
    const [nik, setNik] = useState('')
    const [unit, setUnit] = useState('')
    const [position, setPosition] = useState('')
    const [startDate, setStartDate] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isEdit, setIsEdit] = useState(true) 
    const [error, setError] = useState({})

    const fetchData = (e) => {
        e?.preventDefault()

        axios.get('/unit',
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            setDataUnit(res.data.data)
            
        })
    }

    const storeData = (e) => {
        e?.preventDefault()
        const input = {
            Nama: name,
            NIK: nik,
            DEPT_NAME: unit,
            JABATAN: position,
            TGL_MASUK: startDate,
            Notelp: phoneNumber
        }   

        toast.promise
        (
            axios.post('/staff/store', input,
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
                    defaultValue()
                    document.getElementById('addStaff').close()
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

    const formatDate = (dateString) => {
        if(dateString && dateString.includes('/')){
            const [day, month, year] = dateString.split('/'); // Split date string into day, month, and year
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`; // Format the date
        }
    };


    const unitsWithId = Array.from(new Set(dataUnit.map(item => item.unit)))
    .map(unit => {
        const item = dataUnit.find(item => item.unit === unit);
        return { unit, idUnit: item.idUnit };
    });

    const defaultValue = () => {
        setName('')
        setNik('')
        setUnit('')
        setPosition('')
        setStartDate('')
        setPhoneNumber('')
        setError({})
    }

    useEffect(() => {
        fetchData()
    },[])

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
            <dialog id="addStaff" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={defaultValue}>✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Staff Detail </h3>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>
                        <input type="text" placeholder="Staff Name" className="input input-bordered w-full" value={name} onChange={(e)=>setName(e.target.value)}/>
                        {
                            error && error.Nama &&
                            <label className="label-text-alt mt-1 text-red-500">{error.Nama}</label>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">NIK</span>
                        </div>
                        <input type="text" placeholder="Staff NIK" className="input input-bordered w-full" value={nik} onChange={(e)=>setNik(e.target.value)}/>
                        {
                            error && error.NIK &&
                            <label className="label-text-alt mt-1 text-red-500">{error.NIK}</label>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Unit</span>
                        </div>
                        <select className="select select-bordered" value={unit} onChange={(e)=>setUnit(e.target.value)}>
                            <option value={""} disabled>Select Unit</option>
                            {
                                units.map((item, index) => {
                                    return(
                                        <option key={index} value={item.idUnit}>{item.unit}</option>
                                    )
                                })
                            }
                        </select>   
                        {
                            error && error.DEPT_NAME &&
                            <label className="label-text-alt mt-1 text-red-500">{error.DEPT_NAME}</label>
                        }
                    </label>
                    {
                        unit &&
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Position</span>
                            </div>
                            <select className="select select-bordered" value={position} onChange={(e)=>setPosition(e.target.value)}>
                                <option value="" disabled>Select Position</option>
                                {
                                    positions.map((item, index) => {
                                        return(
                                            <option key={index}>{item}</option>
                                        )
                                    })
                                }
                            </select>   
                            {
                                error && error.JABATAN &&
                                <label className="label-text-alt mt-1 text-red-500">{error.JABATAN}</label>
                            }
                        </label>
                    }
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Start Date</span>
                        </div>
                        <input type="date" placeholder="Start Date" className="input input-bordered w-full" value={formatDate(startDate)} onChange={(e)=>setStartDate(e.target.value)}/>
                        {
                            error && error.TGL_MASUK &&
                            <label className="label-text-alt mt-1 text-red-500">{error.TGL_MASUK}</label>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Phone Number</span>
                        </div>
                        <input type="text" placeholder="Phone Number Not Available" className="input input-bordered w-full" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
                        {
                            error && error.Notelp &&
                            <label className="label-text-alt mt-1 text-red-500">{error.Notelp}</label>
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

export default AddStaff;