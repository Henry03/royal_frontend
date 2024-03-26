const ApiStatus = ({ status }) => {
    return (
        <>
        {
            <span className={`badge badge-${status === 'Active' ? 'success' : status === 'Inactive' || status === 'Banned' ? 'error' : status === 'Pending' ? 'warning' : ''}`}>{status}</span>
        }
        </>
    );
}

export default ApiStatus;