import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SlOptions } from 'react-icons/sl'
import Pagination from '../../pagination'
import {AiOutlineSortAscending, AiOutlineSortDescending} from 'react-icons/ai'
import {MdDateRange} from 'react-icons/md'
import toast, { Toaster } from 'react-hot-toast'
import { formattedDate, formattedTime } from '../../utils'
// import AddLeave from './addLeave'
// import LeaveDetail from './leaveDetail'
// import Status from '../../../status'

const AttendanceHRD = () => {
    const [firstPage, setFirstPage] = useState('1')
    const [lastPage, setLastPage] = useState('')
    const [prevPage, setPrevPage] = useState('')
    const [nextPage, setNextPage] = useState('')
    const [currentPage, setCurrentPage] = useState('')
    const [filter, setFilter] = useState('Tanggal')
    const [sort, setSort] = useState('desc')
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [id, setId] = useState('')

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const [dateRange, setDateRange] = useState({
        fromDate: oneMonthAgo.toLocaleDateString('en-CA'),
        toDate: new Date().toLocaleDateString('en-CA')
    });
    const [fromStatus, setFromStatus] = useState(0)
    const [toStatus, setToStatus] = useState(0)

    // To update fromDate
    const updateFromDate = (newFromDate) => {
        setDateRange(prevState => ({
        ...prevState,
        fromDate: newFromDate
        }));
    };
    
    // To update toDate
    const updateToDate = (newToDate) => {
        setDateRange(prevState => ({
        ...prevState,
        toDate: newToDate
        }));
    };

    const fetchData = (e) => {
        e?.preventDefault()
        const input = {
            search: search,
            filter: filter,
            sort: sort,
            fromDate: dateRange.fromDate,
            toDate: dateRange.toDate
        } 

        toast.promise
        (
            axios.post('/user/attendance?page='+currentPage, input, 
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }),
            {
                loading: 'Loading...',
                success: (res) => {
                    setData(res.data.data.data)
                    setCurrentPage(res.data.data.current_page)
                    setNextPage(res.data.data.current_page + 1)
                    setLastPage(res.data.data.last_page)
                    setPrevPage(res.data.data.current_page - 1)
                    return res.data.message
                },
                error: (err) => {
                    return err.response.data.message
                }
            }
        )
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
                    <h1 className="text-2xl font-semibold">Attendance Log</h1>
                    <button className="btn btn-primary w-40" onClick={()=>document.getElementById('addDetail').showModal()}>Add Leave</button>
                </div>
            </div>
            <div className="m-5 p-3 md:p-10 bg-base-100 rounded-xl">
                <div className='justify-between mb-3 flex flex-wrap gap-5'>
                    <div>
                        <div className='grid grid-flow-col w-full'>
                            <select className="select select-bordered w-full max-w-xs" value={filter} onChange={(e)=>setFilter(e.target.value)}>
                                <option value="Tanggal">Date</option>
                                
                            </select>
                            <label className="swap swap-rotate ms-2">
                                <input type="checkbox" />
                                <AiOutlineSortAscending className="swap-on" size='25' onClick={()=>setSort('asc')}/>
                                <AiOutlineSortDescending className="swap-off" size='25' onClick={()=>setSort('desc')}/>
                            </label>
                            
                        </div>

                    </div>
                    <div>

                        <form onSubmit={(e)=>fetchData(e)}className='flex flex-wrap gap-3'>
                            <label className="input input-bordered flex items-center gap-2 grow">
                                {
                                    fromStatus == 0 && <MdDateRange/>
                                }
                                <input type="text" className="grow w-full max-w-xs" placeholder="From Date" value={dateRange.fromDate}
                                    onFocus={(e) => {(e.target.type = "date"), setFromStatus(1)}}
                                    onBlur={(e) => {(e.target.type = "text"), setFromStatus(0)}}
                                    onChange={(e) => {updateFromDate(e.target.value)}}/>
                            </label>
                            <label className="input input-bordered flex items-center gap-2 grow">
                                {
                                    toStatus == 0 && <MdDateRange/>
                                }
                                <input type="text" className="grow w-full max-w-xs" placeholder="To Date" value={dateRange.toDate}
                                    onFocus={(e) => {(e.target.type = "date"), setToStatus(1)}}
                                    onBlur={(e) => {(e.target.type = "text"), setToStatus(0)}} 
                                    onChange={(e) => {updateToDate(e.target.value)}}/>
                            </label>
                            <button type="submit" className="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
                        </form>
                    </div>

                </div>
                <div className="overflow-x-auto ">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Date</th>
                                <th>Shift Time</th>
                                <th>Time In</th>
                                <th>Time Out</th>
                                <th>Work Time</th>
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
                                data.map((attendance, index) => {
                                    return (
                                        <tr key={index}>
                                            <th>{new Date(attendance.Tanggal).toLocaleString('en-SG', formattedDate)}</th>
                                            <td>{attendance.Shift.Nama}</td>
                                            <td>{attendance.Shift.NamaUnit}</td>
                                            <td>{attendance.Shift.Jam_masuk + ' - ' + attendance.Shift.Jam_keluar}</td>
                                            {
                                                attendance.time_in != null ?
                                                <th>
                                                    {
                                                        console.log(attendance)
                                                    }
                                                    {
                                                        new Date(attendance.Tanggal + ' ' + attendance.Shift.Jam_masuk) >= new Date(attendance.time_in.DateTime) ?
                                                            <div className="tooltip tooltip-success text-green-600" data-tip={Math.abs(attendance.time_in.EarlyIn) + " Minutes Early"}>
                                                                {new Date(attendance.time_in.DateTime).toLocaleTimeString('en-SG', formattedTime)}
                                                            </div>
                                                        :
                                                            <div className="tooltip tooltip-error text-red-500" data-tip={attendance.time_in.EarlyIn + " Minutes Late"}>
                                                                {new Date(attendance.time_in.DateTime).toLocaleTimeString('en-SG', formattedTime)}
                                                            </div>
                                                    }
                                                </th>
                                                : <td>No Record</td>
                                            }
                                            {
                                                attendance.time_out != null ?
                                                <th>
                                                    {
                                                        new Date(attendance.Tanggal + ' ' + attendance.Shift.Jam_keluar) <= new Date(attendance.time_out.DateTime) ?
                                                            <div className="tooltip tooltip-success text-green-600" data-tip={Math.abs(attendance.time_out.EarlyOut) + " Minutes Early"}>
                                                                {new Date(attendance.time_out.DateTime).toLocaleTimeString('en-SG', formattedTime)}
                                                            </div>
        
                                                        
                                                        :
                                                            <div className="tooltip tooltip-error text-red-500" data-tip={attendance.time_out.EarlyOut + " Minutes Late"}>
                                                                {new Date(attendance.time_out.DateTime).toLocaleTimeString('en-SG', formattedTime)}
                                                            </div>
                                                    }
                                                </th>
                                                : <td>Not Yet</td>
                                            }
                                            {
                                                attendance.working_time == null ?
                                                <th className='text-red-500'>Absent</th>
                                                : attendance.working_time == 'N/A' ?
                                                    <th className='text-yellow-500'>{attendance.working_time}</th>
                                                : 
                                                <td>
                                                    {attendance.working_time}
                                                </td>
                                            }
                                            <td className='btn btn-ghost' onClick={()=>{document.getElementById('leaveDetail').showModal();setId(permit.id)}}><SlOptions/></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <Pagination firstPage={firstPage} prevPage={prevPage} nextPage={nextPage} lastPage={lastPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>
            {/* <LeaveDetail id={id} fetchDataParent={fetchData}/>
            <AddLeave fetchDataParent={fetchData}/> */}
            
            <Toaster 
                position="top-right"
            />
        </>
    )
}

export default AttendanceHRD