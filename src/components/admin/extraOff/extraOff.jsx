import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '../../pagination'
import {AiOutlineSortAscending, AiOutlineSortDescending} from 'react-icons/ai'
import toast, { Toaster } from 'react-hot-toast'
import { formattedDate } from '../../utils'
import AddExtraOff from './_addExtraOff'

const ExtraOff = () => {
    const [firstPage, setFirstPage] = useState('1')
    const [lastPage, setLastPage] = useState('')
    const [prevPage, setPrevPage] = useState('')
    const [nextPage, setNextPage] = useState('')
    const [currentPage, setCurrentPage] = useState('1')
    const [filter, setFilter] = useState('name')
    const [sort, setSort] = useState('asc')
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [addExtraOff, setAddExtraOff] = useState(false)

    const month = new Date();
    month.setMonth(month.getMonth());

    const [date, setDate] = useState(new Date(month).toISOString().slice(0,7))

    const fetchData = (e) => {
        e?.preventDefault()
        const input = {
            search: search,
            filter: filter,
            sort: sort,
            date: date
        } 

        axios.post('/user/eo/department?page='+currentPage, input, 
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        }).then(res => {
            setData(res.data.data.data)
            setCurrentPage(res.data.data.current_page)
            setNextPage(res.data.data.current_page + 1)
            setLastPage(res.data.data.last_page)
            setPrevPage(res.data.data.current_page - 1)
        })
    }
    
    useEffect(() => {
        fetchData()
    }, [currentPage, filter, sort, date])

    return (
        <>
            <div className="m-5 p-5 md:px-10 bg-base-100 rounded-xl">
                <div className='grid grid-flow-col items-center justify-between'>   
                    <h1 className="text-2xl font-semibold">Extra Off</h1>
                    <button className="btn btn-primary w-40" onClick={()=>{document.getElementById('addExtraOff').showModal(),setAddExtraOff(true)}}>Add Extra Off</button>
                </div>
            </div>
            <div className="m-5 p-3 md:p-10 bg-base-100 rounded-xl">
                <div className='justify-between mb-3 flex flex-wrap gap-5'>
                    <div>
                        <div className='grid grid-flow-col w-full'>
                            <select className="select select-bordered w-full max-w-xs" value={filter} onChange={(e)=>setFilter(e.target.value)}>
                                <option value="Name">Name</option>
                                
                            </select>
                            <label className="swap swap-rotate ms-2">
                                <input type="checkbox" />
                                <AiOutlineSortAscending className="swap-on" size='25' onClick={()=>setSort('asc')}/>
                                <AiOutlineSortDescending className="swap-off" size='25' onClick={()=>setSort('desc')}/>
                            </label>
                            
                        </div>

                    </div>
                    <div>

                            <label className="input input-bordered flex items-center gap-2 grow">
                                <input type="month" className="grow w-full max-w-xs" placeholder="To Date" value={date}
                                    onChange={(e) => {setDate(e.target.value)}}/>
                            </label>
                    </div>

                </div>
                <div className="overflow-x-auto ">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Replace</th>
                                <th>Expire</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {
                                data.length == 0 &&
                                <tr>
                                    <td colSpan='6' className='text-center'>No Data</td>
                                </tr>
                            }
                            {
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>
                                                {
                                                    item.replace ?
                                                        <div className=''>{new Date(item.replace).toLocaleDateString('en-GB', formattedDate)}</div>
                                                    : "-"
                                                }
                                            </td>
                                                <td>
                                                {
                                                    item.replace && item.approval == '2' ?
                                                        <div className='badge badge-success'>Replaced</div>
                                                    : item.replace && item.approval == '1' ?
                                                    <div className='badge badge-warning'>Pending</div>
                                                    :
                                                    item.expire != null && new Date(item.expire) < new Date() ?
                                                    <div className='badge badge-error'>
                                                        Expired
                                                    </div>
                                                    : item.expire != null && item ?
                                                    <div className='badge badge-warning'>
                                                        {new Date(item.expire).toLocaleDateString('en-GB', formattedDate)}
                                                    </div>
                                                    : "-"
                                                }
                                                </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <Pagination firstPage={firstPage} prevPage={prevPage} nextPage={nextPage} lastPage={lastPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>
            <AddExtraOff fetchDataParent={fetchData} status={addExtraOff} setStatus={setAddExtraOff}/>             
            <Toaster 
                position="top-right"
            />
        </>
    )
}

export default ExtraOff