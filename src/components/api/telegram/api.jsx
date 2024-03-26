import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SlOptions } from 'react-icons/sl'
import {AiOutlineSortAscending, AiOutlineSortDescending} from 'react-icons/ai'
import { Toaster } from 'react-hot-toast'
import ApiTelegramDetail from './apiDetail'
import Pagination from '../../pagination'

const ApiTelegram = () => {
    const [firstPage, setFirstPage] = useState('1')
    const [lastPage, setLastPage] = useState('')
    const [prevPage, setPrevPage] = useState('')
    const [nextPage, setNextPage] = useState('')
    const [currentPage, setCurrentPage] = useState('')
    const [filter, setFilter] = useState('FID')
    const [sort, setSort] = useState('asc')
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [id, setId] = useState('')
    const [idUnit, setIdUnit] = useState('')
    const [unit, setUnit] = useState([])
    const [importData, setImportData] = useState([])

    const fetchData = (e) => {
        e?.preventDefault()
        const input = {
            search: search,
            filter: filter,
            sort: sort,
            unit: idUnit
        } 

        axios.post('/staff?page='+currentPage, input, 
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            setData(res.data.data.data)
            setCurrentPage(res.data.data.current_page)
            setNextPage(res.data.data.current_page + 1)
            setLastPage(res.data.data.last_page)
            setPrevPage(res.data.data.current_page - 1)
        })

        axios.get('/unit/index',
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            setUnit(res.data.data)
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
        console.log("staff")
    },[])
    
    useEffect(() => {
        fetchData()
    }, [currentPage, filter, sort, idUnit])

    return (
        <>
            <div className="m-5 p-5 md:px-10 bg-base-100 rounded-xl">
                <div className='grid grid-flow-col items-center justify-between'>
                    <h1 className="text-2xl font-semibold">Telegram API</h1>
                    <div className='grid grid-flow-row sm:grid-flow-col gap-2'>
                    
                    </div>
                </div>
            </div>
            <div className="m-5 p-3 md:p-10 bg-base-100 rounded-xl">
                <div className='grid grid-flow-col justify-between mb-3 gap-2'>
                    <div className='grid grid-flow-row sm:grid-flow-col gap-2'>
                        <select className="select select-bordered w-full max-w-xs" value={idUnit} onChange={(e)=>setIdUnit(e.target.value)}>
                            <option value="%%">All Unit</option>
                            {
                                unit.map((unit, index) => {
                                    return (
                                        <option key={index} value={unit.id}>{unit.name}</option>
                                    )
                                })
                            }
                        </select>
                        <div className='grid grid-flow-col gap-2'>
                            <select className="select select-bordered w-full max-w-xs" value={filter} onChange={(e)=>setFilter(e.target.value)}>
                                <option value="FID">ID</option>
                                <option value="Nama">Name</option>
                                <option value="Namaunit">Unit</option>
                                <option value="JABATAN">Position</option>
                            </select>
                            <label className="swap swap-rotate">
                                <input type="checkbox" />
                                <AiOutlineSortDescending className="swap-on" size='25' onClick={()=>setSort('desc')}/>
                                <AiOutlineSortAscending className="swap-off" size='25' onClick={()=>setSort('asc')}/>
                            </label>

                        </div>
                        
                        
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
                                <th>FID</th>
                                <th>Name</th>
                                <th>Unit</th>
                                <th>Position</th>
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
                                data.map((staff, index) => {
                                    return (
                                        <tr key={index}>
                                            <th>{staff.FID}</th>
                                            <td>{staff.Nama}</td>
                                            <td>{staff.Namaunit}</td>
                                            <td>{staff.JABATAN}</td>
                                            <td className='btn btn-ghost' onClick={()=>{document.getElementById('staffDetail').showModal();setId(staff.FID)}}><SlOptions/></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <Pagination firstPage={firstPage} prevPage={prevPage} nextPage={nextPage} lastPage={lastPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>
            <ApiTelegramDetail id={id}/>
            
            <Toaster 
                position="top-right"
            />
        </>
    )
}

export default ApiTelegram