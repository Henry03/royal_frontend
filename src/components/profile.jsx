import axios from "axios"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { formattedDate, formattedDateWOWeekday, getInitials, initialsToRGB } from "./utils"

const Profile = ({setInitial, setColor}) => {
    const [data, setData] = useState({})
    const [phoneNumber, setPhoneNumber] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})
    const [isEdit, setIsEdit] = useState(false)


    const getData = (e) => {
        e?.preventDefault()

        if(localStorage.getItem('role')){
            axios.get('/user/profile', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            })
            .then(res => {
                setData(res.data.data)
                setPhoneNumber(res.data.data.phone_number)
                setUsername(res.data.data.username)
                setInitial(getInitials(res.data.data.name))
                setColor(initialsToRGB(getInitials(res.data.data.name)))
            })
        }else{
            axios.get('/profile', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            .then(res => {
                setData(res.data.data)
                setPhoneNumber(res.data.data.phone_number)
                setInitial(getInitials(res.data.data.name))
                setColor(initialsToRGB(getInitials(res.data.data.name)))
            })
        }
    }

    const updateData = (e) => {
        e.preventDefault()
        setPassword('')
        if(localStorage.getItem('role')){
            toast.promise(
                axios.put('/user/profile', {
                    Notelp: phoneNumber,
                    username: username,
                    password: password
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                    }
                }),
                {
                    loading: 'Updating...',
                    success: (res) => {
                        getData()
                        setIsEdit(false)
                        return res.data.message
                        },
                    error: (err) => {
                        setError(err.response.data.errors)
                        return err.response.data.message
                    }
                }
            )
        }else{
            toast.promise(
                axios.put('/profile', {
                    phone_number: phoneNumber
                }, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }),
                {
                    loading: 'Updating...',
                    success: (res) => {
                        getData()
                        setIsEdit(false)
                        return res.data.message
                        },
                    error: (err) => {
                        setError(err.response.data.errors)
                        return err.response.data.message
                        
                    }
                }
            )
        }
    }

    const defaultData = () => {
        setPhoneNumber(data.phone_number ? data.phone_number : ""),
        setUsername(data.username),
        setPassword(''),
        setError({})
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <dialog id="profile" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Profile </h3>
                <div className="grid grid-flow-row gap-1 justify-center">
                    {
                        data && data.name &&
                        <div className="relative inline-flex items-center justify-center w-20 h-20 overflow-hidden rounded-full mx-auto" style={{ backgroundColor: initialsToRGB(getInitials(data.name)) }}>
                                <span className="font-medium text-gray-300 dark:text-gray-100">{ getInitials(data.name)}</span>
                        </div>
                    }
                    <span className="text-center font-bold text-lg">{data.name}</span>
                    <span className="text-center font-semibold text-sm text-gray-500">{data.unit} | {data.position}</span>
                    <span className="text-center font-semibold text-sm text-gray-500">Joined { new Date(data.entry_date).toLocaleDateString('en-us', formattedDateWOWeekday)}</span>
                </div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">FID</span>
                    </div>
                    <input readOnly disabled={isEdit} type="text" placeholder="Staff ID" className="input input-bordered w-full" value={data.id}/>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">NIK</span>
                    </div>
                    <input readOnly disabled={isEdit} type="text" placeholder="ID Number" className="input input-bordered w-full" value={data.nik}/>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Phone Number</span>
                    </div>
                    <input readOnly={!isEdit} type="text" placeholder="Your Whatapp number" className="input input-bordered w-full" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
                    {
                        error && error.Notelp &&
                        <label className="label-text-alt mt-1 text-red-500">{error.Notelp}</label>
                    }
                </label>
                {
                    localStorage.getItem('role') &&
                    <>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Username</span>
                            </div>
                            <input readOnly={!isEdit} type="text" placeholder="Your username" className="input input-bordered w-full" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                            {
                                error && error.username &&
                                <label className="label-text-alt mt-1 text-red-500">{error.username}</label>
                            }
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">password</span>
                            </div>
                            <input readOnly={!isEdit} type="password" placeholder="Keep your password yourself" className="input input-bordered w-full" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            {
                                error && error.password &&
                                <label className="label-text-alt mt-1 text-red-500">{error.password}</label>
                            }
                        </label>
                    </>
                }
                {
                    !isEdit ?
                    <div className='grid grid-flow-col gap-5 mt-5'>
                        <button className='btn btn-warning w-full' onClick={(e)=>setIsEdit(true)}>Edit</button>
                    </div>
                    :
                    <div className='grid grid-flow-col gap-5 mt-5'>
                        <button className='btn w-full' onClick={(e)=>{setIsEdit(false),defaultData()}}>Cancel</button>
                        <button className='btn btn-success w-full' onClick={(e)=>{updateData(e)}}>Save</button>
                    </div>
                }
            </div>
            <Toaster
                position="top-right"
            />
        </dialog>
    )
}

export default Profile