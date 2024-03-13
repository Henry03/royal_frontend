import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import ConfirmModal from '../../confirmModal';
import toast, { Toaster } from 'react-hot-toast'
import { formatDate, set } from 'date-fns';
import { formattedDate } from '../../utils';
import Pagination from '../../pagination';

const OffWorkDetail = ({id, name}) => {
    const [dp, setDp] = useState([])
    const [eo, setEo] = useState([])
    const [al, setAl] = useState([])
    const [firstNumber, setFirstNumber] = useState(1)
    const [error, setError] = useState({})
    const [tab, setTab] = useState('dp')
    const [firstPage, setFirstPage] = useState('1')
    const [lastPage, setLastPage] = useState('')
    const [prevPage, setPrevPage] = useState('')
    const [nextPage, setNextPage] = useState('')
    const [currentPage, setCurrentPage] = useState('')

    const fetchDp = (e) => {
        e?.preventDefault()
        axios.post('/offwork/dp?page='+currentPage, 
        {
            id: id
        },
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            setDp(res.data.data.data)
            setCurrentPage(res.data.data.current_page)
            setNextPage(res.data.data.current_page + 1)
            setLastPage(res.data.data.last_page)
            setPrevPage(res.data.data.current_page - 1)
            setFirstNumber(res.data.data.from)
            console.log(res.data.data.from)

        }) 
    }

    const fetchEo = (e) => {
        e?.preventDefault()
        axios.post('/offwork/eo?page='+currentPage, 
        {
            id: id
        },
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            setEo(res.data.data.data)
            setCurrentPage(res.data.data.current_page)
            setNextPage(res.data.data.current_page + 1)
            setLastPage(res.data.data.last_page)
            setPrevPage(res.data.data.current_page - 1)
            setFirstNumber(res.data.data.from)
            console.log(res.data.data.from)

        }) 
    }

    const fetchAl = (e) => {
        e?.preventDefault()
        axios.post('/offwork/al?page='+currentPage, 
        {
            id: id
        },
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            setAl(res.data.data.data)
            setCurrentPage(res.data.data.current_page)
            setNextPage(res.data.data.current_page + 1)
            setLastPage(res.data.data.last_page)
            setPrevPage(res.data.data.current_page - 1)
            setFirstNumber(res.data.data.from)
            console.log(res.data.data.from)

        }) 
    }

    const tabHandler = (e) => {
        setTab(e.target.value)
    }

    const defaultPage = () => {
        setCurrentPage('1')
    }

    useEffect (() => {  
        if(tab == "dp"){
            fetchDp()
        }else if(tab == "eo"){
            fetchEo()
        }else if(tab == "al"){
            fetchAl()
        }
    }, [id, tab, currentPage])

    return (
        <>  
            <dialog id="OffWorkDetail" className="modal">
                <div className="modal-box max-w-xl  ">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={defaultPage}>✕</button>
                    </form>
                    <h3 className="font-bold text-lg">{name}</h3>
                    <div className="container mx-auto">
                        <input type="radio" name="tab" id="day-payment" className="hidden" value={"dp"} checked={tab == "dp"} onClick={(e)=>{tabHandler(e); setCurrentPage(1)}}/>
                        <input type="radio" name="tab" id="extra-off" className="hidden" value={"eo"} checked={tab == "eo"} onClick={(e)=>{tabHandler(e); setCurrentPage(1)}}/>
                        <input type="radio" name="tab" id="annual-leave" className="hidden" value={"al"} checked={tab == "al"} onClick={(e)=>{tabHandler(e); setCurrentPage(1)}}/>

                        <div className="my-6 nav">
                            <label htmlFor="day-payment">
                                <div className="inline-block mx-3 font-sans py-2 px-4 rounded-full">Day Payment</div>
                            </label>
                            <label htmlFor="extra-off">
                                <div className="inline-block mx-3 font-sans py-2 px-4 rounded-full">Extra Off</div>
                            </label>
                            <label htmlFor="annual-leave">
                                <div className="inline-block mx-3 font-sans py-2 px-4 rounded-full">Annual Leave</div>
                            </label>
                        </div>

                        <div className="hidden items-center px-4 border-2 rounded-lg shadow-sm tab-day-payment">
                            <div className="flex flex-col flex-grow">
                                <div className="overflow-x-auto">
                                    <table className="table flex">
                                        {/* head */}
                                        <thead>
                                        <tr>
                                            <th></th>
                                            <th>Date</th>
                                            <th>Replace</th>
                                            <th>Expire</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dp.map((item, index) => {
                                                    let number = firstNumber + index;
                                                    return (
                                                        <tr key={index}>
                                                            <th>{number}</th>
                                                            {
                                                                item.date ?
                                                                    <td>{new Date(item.date).toLocaleDateString('en-GB', formattedDate)}</td>
                                                                : <td> - </td>
                                                            }
                                                            <td>
                                                                {
                                                                    item.replace_date ?
                                                                        <div className=''>{new Date(item.replace_date).toLocaleDateString('en-GB', formattedDate)}</div>
                                                                    : "-"
                                                                }
                                                            </td>
                                                                <td>
                                                                {
                                                                    item.replace_date ?
                                                                        <div className='badge badge-success'>Replaced</div>
                                                                    :
                                                                    item.expire != null && new Date(item.expire) < new Date() ?
                                                                    <div className='badge badge-error'>
                                                                        {/* {new Date(item.expire).toLocaleDateString('en-GB', formattedDate)} */}
                                                                        Expired
                                                                    </div>
                                                                    : item.expire != null && item ?
                                                                    <div className='badge badge-warning'>
                                                                        {new Date(item.expire).toLocaleDateString('en-GB', formattedDate)}
                                                                    </div>
                                                                    : "-"
                                                                }
                                                                </td>
                                                            {/* <td className='btn btn-ghost' onClick={()=>{document.getElementById('OffWorkDetail').close()}}><SlOptions/></td> */}
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                dp.length == 0 &&
                                                <tr>
                                                    <td colSpan='4' className='text-center'>No Data</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                    {
                                        dp.length != 0 ?
                                        <Pagination firstPage={firstPage} prevPage={prevPage} nextPage={nextPage} lastPage={lastPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                                        : null
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="hidden items-center px-8 border-2 rounded-lg shadow-sm tab-extra-off">
                        <div className="flex flex-col flex-grow">
                                <div className="overflow-x-auto">
                                    <table className="table flex">
                                        {/* head */}
                                        <thead>
                                        <tr>
                                            <th></th>
                                            <th>Date</th>
                                            <th>Replace</th>
                                            <th>Expire</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                eo.map((item, index) => {
                                                    let number = firstNumber + index;
                                                    return (
                                                        <tr key={index}>
                                                            <th>{number}</th>
                                                            {
                                                                item.date ?
                                                                    <td>{new Date(item.date).toLocaleDateString('en-GB', formattedDate)}</td>
                                                                : <td> - </td>
                                                            }
                                                            {
                                                                item.replace_date ?
                                                                    <td>{new Date(item.replace_date).toLocaleDateString('en-GB', formattedDate)}</td>
                                                                : <td> - </td>
                                                            }
                                                                <td>
                                                                {
                                                                    item.expire != null && new Date(item.expire) < new Date() ?
                                                                    <div className='badge badge-error'>
                                                                        {/* {new Date(item.expire).toLocaleDateString('en-GB', formattedDate)} */}
                                                                        Expired
                                                                    </div>
                                                                    : item.expire != null && item ?
                                                                    <div className='badge badge-warning'>
                                                                        {new Date(item.expire).toLocaleDateString('en-GB', formattedDate)}
                                                                    </div>
                                                                    : "-"
                                                                }
                                                                </td>
                                                            {/* <td className='btn btn-ghost' onClick={()=>{document.getElementById('OffWorkDetail').close()}}><SlOptions/></td> */}
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                eo.length == 0 &&
                                                <tr>
                                                    <td colSpan='4' className='text-center'>No Data</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                    {
                                        eo.length != 0 &&
                                        <Pagination firstPage={firstPage} prevPage={prevPage} nextPage={nextPage} lastPage={lastPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="hidden items-center px-8 border-2 rounded-lg shadow-sm tab-annual-leave">
                        <div className="flex flex-col flex-grow">
                                <div className="overflow-x-auto">
                                    <table className="table flex">
                                        {/* head */}
                                        <thead>
                                        <tr>
                                            <th></th>
                                            <th>Date</th>
                                            <th>Replace</th>
                                            <th>Expire</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                al.map((item, index) => {
                                                    let number = firstNumber + index;
                                                    return (
                                                        <tr key={index}>
                                                            <th>{number}</th>
                                                            {
                                                                item.date ?
                                                                    <td>{new Date(item.date).toLocaleDateString('en-GB', formattedDate)}</td>
                                                                : <td> - </td>
                                                            }
                                                            {
                                                                item.replace_date ?
                                                                    <td>{new Date(item.replace_date).toLocaleDateString('en-GB', formattedDate)}</td>
                                                                : <td> - </td>
                                                            }
                                                                <td>
                                                                {
                                                                    item.expire != null && new Date(item.expire) < new Date() ?
                                                                    <div className='badge badge-error'>
                                                                        {/* {new Date(item.expire).toLocaleDateString('en-GB', formattedDate)} */}
                                                                        Expired
                                                                    </div>
                                                                    : item.expire != null && item ?
                                                                    <div className='badge badge-warning'>
                                                                        {new Date(item.expire).toLocaleDateString('en-GB', formattedDate)}
                                                                    </div>
                                                                    : "-"
                                                                }
                                                                </td>
                                                            {/* <td className='btn btn-ghost' onClick={()=>{document.getElementById('OffWorkDetail').close()}}><SlOptions/></td> */}
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                al.length == 0 &&
                                                <tr>
                                                    <td colSpan='4' className='text-center'>No Data</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                    {
                                        al.length != 0 &&
                                        <Pagination firstPage={firstPage} prevPage={prevPage} nextPage={nextPage} lastPage={lastPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                                    }
                                </div>
                            </div>
                        </div>
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

export default OffWorkDetail;