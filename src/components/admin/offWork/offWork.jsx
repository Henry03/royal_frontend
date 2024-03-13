import { useEffect, useState } from "react";
import StaffCard from "./_staffCard";
import axios from "axios";
import OffWorkDetail from "./_offWorkDetail";

const OffWork = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [id, setId] = useState('')
    const [name, setName] = useState('')

    const fetchData = (e) => {
        e?.preventDefault()
    
        axios.get('/offwork/department',
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
          setData(res.data.data);
        })
    }

    const filteredData = data.filter(offWork =>
        offWork.name.toLowerCase().includes(search.toLowerCase())
    );

    const popUp = () => {
        document.getElementById('OffWorkDetail').showModal()
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <>
            <div className="m-5 p-5 md:px-10 bg-base-100 rounded-xl">
                <div className='grid grid-flow-col items-center justify-between'> 
                    <h1 className='text-2xl font-bold'>Off Work</h1>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Search" onChange={(e)=>setSearch(e.target.value)}/>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>
                </div>
            </div>
            <div className="px-5 md:px-5 rounded-xl">
                <div className='my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-center'> 
                    {
                        filteredData.map((offWork, index) => (
                            <StaffCard key={index} offWork={offWork} setId={setId} onClick={()=>{popUp(); setName(offWork.name)}}/>
                        ))
                    }
                </div>
                <div className='my-2 flex flex-grow gap-3 justify-center'> 
                    {
                        filteredData.length === 0 && <div className="text-center">Data not found</div>
                    }
                </div>
                
            </div>
            <OffWorkDetail id={id} name={name}/>
        </>
    );
}

export default OffWork;