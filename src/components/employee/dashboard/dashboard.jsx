import Time from "../../time";

const Dashboard = () => {
    return (
        <div className="flex flex-wrap">
            <div className="grow m-5 p-3 md:p-10 bg-base-100 rounded-xl">
                <Time/>
            </div>
            <div className="grow m-5 p-3 md:p-10 bg-base-100 rounded-xl">
                <Time/>
            </div>
            <div className="grow m-5 p-3 md:p-10 bg-base-100 rounded-xl">
                <Time/>
            </div>

        </div>
    );
}

export default Dashboard;