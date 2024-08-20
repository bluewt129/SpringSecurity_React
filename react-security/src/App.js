import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginComponent from './component/LoginComponent';
import MainHomeComponent from './component/MainHomeComponent';
import AdminComponent from './component/AdminComponent';
import RegisterFormComponent from './component/RegisterFormComponent';
import UserPageComponent from './component/UserPageComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginComponent />}/>
          <Route path='/register' element={<RegisterFormComponent/>}/>
          <Route path="/mainhome" element={<MainHomeComponent />}/>
          <Route path="/admin" element={<AdminComponent/>}/>
          <Route path="/userPage" element={<UserPageComponent/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
