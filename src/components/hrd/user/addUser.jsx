import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'

const AddUser = ({id, fetchDataParent}) => {
    const [dataUnit, setDataUnit] = useState([{}])
    const [dataStaff, setDataStaff] = useState([{}])
    const [staffs, setStaffs] = useState([{}])
    const [units, setUnits] = useState([])
    const [staff, setStaff ] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [unit, setUnit] = useState('')
    const [role, setRole] = useState('')
    const [position, setPosition] = useState('')
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

        axios.get('/staff/all',
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            console.log(res.data.data)
            setDataStaff(res.data.data)
        })

    }

    const storeData = (e) => {
        e?.preventDefault()
        const input = {
            id_staff: staff,
            username: username,
            password: password,
            role: role
        }   

        toast.promise
        (
            axios.post('/admin/register', input,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }),
            {
                loading: 'Updating...',
                success: (res) => {
                    fetchDataParent()
                    document.getElementById('addUser').close()
                    return res.data.message
                },
                error: (err) => {
                    setError(err.response.data.errors)
                    return err.response.data.message
                }
            }
        )
    }

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        const selectedItem = dataStaff.find(item => item.FID == selectedValue);
      
        if (selectedItem) { 
          setPosition(selectedItem.JABATAN);
        //   setUnit(selectedItem.Namaunit);
        }
      
        setStaff(selectedValue);
      };


    const unitsWithId = Array.from(new Set(dataUnit.map(item => item.unit)))
    .map(unit => {
        const item = dataUnit.find(item => item.unit === unit);
        return { unit, idUnit: item.idUnit };
    });

    const defaultdata = () => {
        setStaff('')
        setUsername('')
        setPassword('')
        setRole('')
        setUnit('')
        setPosition('')
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
        const staffTemp = dataStaff.filter(item => item.Namaunit == unit);
        setStaffs(staffTemp);
        setStaff('')
    },[unit])

    return (
        <>  
            <dialog id="addUser" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={defaultdata}>✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Add New User </h3>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Unit</span>
                        </div>
                        <select className="select select-bordered" value={unit} onChange={(e)=>setUnit(e.target.value)}>
                            <option disabled value={""}>Select Unit</option>
                            {
                                units.map((item, index) => {
                                    return(
                                        <option key={index} value={item.unit}>{item.unit}</option>
                                    )
                                })
                            }
                        </select>   
                        {
                            error.unit &&
                            <label className="label-text-alt mt-1 text-red-500">{error.unit}</label>
                        }
                    </label>
                    {
                        unit ?
                        <div className='flex gap-2 flex-wrap sm:flex-nowrap'>
                            <label className="form-control w-full basis-auto">
                                <div className="label">
                                    <span className="label-text">Staff</span>
                                </div>
                                <select className="select select-bordered" value={staff} onChange={(e)=>handleSelectChange(e)}>
                                    <option disabled value={""}>Select Staff</option>
                                    {
                                        staffs.map((item, index) => {
                                            return(
                                                <option key={index} value={item.FID} onClick={()=>{setPosition(item.JABATAN)}}>{item.FID}{'\u00A0'} - {item.Nama}</option>
                                            )
                                        })
                                    }
                                </select>  
                                {
                                    error.id_staff &&
                                    <label className="label-text-alt mt-1 tran text-red-500">{error.id_staff}</label>
                                }
                            </label>
                            {
                                staff ?
                                <label className="form-control w-full hover:basis-4/6">    
                                    <div className="label">
                                        <span className="label-text">Position</span>
                                    </div>
                                    <input type="text" readOnly placeholder="Staff Position" className="input input-bordered w-full" value={position}/>
                                </label>
                                : <></>
                            }
                        </div>
                        : <></>
                    }
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Username</span>
                        </div>
                        <input type="text" placeholder="User Username" className="input input-bordered w-full" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                        {
                            error.username &&
                            <label className="label-text-alt mt-1 text-red-500">{error.username}</label>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input type="password" placeholder="User Password" className="input input-bordered w-full" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        {
                            error.password &&
                            <label className="label-text-alt mt-1 text-red-500">{error.password}</label>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Role</span>
                        </div>
                        <select className="select select-bordered" value={role} onChange={(e)=>setRole(e.target.value)}>
                            <option disabled value={""}>Select Role</option>
                            <option value={"1"}>Admin</option>
                            <option value={"2"}>Chief</option>
                            <option value={"3"}>Department Head Assistant</option>
                            <option value={"4"}>Department Head</option>
                            <option value={"5"}>General Manager</option>
                            <option value={"6"}>HRD</option>
                            
                        </select>   
                        {
                            error.role &&
                            <label className="label-text-alt mt-1 text-red-500">{error.role}</label>
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

export default AddUser;