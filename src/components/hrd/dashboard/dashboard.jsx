import {
    viewDay,
    viewMonthAgenda,
    viewMonthGrid,
    viewWeek,
  } from '@schedule-x/calendar'
import Time from "../../time";
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import { useState, useEffect } from 'react';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import axios from 'axios';
import { format, parse } from 'date-fns';
import { ResponsiveCalendar, ResponsiveCalendarCanvas } from '@nivo/calendar';
import { MdCalendarToday } from "react-icons/md";
import { use } from 'echarts';

const Dashboard = () => {
    const [date, setDate] = useState('')
    const [year, setYear] = useState(new Date().getFullYear())
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const [data, setData] = useState([])
    const [temp, setTemp] = useState([])
    const [outofduty, setOutofduty] = useState([])
    const [dp, setDp] = useState([])
    const [eo, setEo] = useState([])
    const [al, setAl] = useState([])
    const [newStaff, setNewStaff] = useState([])

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

        axios.get('/user/outofduty/calendar/all',
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            setOutofduty(res.data.data)
        })

        axios.get('/user/leavepermit/calendar/all',
        {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            setDp(res.data.dp)
            setEo(res.data.eo)
            setAl(res.data.al)
        })
    }

    const fetchNewStaffData = () => {
        axios.post('/staff/count/newstaff', {year: year},
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            setNewStaff(res.data.data)
        })
    }

    const calendar = useCalendarApp({
        locale: 'id-ID',
        firstDayOfWeek: 0,
        defaultView: viewMonthGrid.name,
        isDark: false,
        callbacks: {
          onRangeUpdate(range) {
            setDate(range.start)
          },
          onClickDate(date) {
            setDate(date)
          },
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

    useEffect(()=> {
        if(year){
            fetchNewStaffData()
        }
    }, [year])

    useEffect(()=> {

        if(!isDataLoaded){
            setIsDataLoaded(true)
            fetchData()
        }
    }, [])

    useEffect(()=> {
        if(outofduty.length > 0){
            for(let i = 0; i < outofduty.length; i++){
                calendar.events.add({
                    start: format(parse(outofduty[i].start_date, 'yyyy-MM-dd HH:mm:ss', new Date()), 'yyyy-MM-dd HH:mm'),
                    end: format(parse(outofduty[i].end_date, 'yyyy-MM-dd HH:mm:ss', new Date()), 'yyyy-MM-dd HH:mm'),
                    title: 'Out of Duty : ' +  outofduty[i].Nama,
                    people: [outofduty[i].Nama],
                    location: outofduty[i].destination,
                    description: outofduty[i].purpose,
                    id: '10' + outofduty[i].id,
                    calendarId: "outofduty"
                })
            }
        }
    }, [outofduty])
    
    useEffect(()=> {
        if(data.length > 0){
            for(let i = 0; i < data.length; i++){
                // console.log(data[i].title)
                calendar.events.add({
                    start: data[i].start,
                    end: data[i].end,
                    title: data[i].title,
                    id: data[i].id
                })
            }
        }
    }, [data])

    useEffect(()=> {
        if(dp && dp.length > 0){
            for(let i = 0; i < dp.length; i++){
                calendar.events.add({
                    start: format(parse(dp[i].replace_date, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd'),
                    end: format(parse(dp[i].replace_date, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd'),
                    title: 'Day Payment : ' +  dp[i].name,
                    people: [dp[i].name],
                    description: 'MOD / Incharge  : ' + format(parse(dp[i].date, 'yyyy-MM-dd', new Date()), 'EEEE, dd MMM yyyy'),
                    id: '10' + dp[i].id,
                    calendarId: "leave"
                })
            }
        }
    }, [dp])
  
      useEffect(()=> {
        if(eo && eo.length > 0){
            for(let i = 0; i < eo.length; i++){
                calendar.events.add({
                    start: format(parse(eo[i].replace_date, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd'),
                    end: format(parse(eo[i].replace_date, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd'),
                    title: 'Extra Off : ' +  eo[i].name,
                    people: [eo[i].name],
                    description: 'Entitlement  : ' + format(parse(eo[i].date, 'yyyy-MM-dd', new Date()), 'EEEE, dd MMM yyyy'),
                    id: '10' + eo[i].id,
                    calendarId: "leave"
                })
            }
        }
    }, [eo])
      useEffect(()=> {
        if(al && al.length > 0){
            for(let i = 0; i < al.length; i++){
                calendar.events.add({
                    start: format(parse(al[i].replace_date, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd'),
                    end: format(parse(al[i].replace_date, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd'),
                    title: 'Annual Leave : ' +  al[i].name,
                    people: [al[i].name],
                    description: 'Entitlement  : ' + format(parse(al[i].date, 'yyyy-MM-dd', new Date()), 'EEEE, dd MMM yyyy'),
                    id: '10' + al[i].id,
                    calendarId: "leave"
                })
            }
        }
    }, [al])

    return (
        <div>
            <div className='bg-base-100 rounded-xl m-5 p-0 md:p-0' style={{height:'40dvh'}}>
                <div className='grid grid-flow-col justify-between p-5'>
                    <span className='font-semibold text-md md:text-xl m-3'>New Staff</span>
                    <label className="input input-bordered flex items-center gap-2">
                        <input className='grow' type="number" placeholder="YYYY" min="1970" max={new Date().getFullYear()} value={year} onChange={(e)=>setYear(e.target.value)}/>
                        <MdCalendarToday/>
                    </label>
                </div>
                <div className='overflow-x-scroll md:overflow-hidden'>

                    <div className='' style={{height:'27dvh', minWidth:'100dvh'}}>
                        <ResponsiveCalendarCanvas
                            data={newStaff}
                            from={year + "-01-01"}
                            to={year + "-12-31"}
                            emptyColor="#eeeeee"
                            colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
                            margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
                            yearSpacing={40}
                            monthBorderColor="#ffffff"
                            dayBorderWidth={2}
                            dayBorderColor="#ffffff"
                            legends={[
                                {
                                    anchor: 'bottom-right',
                                    direction: 'row',
                                    translateY: 36,
                                    itemCount: 4,
                                    itemWidth: 42,
                                    itemHeight: 36,
                                    itemsSpacing: 14,
                                    itemDirection: 'right-to-left'
                                }
                            ]}
                        />

                    </div>
                </div>
            </div>
            <div className='grow m-5 p-0 border border-white md:p-10 bg-base-100 rounded-xl'>
                <ScheduleXCalendar calendarApp={calendar} />
            </div>  

        </div>
        
    )
}

export default Dashboard;