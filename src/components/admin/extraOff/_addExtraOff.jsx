import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'

const AddExtraOff = ({fetchDataParent, status, setStatus}) => {
    const [data, setData] = useState([])
    const [selectedData, setSelectedData] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [date, setDate] = useState(new Date().toISOString().slice(0,7))

    const fetchData = (e) => {
        e?.preventDefault()
        axios.post('/user/eo/department/noeo', 
        {
            date: date
        },
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            console.log(res)
            setData(res.data.data)
        }) 
    }

    const StoreData = (e) => {
        e?.preventDefault()
        const input = {
            data: selectedData,
            date: date
        }
        toast.promise(
            axios.post('/user/eo/store', input,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }),
            {
                loading: 'Loading...',
                success: (res) => {
                    document.getElementById('addExtraOff').close()
                    setStatus(false)
                    fetchDataParent()
                    return res.data.message
                },
                error: (err) => {
                    return err.response.data.message
                }
            }
        )
    }
            
        

    const handleCheckboxChange = (staff) => {
        const isChecked = selectedData.some(item => item.id === staff.id);
        if (isChecked) {
            setSelectedData(prevData => prevData.filter(item => item.id !== staff.id));
            
        } else {
            setSelectedData(prevData => [...prevData, staff]);
        }
    };

    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectAll(false);
            setSelectedData([]);
        } else {
            setSelectAll(true);
            setSelectedData([...data]);
        }
    };

    useEffect (() => {
        if(status){
            fetchData()
        }
    }, [date, status])

    useEffect(() => {
        if(data.length != 0){
            if (selectedData.length === data.length) {
                setSelectAll(true);
            } else {
                setSelectAll(false);
            }
        }
    }, [selectedData]);

    return (
        <>  
            <dialog id="addExtraOff" className="modal">
                <div className="modal-box max-w-xl  ">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>setStatus(false)}>✕</button>
                    </form>
                    <h3 className="font-bold text-xl text-center">Add Extra Off</h3>
                    <div className='grid grid-flow-col w-full justify-between my-5'>
                        <input type="month" className="input input-bordered w-fit" placeholder="To Date" value={date}
                            onChange={(e) => {setDate(e.target.value)}}/>
                        <button className='btn btn-primary' onClick={(e)=>StoreData(e)}>Add Extra Off</button>
                    </div>
                    <div className="overflow-scroll mt-5 items-center px-4 border-2 rounded-lg shadow-sm" style={{height:'60dvh'}}>
                            <table className="table">
                                {/* head */}
                                <thead>
                                <tr>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" 
                                                onChange={handleSelectAllChange}
                                                checked={selectAll}
                                            />
                                        </label>
                                    </th>
                                    <th>Name</th>
                                    <th>Position</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((staff, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th>
                                                        <label>
                                                            <input type="checkbox" className="checkbox" 
                                                                onChange={() => handleCheckboxChange(staff)} // Handle checkbox change
                                                                checked={selectedData.some(item => item.id === staff.id)}
                                                            />
                                                        </label>
                                                    </th>
                                                    <td>
                                                        {staff.name}
                                                    </td>
                                                    <td>
                                                        {staff.position}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    {
                                        data.length == 0 &&
                                        <tr>
                                            <td colSpan='4' className='text-center'>No Data</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
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

export default AddExtraOff;