import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginView from './routes/loginView';
import DashboardView from './routes/dashboardView';
import EditProfileView from './routes/editProfileView';
import SignOutView from './routes/signOutView';
import PublicProfileView from './routes/publicProfileView';
import ChooseUserNameView from './routes/chooseUsernameView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DashboardView />}></Route>
      <Route path="login" element={<LoginView />}></Route>
      <Route path="dashboard" element={<DashboardView />}></Route>
      <Route path="dashboard/profile" element={<EditProfileView />}></Route>
      <Route path="signout" element={<SignOutView/>}></Route>
      <Route path="u/:username" element={<PublicProfileView/>}></Route>
      <Route path="choose-username" element={<ChooseUserNameView/>}></Route>
      
      
    </Routes>

  </BrowserRouter>,
  document.getElementById("root")
);

