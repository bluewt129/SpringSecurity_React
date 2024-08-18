import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginComponent from './component/LoginComponent';
import MainHomeComponent from './component/MainHomeComponent';
import AdminComponent from './component/AdminComponent';
import RegisterFormComponent from './component/RegisterFormComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginComponent />}/>
          <Route path='/register' element={<RegisterFormComponent/>}/>
          <Route path="/mainhome" element={<MainHomeComponent />}/>
          <Route path="/admin" element={<AdminComponent/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
