import {Routes, Route} from 'react-router-dom';

import RegisterPage from '../RegisterPage';
import LoginPage from '../LoginPage';
import HomePage from "../HomePage";

import './App.css';

const App = () => {
  return (
    <>
      <Routes>        
        <Route path='register' element={<RegisterPage/>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='/' element={<HomePage/>}/>
      </Routes>     
    </>
  );
}

export default App;
