const ConfirmModal = ({title, desc, btn, btnAction, btnType}) => {
    return(
        <dialog id="confirmModal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{desc}</p>
                <div className="modal-action">
                    <div className="grid grid-flow-col gap-5">
                        <form method="dialog" className="grid grid-flow-col gap-5">
                            <button className="btn">Close</button>
                        </form>
                        <button className={`btn ${btnType}`} onClick={btnAction}>{btn}</button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default ConfirmModal;