import {FaRegCircleXmark, FaRegClock, FaRegCircleCheck} from 'react-icons/fa6'

const Status = ({track, status}) => {
    return (
        
            track == 1 && status == 1?
            <td className='text-yellow-600'>
                <div className="badge badge-warning gap-3 p-3">
                    <FaRegClock/>Pending Chief / HOD Approval
                </div>
            </td>
            : track == 2 && status == 1?
            <td className='text-yellow-600'>
                <div className="badge badge-warning gap-3 p-3">
                    <FaRegClock/>Pending HR Acknowledged
                </div>
            </td>
            : track == 3 && status == 1?
            <td className='text-yellow-600'>
                <div className="badge badge-warning gap-3 p-3">
                    <FaRegClock/>Pending HR Acknowledged
                </div>
            </td>
            : track == 4 && status == 1 ?
            <td>
                <div className="badge badge-warning gap-3 p-3">
                    <FaRegClock/>Pending HR Acknowledged
                </div>
            </td>
            : track == 5 && status == 1 ?
            <td>
                <div className="badge badge-warning gap-3 p-3">
                    <FaRegClock/>Pending GM Approval
                </div>
            </td>
            : track == 6 && status == 1 ?
            <td>
                <div className="badge badge-success gap-3 p-3">
                    <FaRegClock/>Permit Approved
                </div>
            </td>
            : track == 1 && status == 0 ?
            <td>
                <div className="badge badge-error gap-3 p-3">
                    <FaRegCircleCheck/>Canceled
                </div>
            </td>
            : track == 2 && status == 0 ?
            <td>
                <div className="badge badge-error gap-3 p-3">
                    <FaRegCircleCheck/>Rejected by Chief
                </div>
            </td>
            : track == 3 && status == 0 ?
            <td>
                <div className="badge badge-error gap-3 p-3">
                    <FaRegCircleCheck/>Rejected by Asst HOD
                </div>
            </td>
            : track == 4 && status == 0 ?
            <td>
                <div className="badge badge-error gap-3 p-3">
                    <FaRegCircleCheck/>Rejected by HOD
                </div>
            </td>
            : track == 5 && status == 0 ?
            <td>
                <div className="badge badge-error gap-3 p-3">
                    <FaRegCircleXmark/>Rejected by GM
                    </div>
            </td>
            : track == 6 && status == 0 ?
            <td>
                <div className="badge badge-error gap-3 p-3">
                    <FaRegCircleXmark/>Rejected by HRD
                    </div>
            </td>
            : <td>{
                console.log(track, status)
            }</td>
    )
}

export default Status;