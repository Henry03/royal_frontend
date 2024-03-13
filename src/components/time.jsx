import React, { useState, useEffect } from 'react';
import { LuSun, LuMoon, LuSunrise, LuSunset} from 'react-icons/lu';

const Time = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const amPM = currentTime.getHours() <= 12 ? 'AM' : 'PM';

    const options = {
        weekday: 'long', // Full day name (e.g., Monday)
        day: 'numeric', // Day of the month
        month: 'long', // Full month name (e.g., February)
        year: 'numeric', // Four-digit year
      };

    useEffect(() => {
        // Update the current time every second
        const intervalId = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
    
        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
      }, []);

    return (
        <div className='grid grid-flow-row gap-3'>
            <div className='grid grid-flow-col gap-2'>
                {
                    currentTime.getHours() >= 5 && currentTime.getHours() <= 8 ?
                    <LuSunrise className="text-5xl text-yellow-300"/>
                    : currentTime.getHours() >= 9 && currentTime.getHours() <= 15 ?
                    <LuSun className="text-5xl text-yellow-500"/>
                    : currentTime.getHours() >= 16 && currentTime.getHours() <= 18 ?
                    <LuSunset className="text-5xl text-orange-500"/>
                    : <LuMoon className="text-5xl text-gray-500"/>
                }

                <div className="grid grid-flow-col gap-3 text-center auto-cols-max">
                    <div className="flex flex-col">
                        <span className="countdown font-mono text-3xl">
                        <span style={{"--value":currentTime.getHours()}}></span>
                        </span>
                        days
                    </div> 
                    <div className="flex flex-col">
                        <span className="countdown font-mono text-3xl">
                        <span style={{"--value":currentTime.getMinutes()}}></span>
                        </span>
                        hours
                    </div> 
                    <div className="flex flex-col">
                        <span className="countdown font-mono text-3xl">
                        <span style={{"--value":currentTime.getSeconds()}}></span>
                        </span>
                        min
                    </div> 
                    <div className="flex flex-col">
                        <span className="countdown font-mono text-3xl">
                            {amPM}
                        </span>
                        
                    </div>
                </div>
            </div>
            <div>
                <div className='text-lg font-semibold'>
                    Today :
                </div>
                <div className='text-lg font-semibold'>
                    {currentTime.toLocaleString('en-AU', options)}
                </div>
            </div>
            <button className='btn btn-primary'>View Attendance</button>
        </div>
    );
}

export default Time;