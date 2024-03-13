import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import ConfirmModal from '../../confirmModal'

const UserDetail = ({id, fetchDataParent}) => {
    const [data, setData] = useState([{}])
    const [dataUnit, setDataUnit] = useState([{}])
    const [dataStaff, setDataStaff] = useState([{}])
    const [staffs, setStaffs] = useState([{}])
    const [units, setUnits] = useState([])
    const [staff, setStaff ] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [position, setPosition] = useState('')
    const [isEdit, setIsEdit] = useState(false)
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
            setDataStaff(res.data.data)
        })

        axios.get('/user/detail/'+id,
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            console.log(res.data.data)
            setData(res.data.data)
            setStaff(res.data.data.FID)
            setUsername(res.data.data.username)
            setRole(res.data.data.NamaUnit)
        })

    }

    const updateData = (e) => {
        e?.preventDefault()
        const input = {
            id_staff: staff,
            username: username,
            password: password,
            role: role
        }   

        toast.promise
        (
            axios.put('/user/update/'+id, input,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }),
            {
                loading: 'Updating...',
                success: (res) => {
                    fetchDataParent()
                    setIsEdit(!isEdit)
                    document.getElementById('userDetail').close()
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
            axios.post('/user/delete', input,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }),
            {
                loading: 'Deleting...',
                success: (res) => {
                    fetchDataParent()
                    document.getElementById('userDetail').close()
                    document.getElementById('confirmModal').close()
                    return res.data.message
                }
            }
        )
    }

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        const selectedItem = dataStaff.find(item => item.FID == selectedValue);
        console.log(selectedItem)
      
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

    const handleMouseDown = (e) => {
        if(!isEdit){
            e.preventDefault(); // Prevent mouse click
        }
    };

    const handleKeyDown = (e) => {
        if(!isEdit){
            e.preventDefault(); // Prevent keyboard input
        }
    };

    const cancel = (e) => {
        e.preventDefault()

        setStaff(data.FID)
        setUsername(data.username)
        setRole(data.role)
        setIsEdit(!isEdit)
    }

    useEffect(() => {
        console.log(dataStaff)
        console.log(staff)
        if(dataStaff){
            const selectedValue = staff;
            const selectedItem = dataStaff.find(item => item.FID == selectedValue);
            console.log(selectedItem)
          
            if (selectedItem) { 
              setPosition(selectedItem.JABATAN);
            //   setUnit(selectedItem.Namaunit);
            }

        }
    },[staff, dataStaff])

    useEffect(() => {
        fetchData()
    },[id])

    useEffect(() => {
        if(dataUnit){
            setUnits(unitsWithId)
        }
    },[dataUnit])

    useEffect(() => {
        const staffTemp = dataStaff.filter(item => item.Namaunit == role);
        setStaffs(staffTemp);
    },[role])

    return (
        <>  
            <dialog id="userDetail" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">User Detail </h3>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Role</span>
                        </div>
                        <select className="select select-bordered" value={role} onChange={(e)=>setRole(e.target.value)} onMouseDown={(e)=>handleMouseDown(e)} onKeyDown={(e)=>handleKeyDown(e)}>
                            <option disabled value={""}>Select Role</option>
                            {
                                units.map((item, index) => {
                                    return(
                                        <option key={index} value={item.unit}>{item.unit}</option>
                                    )
                                })
                            }
                        </select>   
                        {
                            error.role &&
                            <label className="label-text-alt mt-1 text-red-500">{error.role}</label>
                        }
                    </label>
                    {
                        role ?
                        <div className='flex gap-2 flex-wrap sm:flex-nowrap'>
                            <label className="form-control w-full basis-auto">
                                <div className="label">
                                    <span className="label-text">Staff</span>
                                </div>
                                <select className="select select-bordered" value={staff} onChange={(e)=>handleSelectChange(e)} onMouseDown={(e)=>handleMouseDown(e)} onKeyDown={(e)=>handleKeyDown(e)}>
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
                        <input readOnly={!isEdit} type="text" placeholder="User Username" className="input input-bordered w-full" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                        {
                            error.username &&
                            <label className="label-text-alt mt-1 text-red-500">{error.username}</label>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input readOnly={!isEdit} type="password" placeholder="User Password" className="input input-bordered w-full" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        {
                            error.password &&
                            <label className="label-text-alt mt-1 text-red-500">{error.password}</label>
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
                <ConfirmModal title={"Delete User"} desc={"Are you sure want to delete this user?"} btn={"Delete"} btnAction={deleteData} btnType={"btn-error"}/>
            
            </dialog>
        </>
    );
}

export default UserDetail;