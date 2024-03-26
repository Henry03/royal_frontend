import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCurrentMonthYear } from '../../utils';
import TaskCalendar from '../../_taskCalendar';

const ManagerOnDuty = () => {
  const [date, setDate] = useState(getCurrentMonthYear());
  const [scheduleData, setScheduleData] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const [calendar, setCalendar] = useState([]);

  const fetchData = (e) => {
    e?.preventDefault()
    const input = {
      date: date
    }

    axios.post('/user/manageronduty/department/calendar', input,
    {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('admin-token')
        }
    })
    .then(res => {
      setScheduleData(res.data.mergedData);
      setScheduleList(res.data.schedule);
      setCalendar(res.data.data);
    })
  }

  useEffect (() => {
    fetchData()
  }, [date])

  return (
    <>
      <div className="m-5 p-5 md:px-10 bg-base-100 rounded-xl">
          <div className='grid grid-flow-col items-center justify-between'>   
              <h1 className="text-2xl font-semibold">Manager On Duty</h1>
              
          </div>
      </div>
      <div className="m-5 p-3 md:px-5 bg-base-100 rounded-xl">
        <div className='grid grid-flow-col items-center justify-end gap-3 m-3'>   
          <input 
            type="month" 
            placeholder="Date" 
            className="input input-bordered max-w-xs" 
            value={date} 
            onChange={(e)=>setDate(e.target.value)}/>
        </div>
        <div className='overflow-scroll h-dvh'>
          <TaskCalendar fetchData={fetchData} calendar={calendar} task={scheduleData} schedule={scheduleList}/>

        </div>
      </div>
    </>
  );
}


export default ManagerOnDuty;
