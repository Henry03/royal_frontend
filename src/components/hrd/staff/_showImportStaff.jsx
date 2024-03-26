import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast"
import { baseURL } from "../../utils";
import { set } from "date-fns";

const ShowImportStaff = ({data, fetchDataParent}) => {
    const [importData, setImportData] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleUpload = async () => {

        toast.promise(
            axios.post('/staff/import', {data: importData},
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token'),
                }
            }),
            {
                loading: 'Uploading...',
                success: (res) => {
                    document.getElementById('showImportStaff').close();
                    fetchDataParent();
                    return 'Import data successfully.';
                },
                error: (err) => {
                    console.error(err);
                    return 'Failed to import data.';
                }
            }
        )
    };

    const handleCheckboxChange = (staff) => {
        const isChecked = importData.some(item => item.nik === staff.nik);
        if (isChecked) {
            setImportData(prevData => prevData.filter(item => item.nik !== staff.nik));
            
        } else {
            setImportData(prevData => [...prevData, staff]);
        }
    };

    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectAll(false);
            setImportData([]);
        } else {
            setSelectAll(true);
            setImportData([...data]);
        }
    };

    useEffect(() => {
        if(data.length != 0){
            if (importData.length === data.length) {
                setSelectAll(true);
            } else {
                setSelectAll(false);
            }
        }
    }, [importData]);

    return (
        <dialog id="showImportStaff" className="modal">
            <div className="modal-box w-11/12 max-w-3xl">
                <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg text-center">Import Staff</h3>
                <div className="overflow-x-auto ">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" 
                                            onChange={handleSelectAllChange}
                                            checked={selectAll}
                                        />
                                    </label>
                                </th>
                                <th>Name</th>
                                <th>NIK</th>
                                <th>Unit</th>
                                <th>Position</th>
                                <th>Phone Number</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody> 
                            {
                                data && data.length == 0 &&
                                <tr>
                                    <td colSpan='6' className='text-center'>No Data</td>
                                </tr>
                            }
                            {
                                data.map((staff, index) => {
                                    return (
                                        <tr key={index}>         
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox" 
                                                        onChange={() => handleCheckboxChange(staff)} // Handle checkbox change
                                                        checked={importData.some(item => item.nik === staff.nik)}
                                                    />
                                                </label>
                                            </th>
                                            <td>{staff.name}</td>
                                            <td>{staff.nik}</td>
                                            <td>{staff.unit_name}</td>
                                            <td>{staff.position}</td>
                                            <td>{staff.phone_number}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="grid grid-flow-col mt-5">
                    <button className="btn btn-primary items-center" onClick={handleUpload}>Import all data</button>
                </div>
            </div>
            <Toaster 
                position="top-right"
            />
        </dialog>
    )
}

export default ShowImportStaff