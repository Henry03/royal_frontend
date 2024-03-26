import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast"
import { baseURL } from "../../utils";

const ImportStaff = ({setData}) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('csv', file);

        toast.promise(
            axios.post('/staff/upload', formData,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token'),
                    'Content-Type': 'multipart/form-data',
                }
            }),
            {
                loading: 'Uploading...',
                success: (res) => {
                    setData(res.data.data);
                    document.getElementById('importStaff').close();
                    document.getElementById('showImportStaff').showModal();
                    return 'File uploaded';
                },
                error: (err) => {
                    return 'Failed to upload CSV data.';
                }
            }
        )
    };

    return (
        <dialog id="importStaff" className="modal">
            <div className="modal-box">
                <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg text-center">Import Staff</h3>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Upload your file...</span>
                    </div>
                    <input type="file" className="file-input file-input-bordered w-full" onChange={(e)=>handleFileChange(e)}/>
                </label>
                <div className="text-sm mt-3">Need the template? <a href={baseURL+"/download/staff/template"} className="text-blue-700">click here</a></div>
                <div className="grid grid-flow-col mt-5">
                    <button className="btn btn-primary items-center" onClick={handleUpload}>Upload File</button>
                </div>
            </div>
            <Toaster 
                position="top-right"
            />
        </dialog>
    )
}

export default ImportStaff