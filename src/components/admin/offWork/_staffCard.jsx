const StaffCard = ({ offWork, setId, onClick}) => {
    const { id, name, al, dp, eo } = offWork;
    return (
        <div className="card basis-5 bg-base-100 shadow-xl">
            {/* <figure>
                <img className="mask mask-circle mt-5" src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
            </figure> */}
            <div className="card-body grid gap-5">
                <h2 className="card-title justify-center text-center h-10">{name}</h2>
                <div className="grid grid-flow-col  ">
                    <div className="grid grid-flow-row items-center justify-items-center">
                        <div className="stat-title">DP</div>
                        <div className="stat-value">{dp.remain}</div>
                        <div className="stat-desc">From {dp.total}</div>
                    </div>
                    <div className="grid grid-flow-row items-center justify-items-center">
                        <div className="stat-title">EO</div>
                        <div className="stat-value">{eo.remain}</div>
                        <div className="stat-desc">From {eo.total}</div>
                    </div>
                    <div className="grid grid-flow-row items-center justify-items-center">
                        <div className="stat-title">AL</div>
                        <div className="stat-value">{al.remain}</div>
                        <div className="stat-desc">From {al.total}</div>
                    </div>
                </div>
                <div className="card-actions justify-end mt-3">
                    <button className="btn btn-primary w-full" onClick={()=>{setId(id); onClick()}}>Detail</button>
                </div>
            </div>
        </div>
    );
}

export default StaffCard;