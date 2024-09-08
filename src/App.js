import logo from './logo.svg';
import './styles/style.css';
import './styles/loginStyles.css';
import Dashboard from './components/Dashboard';
import { Routes, Route } from 'react-router-dom';
import LogIn from './components/LogIn';



function App() {
  return (
    
    <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/log-in" element={<LogIn />} />
       
      </Routes>

  );
}

export default App;
