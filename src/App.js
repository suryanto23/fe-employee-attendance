import React from 'react';
import './style/primary-style.css';
import Sidebar from './components/Sidebar';
import {BrowserRouter as Router, Navigate, Routes, Route} from 'react-router-dom';

import EmployeeListPage from './pages/EmployeeListPage';
import AttendanceManagerPage from './pages/AttendanceManagerPage';
import AttendanceReportPage from './pages/AttendanceReportPage';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <Router>
      <div className='d-flex flex-row'>
        <Sidebar/>
          <div className='w-100'>
            <Routes>
              <Route path="/" element={<EmployeeListPage/>} />
              <Route path="/attendance" element={<AttendanceManagerPage/>} />
              <Route path="/attendance-report" element={<AttendanceReportPage/>} />
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="/404" element={<PageNotFound/>} />
            </Routes>
          </div>

      </div>
    </Router>
  );
}

export default App;
