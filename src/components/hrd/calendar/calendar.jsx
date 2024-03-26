import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SlOptions } from 'react-icons/sl'
import Pagination from '../../pagination'
import {AiOutlineSortAscending, AiOutlineSortDescending} from 'react-icons/ai'
import { Toaster } from 'react-hot-toast'
import {
    createCalendar,
    viewDay,
    viewMonthAgenda,
    viewMonthGrid,
    viewWeek,
  } from '@schedule-x/calendar'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import '@schedule-x/theme-default/dist/index.css'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import AddEvent from './addEvent'
import EventDetail from './eventDetail'
import { format, parse } from 'date-fns';

const calendar = () => {
    const [firstPage, setFirstPage] = useState('1')
    const [lastPage, setLastPage] = useState('')
    const [prevPage, setPrevPage] = useState('')
    const [nextPage, setNextPage] = useState('')
    const [currentPage, setCurrentPage] = useState('')
    const [filter, setFilter] = useState('tgl_libur')
    const [sort, setSort] = useState('asc')
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [dataByDate, setDataByDate] = useState([])
    const [id, setId] = useState('')
    const [date, setDate] = useState('')
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const [temp, setTemp] = useState([])
    const [outofduty, setOutofduty] = useState([])
    const [dp, setDp] = useState([])
    const [eo, setEo] = useState([])
    const [al, setAl] = useState([])

    const fetchData = (e) => {
        e?.preventDefault()

        const input = {}

        if(date){
            input.date = date
        }

        axios.get('/event', 
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            setData(res.data.data)
        })
    }

    const fetchDataByDate = (e) => {
        e?.preventDefault()

        const input = {
            search: search,
            filter: filter,
            sort: sort
        }

        if(date){
            input.date = date
        }

        axios.post('/eventbydate?page='+currentPage, input,
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            setDataByDate(res.data.data.data)
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

    const calendar = useCalendarApp({
        locale: 'id-ID',
        firstDayOfWeek: 0,
        defaultView: viewMonthGrid.name,
        isDark: false,
        // dayBoundaries: {
        //   start: '06:00',
        //   end: '18:00',
        // },
        callbacks: {
          onRangeUpdate(range) {
            setDate(range.start)
          },
        //   onEventUpdate(updatedEvent) {
        //     console.log('onEventUpdate', updatedEvent)
        //   },
        //   onEventClick(calendarEvent) {
        //     console.log('onEventClick', calendarEvent)
        //   },
          onClickDate(date) {
            setDate(date)
          },
        //   onClickDateTime(dateTime) {
        //     console.log('onClickDateTime', dateTime) // e.g. 2024-01-01 12:37
        //   }
        },
        views: [viewMonthGrid, viewDay, viewMonthAgenda, viewWeek],
        events: temp     ,
        plugins: [createEventModalPlugin()],
        calendars: {
            outofduty: {
              colorName: 'personal',
              lightColors: {
                main: '#f9d71c',
                container: '#fff5aa',
                onContainer: '#594800',
              },
              darkColors: {
                main: '#fff5c0',
                onContainer: '#fff5de',
                container: '#a29742',
              },
            },
            leave: {
              colorName: 'work',
              lightColors: {
                main: '#f91c45',
                container: '#ffd2dc',
                onContainer: '#59000d',
              },
              darkColors: {
                main: '#ffc0cc',
                onContainer: '#ffdee6',
                container: '#a24258',
              },
            },
            event: {
              colorName: 'leisure',
              lightColors: {
                main: '#1cf9b0',
                container: '#dafff0',
                onContainer: '#004d3d',
              },
              darkColors: {
                main: '#c0fff5',
                onContainer: '#e6fff5',
                container: '#42a297',
              },
            },
            school: {
              colorName: 'school',
              lightColors: {
                main: '#1c7df9',
                container: '#d2e7ff',
                onContainer: '#002859',
              },
              darkColors: {
                main: '#c0dfff',
                onContainer: '#dee6ff',
                container: '#426aa2',
              },
            },
        },

        
    })

    useEffect(() => {
        fetchDataByDate()
        
    }, [search, filter, sort, currentPage ])

    useEffect(()=> {

        if(!isDataLoaded){
            setIsDataLoaded(true)
            fetchData()
        }
    }, [])
    
    useEffect(()=> {
        fetchDataByDate()
    }, [date])
    
    useEffect(()=> {
        if(data.length > 0){
            calendar.events.set(data)
        }
    }, [data])
    
    return (
        <>
            <div className="m-5 p-5 md:px-10 bg-base-100 rounded-xl">
                <div className='grid grid-flow-col items-center justify-between mb-5'>
                    <h1 className="text-2xl font-semibold">Calendar & events</h1>
                    <button className="btn btn-primary w-40" onClick={()=>document.getElementById('addEvent').showModal()}>Add Event</button>
                </div>
                <div>
                    <ScheduleXCalendar calendarApp={calendar} />
                </div>
            </div>
            <div className="m-5 p-3 md:p-10 bg-base-100 rounded-xl">
                <div className='grid grid-flow-col justify-between mb-3'>
                    <div className='grid grid-flow-col'>
                        <select className="select select-bordered w-full max-w-xs" value={filter} onChange={(e)=>setFilter(e.target.value)}>
                            <option value="tgl_libur">Start Date</option>
                            <option value="Nama_libur">Title</option>
                        </select>
                        <label className="swap swap-rotate ms-2">
                            <input type="checkbox" />
                            <AiOutlineSortDescending className="swap-on" size='25' onClick={()=>setSort('desc')}/>
                            <AiOutlineSortAscending className="swap-off" size='25' onClick={()=>setSort('asc')}/>
                        </label>
                        
                    </div>
                    
                    <form onSubmit={(e)=>fetchDataByDate(e)}>
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
                                <th>Title</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody> 
                            {
                                dataByDate.length == 0 &&
                                <tr>
                                    <td colSpan='6' className='text-center'>No Data</td>
                                </tr>
                            }
                            {
                                dataByDate.map((event, index) => {
                                    return (
                                        <tr key={index}>
                                            <th>{event.title}</th>
                                            <td>{event.start}</td>
                                            <td>{event.end}</td>
                                            <td className='btn btn-ghost' onClick={()=>{document.getElementById('eventDetail').showModal();setId(event.id)}}><SlOptions/></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <Pagination firstPage={firstPage} prevPage={prevPage} nextPage={nextPage} lastPage={lastPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>
            <AddEvent fetchDataParent={fetchData} fetchDataByDateParent={fetchDataByDate}/>
            <EventDetail fetchDataParent={fetchData} fetchDataByDateParent={fetchDataByDate} data={data} calendar={calendar} id={id}/>
            <Toaster 
                position="top-right"
            />
        </>
    )
}

export default calendar