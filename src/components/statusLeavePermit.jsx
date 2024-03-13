const StatusLeavePermit = ({status, track, approval}) => { 
    return (
        <>
        {
            status == 0 && track == 1  && approval != 3?
            <span className="badge badge-error">Canceled</span>
            : approval == 2 ?
            <span className="badge badge-success">Approved</span>
            : approval == 3 ?
            <span className="badge badge-error">Rejected</span>
            : <span className="badge badge-warning">Pending</span>

        }
        </>
    )
}

export default StatusLeavePermit;