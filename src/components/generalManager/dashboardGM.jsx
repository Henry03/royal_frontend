import React, { useEffect, useState } from 'react';
import Time from "../../components/time";
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
import axios from 'axios';
import { format, parse } from 'date-fns';

const DashboardGM = () => {
    const [data, setData] = useState([])
    const [permit, setPermit] = useState([])
    const [dp, setDp] = useState([])
    const [eo, setEo] = useState([])
    const [al, setAl] = useState([])
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const [temp, setTemp] = useState([

    ])

    const fetchData = (e) => {
        e?.preventDefault()

        axios.get('/event', 
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            setData(res.data.data)
        })

        axios.get('/user/outofduty/gm',
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin-token')
            }
        })
        .then(res => {
            setPermit(res.data.data)
        })

        axios.post('/user/leavepermit/gm/approved', {},
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
            // setDate(range.start)
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

    useEffect(()=> {

        if(!isDataLoaded){
            setIsDataLoaded(true)
            fetchData()
        }
    }, [])

    useEffect(()=> {
        if(data.length > 0){
            for(let i = 0; i < data.length; i++){
                // console.log(data[i].title)
                calendar.events.add({
                    start: data[i].start,
                    end: data[i].end,
                    title: data[i].title,
                    id: data[i].id,
                    calendarId: "leisure"
                })
            }
        }
    }, [data])
    
    useEffect(()=> {
        if(permit && permit.length > 0){
            for(let i = 0; i < permit.length; i++){
                calendar.events.add({
                    start: format(parse(permit[i].start_date, 'yyyy-MM-dd HH:mm:ss', new Date()), 'yyyy-MM-dd HH:mm'),
                    end: format(parse(permit[i].end_date, 'yyyy-MM-dd HH:mm:ss', new Date()), 'yyyy-MM-dd HH:mm'),
                    title: 'Out of Duty : ' +  permit[i].Nama,
                    people: [permit[i].Nama],
                    location: permit[i].destination,
                    description: permit[i].purpose,
                    id: '10' + permit[i].id,
                    calendarId: "outofduty"
                })
            }
        }
    }, [permit])

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
            <div className="flex flex-wrap">
                <div className="grow m-5 p-3 md:p-10 bg-base-100 rounded-xl">
                    <Time/>
                </div>

            </div>
            <div className='grow m-5 p-5 md:px-10 bg-base-100 rounded-xl'>
                <ScheduleXCalendar calendarApp={calendar} />
            </div>
        </div>
        
    );
}

export default DashboardGM;