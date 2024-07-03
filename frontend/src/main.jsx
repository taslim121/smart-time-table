import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import "./index.css";
import store from "./redux/store.js"
import {Provider} from "react-redux";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import Teacherlist from './pages/Admin/Teacherlist.jsx';

//restricted
import Home from "./pages/Home.jsx";
import Register from './pages/Auth/Register.jsx';
import Login from './pages/Auth/Login.jsx';
import PrivateRoute from './pages/Auth/PrivateRoute.jsx';
import Profile from './pages/User/Profile.jsx';
import AdminRoute from './pages/Admin/AdminRoute.jsx';
import CreateTable from './pages/Admin/CreateTable.jsx';
import AdminTablesList from './pages/Admin/AdminTablesList.jsx';
import TableDetails from './pages/Tables/TableDetails.jsx';
import UpdateTables from './pages/Admin/UpdateTables.jsx';
import UpdateSubject from './pages/Admin/UpdateSubject.jsx';
import AllTables from './pages/Tables/AllTables.jsx';
import AdminDashBoard from './pages/Admin/Dashboard/AdminDashBoard.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
        <Route path='' element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
          <Route index={true} path='/' element ={<Home />}/>
          <Route path ="/timetables" element={<AllTables/>}/>          <Route path="/tables/:id" element={<TableDetails />} />
        </Route>
      <Route path='' element={<AdminRoute/>}>
        <Route path="/admin/tables/teacher" element={<Teacherlist />} />
        <Route path="/admin/tables/create" element={<CreateTable/>} />
        <Route path="/admin/tables-list" element={<AdminTablesList/>} />
        <Route path="/admin/tables/update/:id" element={<UpdateTables/>}/>
        <Route path="/admin/tables/update/:tableId/:day/:subjectId" element={<UpdateSubject/>}/>
        <Route path="admin/timetable/dashboard" element={<AdminDashBoard/>}/>
      </Route>
    </Route>
      ));
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
    <RouterProvider router={router} />
  </Provider>
  
)
