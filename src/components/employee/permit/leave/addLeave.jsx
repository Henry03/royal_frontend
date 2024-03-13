import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import { MdOutlineCancel } from 'react-icons/md';
import { set } from 'date-fns';

const AddLeave = ({fetchDataParent}) => {
    const [dp, setDp] = useState([])
    const [eo, setEo] = useState([])
    const [al, setAl] = useState([])
    const [availableDp, setAvailableDp] = useState([])
    const [availableEo, setAvailableEo] = useState([])
    const [availableAl, setAvailableAl] = useState([])
    const [inputDp, setInputDp] = useState([])
    const [inputEo, setInputEo] = useState([])
    const [inputAl, setInputAl] = useState([])

    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [error, setError] = useState({})

    const handleInputDp = (index, field, value) => {
        const newValues = [...inputDp];
        newValues[index][field] = value;
        setInputDp(newValues);
      };
    
    const handleAddDp = () => {
        setInputDp([...inputDp, {id: '', date: ''}]); // Add a new empty string to the array
    };
    
    const handleRemoveDp = (index) => {
        const newValues = [...inputDp];
        newValues.splice(index, 1); // Remove the input at the specified index
        setInputDp(newValues);
    };

    const handleInputEo = (index, field, value) => {
        const newValues = [...inputEo];
        newValues[index][field] = value;
        setInputEo(newValues);
      };
    
    const handleAddEo = () => {
        setInputEo([...inputEo, {id: '', date: ''}]); // Add a new empty string to the array
    };
    
    const handleRemoveEo = (index) => {
        const newValues = [...inputEo];
        newValues.splice(index, 1); // Remove the input at the specified index
        setInputEo(newValues);
    };

    const handleInputAl = (index, field, value) => {
        const newValues = [...inputAl];
        newValues[index][field] = value;
        setInputAl(newValues);
      };
    
    const handleAddAl = () => {
        setInputAl([...inputAl, {id: '', date: ''}]); // Add a new empty string to the array
    };
    
    const handleRemoveAl = (index) => {
        const newValues = [...inputAl];
        newValues.splice(index, 1); // Remove the input at the specified index
        setInputAl(newValues);
    };

    const fetchData = (e) => {
        e?.preventDefault()

        axios.get('/leavepermit/employee/quota',
        {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .then(res => {
            console.log(res.data)
            setDp(res.data.dp)
            setEo(res.data.eo)
            setAl(res.data.al)
        })
    }

    const storeData = (e) => {
        e?.preventDefault()
        const input = {
            inputDp: inputDp,
            inputEo: inputEo,
            inputAl: inputAl
        }

        toast.promise
        (
            axios.post('/leavepermit/store', input,
            {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }),
            {
                loading: 'Updating...',
                success: (res) => {
                    console.log(res)
                    fetchDataParent()
                    fetchData()
                    defaultData()
                    document.getElementById('addLeave').close()
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
        setInputDp([])
        setInputEo([])
        setInputAl([])
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        setAvailableDp(dp)
    }, [dp])

    useEffect(() => {
        setAvailableEo(eo)
    }, [eo])

    useEffect(() => {
        setAvailableAl(al)
    }, [al])

    return (
        <>  
            <dialog id="addLeave" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={defaultData}>✕</button>
                    </form>
                    <div className='grid grid-flow-row gap-3 items-center'>
                        <div className="card card-compact bg-base-100 mt-3 border">
                            <div className="card-body gap-0">
                                <h2 className="card-title">Day Payment Request</h2>
                                {
                                    dp.length > 0 ?
                                    <>
                                        
                                        {inputDp.map((value, index) => (
                                            <div key={index} className='my-2 grid grid-flow-col gap-3'>
                                                <label className="form-control w-full">
                                                    <select className="select select-bordered" 
                                                        value={value.id}
                                                        onChange={(e)=>{handleInputDp(index, 'id', e.target.value)}}>
                                                        <option disabled value={""}>Select DP</option>
                                                        {
                                                            availableDp.map((item, index) => {
                                                                return(
                                                                    <option key={index} value={item.id}>{item.date}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>   
                                                    {
                                                        error && error[`inputDp.${index}.id`] &&
                                                        <label className="label-text-alt mt-1 text-red-500">{error[`inputDp.${index}.id`][0]}</label>
                                                    }
                                                </label>
                                                <label className="form-control w-full">
                                                    <input
                                                        type="date"
                                                        className='input input-bordered w-full join-item'
                                                        value={inputDp[index].date}
                                                        onChange={(e) => handleInputDp(index, 'date', e.target.value)}
                                                    />
                                                    {
                                                        error && error[`inputDp.${index}.date`] &&
                                                        <label className="label-text-alt mt-1 text-red-500">{error[`inputDp.${index}.date`][0]}</label>
                                                    }
                                                </label>
                                                <button className="btn  bg-red-100" onClick={() => handleRemoveDp(index)}><MdOutlineCancel size={25} color='red'/></button>
                                                
                                            </div>
                                        ))}
                                        <div className='flex justify-end'>
                                            <button type="button" className='btn btn-primary w-20 flex-end' onClick={handleAddDp}>
                                                Add
                                            </button>
                                        </div>
                                    </>
                                    :
                                    <div className='flex justify-center mt-3'>
                                        <p className='text-center'>No available Day Payment Quota</p>
                                    </div>
                                }
                            </div>
                        </div>
                        
                        <div className="card card-compact bg-base-100 mt-3 border">
                            <div className="card-body gap-0">
                                <h2 className="card-title">Extra Off Request</h2>
                                {
                                    eo.length > 0 ?
                                    <>
                                        {inputEo.map((value, index) => (
                                            <div key={index} className='my-2 grid grid-flow-col gap-3'>
                                                <label className="form-control w-full">
                                                    <select className="select select-bordered" 
                                                        value={value.id}
                                                        onChange={(e)=>{handleInputEo(index, 'id', e.target.value)}}>
                                                        <option disabled value={""}>Select Eo</option>
                                                        {
                                                            availableEo.map((item, index) => {
                                                                return(
                                                                    <option key={index} value={item.id}>{item.date}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>   
                                                    {
                                                        error && error[`inputEo.${index}.id`] &&
                                                        <label className="label-text-alt mt-1 text-red-500">{error[`inputEo.${index}.id`][0]}</label>
                                                    }
                                                </label>
                                                <label className="form-control w-full">
                                                    <input
                                                        type="date"
                                                        className='input input-bordered w-full join-item'
                                                        value={inputEo[index].date}
                                                        onChange={(e) => handleInputEo(index, 'date', e.target.value)}
                                                    />
                                                    {
                                                        error && error[`inputEo.${index}.date`] &&
                                                        <label className="label-text-alt mt-1 text-red-500">{error[`inputEo.${index}.date`][0]}</label>
                                                    }
                                                </label>
                                                <button className="btn  bg-red-100" onClick={() => handleRemoveEo(index)}><MdOutlineCancel size={25} color='red'/></button>
                                                
                                            </div>
                                        ))}
                                        <div className='flex justify-end'>
                                            <button type="button" className='btn btn-primary w-20 flex-end' onClick={handleAddEo}>
                                                Add
                                            </button>
                                        </div>
                                    </>
                                    : 
                                    <div className='flex justify-center mt-3'>
                                        <p className='text-center'>No available Extra Off Quota</p>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="card card-compact bg-base-100 mt-3 border">
                            <div className="card-body gap-0">
                                <h2 className="card-title">Annual Leave Request</h2>
                                {
                                    al.length > 0 ?
                                    <>
                                        {inputAl.map((value, index) => (
                                            <div key={index} className='my-2 grid grid-flow-col gap-3'>
                                                <label className="form-control w-full">
                                                    <select className="select select-bordered" 
                                                        value={value.id}
                                                        onChange={(e)=>{handleInputAl(index, 'id', e.target.value)}}>
                                                        <option disabled value={""}>Select Al</option>
                                                        {
                                                            availableAl.map((item, index) => {
                                                                return(
                                                                    <option key={index} value={item.id}>{item.date}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>   
                                                    {
                                                        error && error[`inputAl.${index}.id`] &&
                                                        <label className="label-text-alt mt-1 text-red-500">{error[`inputAl.${index}.id`][0]}</label>
                                                    }
                                                </label>
                                                <label className="form-control w-full">
                                                    <input
                                                        type="date"
                                                        className='input input-bordered w-full join-item'
                                                        value={inputAl[index].date}
                                                        onChange={(e) => handleInputAl(index, 'date', e.target.value)}
                                                    />
                                                    {
                                                        error && error[`inputAl.${index}.date`] &&
                                                        <label className="label-text-alt mt-1 text-red-500">{error[`inputAl.${index}.date`][0]}</label>
                                                    }
                                                </label>
                                                <button className="btn  bg-red-100" onClick={() => handleRemoveAl(index)}><MdOutlineCancel size={25} color='red'/></button>
                                                
                                            </div>
                                        ))}
                                        <div className='flex justify-end'>
                                            <button type="button" className='btn btn-primary w-20 flex-end' onClick={handleAddAl}>
                                                Add
                                            </button>
                                        </div>
                                    </>
                                    :
                                    <div className='flex justify-center mt-3'>
                                        <p className='text-center'>No available Annual Leave Quota</p>
                                    </div>
                                }
                            </div>
                        </div>
                        
                    </div>
                    

                    <div className='grid grid-flow-col gap-5 mt-5'>
                        <button className='btn btn-success w-full' onClick={(e)=>storeData(e)}>Submit</button>
                    </div>
                    
                </div>
                <Toaster 
                position="top-right"
            />
            </dialog>
        </>
    );
}

export default AddLeave;