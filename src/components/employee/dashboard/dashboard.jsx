import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import {
    viewDay,
    viewMonthAgenda,
    viewMonthGrid,
    viewWeek,
    } from '@schedule-x/calendar'
import Time from "../../time";
import { useEffect, useState } from "react";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import axios from "axios";
import { format, parse } from "date-fns";
import { ResponsivePie } from "@nivo/pie";
import Pie from "../../chart/pie";

const Dashboard = () => {
    
    const [temp, setTemp] = useState([])
    const [event, setEvent] = useState([])
    const [outofduty, setOutofduty] = useState([])
    
    const [dp, setDp] = useState([])
    const [eo, setEo] = useState([])
    const [al, setAl] = useState([])

    const [dpBalance, setDpBalance] = useState([])
    const [eoBalance, setEoBalance] = useState([])
    const [alBalance, setAlBalance] = useState([])

    const fetchData = (e) => {
        e?.preventDefault()

        const input = {}

        axios.get('/staff/event', 
        {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .then(res => {
            setEvent(res.data.data)
        })

        axios.get('/outofduty/employee/approved',
        {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .then(res => {
            setOutofduty(res.data.data)
        })

        axios.get('/leavepermit/employee/approved',
        {
            headers: {
              Authorization: localStorage.getItem('token')
            }
        })
        .then(res => {
            setDp(res.data.dp)
            setEo(res.data.eo)
            setAl(res.data.al)
        })

        axios.get('/leavepermit/count/quota/employee',
        {
            headers: {
              Authorization: localStorage.getItem('token')
            }
        })
        .then(res => {
            setDpBalance(res.data.dp)
            setEoBalance(res.data.eo)
            setAlBalance(res.data.al)
        })
    }

    const calendar = useCalendarApp({
        locale: 'en-SG',
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
        if(event.length > 0){
            for(let i = 0; i < event.length; i++){
                calendar.events.add({
                    start: event[i].start,
                    end: event[i].end,
                    title: event[i].title,
                    id: event   [i].id
                })
            }
        }
    }, [event])

    useEffect(()=> {
        if(outofduty && outofduty.length > 0){
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

    useEffect(()=> {
        fetchData()
    }, [])

    return (
        <div className="flex flex-wrap flex-row">
            <div className="grow m-5 p-3 md:p-10 bg-base-100 rounded-xl">
                <Time/>
            </div>
            <div className="grow m-5 p-3 md:p-3 bg-base-100 rounded-xl min-w-0 min-h-0 gap-3">
                <div className="w-full text-center font-bold text-xl m-3">Leave Balance</div>
                <div className=" min-w-0 min-h-0 flex flex-row">
                    
                    <div className="grow min-w-0 min-h-0 max-h-96">
                        <div className="w-full text-center font-semibold">DP</div>
                        <Pie data={dpBalance}/>
                    </div>
                    <div className=" grow min-w-0 min-h-0 max-h-96">
                        <div className="w-full text-center font-semibold">EO</div>
                        <Pie data={eoBalance}/>
                    </div>
                    <div className=" grow min-w-0 min-h-0 max-h-96">
                        <div className="w-full text-center font-semibold">AL</div>
                        <Pie data={alBalance}/>
                    </div>

                </div>
            </div>
            <div className='grow m-5 p-0 border border-white md:p-10 bg-base-100 rounded-xl'>
                <ScheduleXCalendar calendarApp={calendar} />
            </div>  
        </div>
    );
}

export default Dashboard;