import { useState } from "react"
import { Toaster } from "react-hot-toast"

const Shift = ({schedule, setModShift, update}) => {
    const [shift, setShift] = useState('')
    return (
        <dialog id="shift" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Add Shift </h3>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Shift</span>
                        </div>
                        <select className="select select-bordered" value={shift} onChange={(e)=>{setShift(e.target.value),setModShift(e.target.value)}}>
                            <option disabled value={""}>Select Shift</option>
                            {
                                schedule.map((item, index) => {
                                    return(
                                        <option key={index} value={item.id}>{item.name}</option>
                                    )
                                })
                            }
                        </select>   
                        {/* {
                            error.unit &&
                            <label className="label-text-alt mt-1 text-red-500">{error.unit}</label>
                        } */}
                    </label>
                    
                    <div className='grid grid-flow-col gap-5 mt-5'>
                        <button className='btn btn-success w-full' onClick={()=>update()}>Save</button>
                    </div>
                </div>
                <Toaster
                    position="top-right" 
                />
            </dialog>

    )
}

export default Shift