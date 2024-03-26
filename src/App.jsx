import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardEmployeePage from "./pages/employee/dashboardPage";
import LoginPage from "./pages/login";
import LoginAdminPage from "./pages/loginAdmin";
import DashboardPage from "./pages/user/dashboard";
import StaffPages from "./pages/user/hrd/staff";
import UserPage from "./pages/user/hrd/user";
import CalendarPage from "./pages/user/hrd/calendar";
import OutOfDutyPage from "./pages/employee/outofDutyPage";
import LeavePage from "./pages/employee/leavePage";
import AttendancePage from "./pages/employee/attendancePage";
import AttendanceHRDPage from "./pages/user/hrd/attendance";
import ManagerOnDutyPage from "./pages/admin/managerOnDutyPage";
import OffWorkPage from "./pages/admin/offWorkPage";
import ExtraOffPage from "./pages/admin/extraOffPage";
import OutOfDutyStaffPage from "./pages/user/departementHead/outofDutyPage";
import LeaveStaffPage from "./pages/user/departementHead/leavePage";
import OutOfDutyUserPage from "./pages/user/outofDutyPage";
import LeaveUserPage from "./pages/user/leavePage";
import TelegramPage from "./pages/api/telegram/telegram";
import AnnualPage from "./pages/user/hrd/annual";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        // Employee
        <Route path="/" element={<DashboardEmployeePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/permit/outofduty" element={<OutOfDutyPage />} />
        <Route path="/permit/leave" element={<LeavePage />} />
        <Route path="/attendance" element={<AttendancePage/>} />

        // HRD
        <Route path="/admin/login" element={<LoginAdminPage />} />
        <Route path="/admin" element={<DashboardPage/>} />
        <Route path="/admin/staff" element={<StaffPages/>} />
        <Route path="/admin/user" element={<UserPage/>} />
        <Route path="/admin/calendar" element={<CalendarPage/>} />
        <Route path="/admin/attendance" element={<AttendanceHRDPage/>} />
        <Route path="/admin/api/telegram" element={<TelegramPage/>} />
        <Route path="/admin/annual" element={<AnnualPage/>} />

        // Departement head
        <Route path="/admin/staff/permit/outofduty" element={<OutOfDutyStaffPage/>} />
        <Route path="/admin/staff/permit/leave" element={<LeaveStaffPage/>} />
        <Route path="/admin/permit/outofduty" element={<OutOfDutyUserPage/>} />
        <Route path="/admin/permit/leave" element={<LeaveUserPage/>} />

        // admin
        <Route path="/admin/mod" element={<ManagerOnDutyPage/>} />
        <Route path="/admin/leavebalance" element={<OffWorkPage/>} />
        <Route path="/admin/extraoff" element={<ExtraOffPage/>} />

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
