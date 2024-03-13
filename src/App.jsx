import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardEmployeePage from "./pages/employee/dashboardPage";
import LoginPage from "./pages/login";
import LoginAdminPage from "./pages/loginAdmin";
import DashboardPage from "./pages/user/dashboard";
import StaffPages from "./pages/user/hrd/staff";
import UserPage from "./pages/user/hrd/user";
import CalendarPage from "./pages/user/hrd/calendar";
import OutOfDutyPage from "./pages/employee/outofDutyPage";
import OutOfDutyUserPage from "./pages/user/departementHead/outofDutyPage";
import LeavePage from "./pages/employee/leavePage";
import AttendancePage from "./pages/employee/attendancePage";
import AttendanceHRDPage from "./pages/user/hrd/attendance";
import ManagerOnDutyPage from "./pages/admin/managerOnDutyPage";
import LeaveUserPage from "./pages/user/departementHead/leavePage";
import OffWorkPage from "./pages/admin/offWorkPage";



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

        // Departement head
        <Route path="/admin/permit/outofduty" element={<OutOfDutyUserPage/>} />
        <Route path="/admin/permit/leave" element={<LeaveUserPage/>} />

        // admin
        <Route path="/admin/mod" element={<ManagerOnDutyPage/>} />
        <Route path="/admin/offwork" element={<OffWorkPage/>} />

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
