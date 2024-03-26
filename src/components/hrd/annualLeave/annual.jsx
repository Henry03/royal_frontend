import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SlOptions } from 'react-icons/sl'
import {AiOutlineSortAscending, AiOutlineSortDescending} from 'react-icons/ai'
import toast, { Toaster } from 'react-hot-toast'
import Pagination from '../../pagination'

const Annual = () => {
    const [firstPage, setFirstPage] = useState('1')
    const [lastPage, setLastPage] = useState('')
    const [prevPage, setPrevPage] = useState('')
    const [nextPage, setNextPage] = useState('')
    const [currentPage, setCurrentPage] = useState('')
    const [data, setData] = useState([])
    const [date, setDate] = useState('')
    const [year, setYear] = useState('')

    const fetchData = (e) => {
        e?.preventDefault()

        axios.get('/user/annual/expire?page='+currentPage, 
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            setData(res.data.data.data)
            setDate(res.data.data.data.date)
            setCurrentPage(res.data.data.current_page)
            setNextPage(res.data.data.current_page + 1)
            setLastPage(res.data.data.last_page)
            setPrevPage(res.data.data.current_page - 1)
        })
    }

    const updateExpire = (e) => {
        e?.preventDefault()
        const input = {
            expire: date,
            year: year
        }

        toast.promise(
            axios.post('/user/annual/expire', input,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('admin-token')
                }
            }),
            {
                loading: 'Updating...',
                success: (res) => {
                    setDate('')
                    setYear('')
                    fetchData()
                    return res.data.message
                },
                error: (err) => {
                    return err.response.data.message
                }
            }
        )
    }
    
    useEffect(() => {
        fetchData()
    }, [currentPage])

    useEffect(() => {
        if(date && year){
            updateExpire()
        }
    }, [date])

    return (
        <>
            <div className="m-5 p-5 md:px-10 bg-base-100 rounded-xl">
                <div className='grid grid-flow-col items-center justify-between'>
                    <h1 className="text-2xl font-semibold">Annual Leave Expire</h1>
                    <div className='grid grid-flow-row sm:grid-flow-col gap-2'>
                    
                    </div>
                </div>
            </div>
            <div className="m-5 p-3 md:p-10 bg-base-100 rounded-xl">
                
                <div className="overflow-x-auto ">
                    <table className="table table-fixed">
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Staff Total</th>
                                <th>Expire Date</th>
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
                                            <th>{staff.year}</th>
                                            <td>{staff.total}</td>
                                            <td><input type='date' className='input input-bordered input-sm' value={staff.expire} onChange={(e)=>{setDate(e.target.value),setYear(staff.year)}}/></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <Pagination firstPage={firstPage} prevPage={prevPage} nextPage={nextPage} lastPage={lastPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>
            
            <Toaster 
                position="top-right"
            />
        </>
    )
}

export default Annual