import { buttons, formattedDate, formattedDateWOWeekday, formattedDayOnly } from "./utils";
import './style.css';
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import './style.css';

const TaskCalendar = ({fetchData, calendar, task, schedule}) => {
    const [type, setType] = useState('')
    const [shiftType, setShiftType] = useState('')
    const [idStaff, setIdStaff] = useState('')
    const [id, setId] = useState('')
    const [date, setDate] = useState('')

    const updateData = (e) => {
        e?.preventDefault()
        
        const input = {
            id: id,
            id_staff: idStaff,
            date: date,
            type: type
        }

        toast.promise(
            axios.post('/user/manageronduty/store', input,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }),
            {
                loading: 'Updating...',
                success: (res) => {
                    fetchData()
                    setId('')
                    setType('')
                    return res.data.message
                },
                error: (err) => {
                    setId('')
                    setType('')
                    return err.message
                }
            }

        )
    }

    const deleteData = (e) => {
        e?.preventDefault()
        
        const input = {
            id: id,
            id_staff: idStaff,
            type: shiftType,
            date: date
        }
        toast.promise(
            axios.post('/user/manageronduty/delete', input,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }),
            {
                loading: 'Deleting...',
                success: (res) => {
                    fetchData()
                    setId('')
                    setType('')
                    return res.data.message
                },
                error: (err) => {
                    setId('')
                    setType('')
                    return err.response.data.message
                }
            }
        )}

    useEffect(() => {
        if((type || type == null) && (id || id == null)){
            if(type === 'null'){
                deleteData()
            }else {
                updateData()
            }
        }
    }, [type, id])

    return (
            <table id="vertical-sticky-table" className="table table-fixed overflow-x-scroll"> 
                <thead>
                    <tr>
                        <th className="w-36 h-8 overflow-ellipsis overflow-hidden border border-s-0 border-gray-400 bg-gray-200">
                        Name
                        </th>
                        {
                            calendar.map((day, index) => {
                                return (
                                    <th key={index} className="w-20 text-center text-wrap h-20 border-x border-t border-b border-gray-400 text-lg bg-gray-200 text-gray-700">{new Date(day).toLocaleString('en-SG', formattedDayOnly)}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                {task.map((taskItem, taskIndex) => (
                    <tr key={taskIndex} >
                        <th className="h-8 overflow-hidden truncate border-e border-b border-gray-400 bg-gray-200">
                            <div className="text-md font-semibold text-gray-800 truncate">
                                {taskItem.name}
                            </div>
                            <div className="text-xs font-normal text-gray-500 truncate">{taskItem.position}</div>
                        </th>
                        {
                            calendar.map((day, index) => {
                            return (
                                <td key={index} className="w-20 border-x border-b border-gray-400  p-0 align-top" >
                                        <div className="grid grid-flow-row p-1 gap-2">
                                        {
                                            taskItem.data.map((item, index) => {
                                                if(item.date === day){
                                                    if(item.type === 'DP' || item.type === 'EO' || item.type === 'AL'){
                                                        return(
                                                            <div className="btn bg-orange-600 hover:bg-orange-700 text-white">{item.type}</div>
                                                        )
                                                    }else{
                                                        return(
                                                        <select
                                                            key={index}
                                                            className={`btn w-16 h-8 text-xs p-1 truncate ${
                                                                item.type == null ? 'bg-transparent ho text-gray-800' : 
                                                                item.type === 'MOD' ? 'bg-blue-800 hover:bg-blue-800 text-white' : 
                                                                item.type === 'Incharge' ? 'bg-cyan-700 hover:bg-cyan-800 text-white' : 
                                                                item.type === 'shift' ? 'bg-blue-800 hover:bg-blue-800 text-white' : 
                                                                'bg-green-500 hover:bg-green-600 text-white'
                                                            }`}
                                                            value={item.type}
                                                            onChange={(e) => {
                                                                setType(e.target.value);
                                                                setId(item.id);
                                                                setIdStaff(taskItem.id);
                                                                setDate(day);
                                                                setShiftType(item.type);
                                                            }}
                                                        >
                                                            <option className="bg-white text-black" value="null">Not Set</option>
                                                            <option className="bg-white text-black" value="Incharge">Incharge</option>
                                                            <option className="bg-white text-black" value="MOD">MOD</option>
                                                            {schedule.map((scheduleItem, index) => (
                                                                <option key={index} className="bg-white text-black" value={scheduleItem.id}>
                                                                    {scheduleItem.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        )
                                                    }
                                                    
                                                }
                                            })
                                        }

                                        </div>
                                    </td>
                                )
                            })
                        }
                    </tr>
                ))}
                </tbody>
            </table>
    );
}

export default TaskCalendar;