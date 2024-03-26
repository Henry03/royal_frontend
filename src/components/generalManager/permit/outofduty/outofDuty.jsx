import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SlOptions } from 'react-icons/sl'
import Pagination from '../../../pagination'
import {AiOutlineSortAscending, AiOutlineSortDescending} from 'react-icons/ai'
import { Toaster } from 'react-hot-toast'
import { formattedDate, formattedTime } from '../../../utils'
// import AddOutofDuty from './addOutofDuty'
import OutofDutyDetail from './OutofDutyDetail'
import Status from '../../../status'

const OutOfDutyGM = () => {
    const [firstPage, setFirstPage] = useState('1')
    const [lastPage, setLastPage] = useState('')
    const [prevPage, setPrevPage] = useState('')
    const [nextPage, setNextPage] = useState('')
    const [currentPage, setCurrentPage] = useState('')
    const [filter, setFilter] = useState('created_at')
    const [sort, setSort] = useState('desc')
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [id, setId] = useState('')

    const fetchData = (e) => {
        e?.preventDefault()
        const input = {
            search: search,
            filter: filter,
            sort: sort
        } 

        axios.post('/gm/outofduty?page='+currentPage, input, 
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            setData(res.data.data.data)
            setCurrentPage(res.data.data.current_page)
            setNextPage(res.data.data.current_page + 1)
            setLastPage(res.data.data.last_page)
            setPrevPage(res.data.data.current_page - 1)
        })
    }

    const setDefault = () => {
        setFirstPage('1')
        setLastPage('')
        setPrevPage('')
        setNextPage('')
        setCurrentPage('')
    } 
    
    useEffect(() => {
        fetchData()
    }, [currentPage, filter, sort])

    return (
        <>
            <div className="m-5 p-5 md:px-10 bg-base-100 rounded-xl">
                <div className='grid grid-flow-col items-center justify-between'>   
                    <h1 className="text-2xl font-semibold">Out of Duty Permit</h1>
                    <button className="btn btn-primary w-40" onClick={()=>document.getElementById('addOutofDuty').showModal()}>Add Permit</button>
                </div>
            </div>
            <div className="m-5 p-3 md:p-10 bg-base-100 rounded-xl">
                <div className='grid grid-flow-col justify-between mb-3'>
                    <div className='grid grid-flow-col'>
                        <select className="select select-bordered w-full max-w-xs" value={filter} onChange={(e)=>setFilter(e.target.value)}>
                            <option value="created_at">Request Date</option>
                            <option value="destination">Destination</option>
                            <option value="status">Status</option>
                        </select>
                        <label className="swap swap-rotate ms-2">
                            <input type="checkbox" />
                            <AiOutlineSortDescending className="swap-on" size='25' onClick={()=>setSort('desc')}/>
                            <AiOutlineSortAscending className="swap-off" size='25' onClick={()=>setSort('asc')}/>
                        </label>
                        
                    </div>
                    
                    <form onSubmit={(e)=>fetchData(e)}>
                        <div className="join">
                            <input className="input input-bordered join-item w-36 sm:w-full" placeholder="Search" onChange={(e)=>setSearch(e.target.value)}/>
                            <div className="indicator"> 
                                <button type="submit" className="btn join-item" onClick={setDefault}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
                            </div>
                        </div>
                    </form>

                </div>
                <div className="overflow-x-auto ">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Request Date</th>
                                <th>Requested By</th>
                                <th>Destination</th>
                                <th>Status</th>
                                <th></th>
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
                                data.map((permit, index) => {
                                    return (
                                        <tr key={index}>
                                            <th>{new Date(permit.created_at).toLocaleString('en-SG', formattedDate)}</th>
                                            <td>{permit.Nama}</td>
                                            <td>{permit.destination}</td>
                                            {/* <td>{new Date(permit.start_date).toLocaleString('en-US', formattedTime)}</td>
                                            <td>{new Date(permit.end_date).toLocaleString('en-US', formattedTime)}</td> */}
                                            <Status track={permit.track} status={permit.status}/>
                                            <td className='btn btn-ghost' onClick={()=>{document.getElementById('outofDutyDetail').showModal();setId(permit.id)}}><SlOptions/></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <Pagination firstPage={firstPage} prevPage={prevPage} nextPage={nextPage} lastPage={lastPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>
            <OutofDutyDetail id={id} fetchDataParent={fetchData}/>
            {/* <AddOutofDuty fetchDataParent={fetchData}/> */}
            
            <Toaster 
                position="top-right"
                toastOptions={{
                    duration:2000
                }}
            />
        </>
    )
}

export default OutOfDutyGM