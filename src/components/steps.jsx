const Steps = ({track, status}) => {
    return (
        <ul className="steps steps-vertical sm:steps-horizontal">
            {
                track == 1 && status == 1?
                    <>
                        <li className="step step-primary">Requested by Employee</li>
                        <li className="step">HOD / Asst. HOD</li>
                        <li className="step">HR</li>
                    </>
                :
                track == 2 && status == 1 ?
                    <>
                        <li className="step step-primary">Requested by Employee</li>
                        <li className="step step-primary">Approved by Chief</li>
                        <li className="step">HR</li>
                    </>
                :
                track == 3 && status == 1 ?
                    <>
                        <li className="step step-primary">Requested by Employee</li>
                        <li className="step step-primary">Approved by Asst. HOD</li>
                        <li className="step">HR</li>
                    </>
                :
                track == 4 && status == 1 ?
                    <>
                        <li className="step step-primary">Requested by Employee</li>
                        <li className="step step-primary">Approved by HOD</li>
                        <li className="step">HR</li>
                    </>
                :
                track == 5 && status == 1 ?
                    <>
                        <li className="step step-primary">Requested by Employee</li>
                        <li className="step step-primary">Approved by GM</li>
                        <li className="step">HR</li>
                    </>
                :
                track == 6 && status == 1 ?
                    <>
                        <li className="step step-primary">Requested by Employee</li>
                        <li className="step step-primary">Approved by chief / HOD</li>
                        <li className="step step-primary">Acknowledged by HR</li>
                    </>
                :
                track == 1 && status == 0 ?
                    <>
                        <li className="step step-error">Canceled by Employee</li>
                        <li className="step">Chief / HOD</li>
                        <li className="step">HR</li>
                    </>
                :
                track == 2 && status == 0 ?
                    <>
                        <li className="step step-primary">Requested by Employee</li>
                        <li className="step step-error">Rejected by Chief</li>
                        <li className="step">HR</li>
                    </>
                :
                track == 3 && status == 0 ?
                    <>
                        <li className="step step-primary">Requested by Employee</li>
                        <li className="step step-error">Rejected by Asst. HOD</li>
                        <li className="step">HR</li>
                    </>
                :
                track == 4 && status == 0 ?
                    <>
                        <li className="step step-primary">Requested by Employee</li>
                        <li className="step step-error">Rejected by HOD</li>
                        <li className="step">HR</li>
                    </>
                :
                track == 5 && status == 0 ?
                    <>
                        <li className="step step-primary">Requested by Employee</li>
                        <li className="step step-error">Rejected by GM</li>
                        <li className="step">HR</li>
                    </>
                :
                track == 6 && status == 0 ?
                    <>
                        <li className="step step-primary">Requested by Employee</li>
                        <li className="step step-primary">Approved by HOD / Asst. HOD</li>
                        <li className="step step-error">Rejected by HR</li>
                    </>
                :
                <>
                </>
            }
        </ul>
    )
}

export default Steps;