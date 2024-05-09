import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddEmployee from './components/AddEmployee';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="bg-[#272937] relative min-h-[100vh] h-auto">
      <Navbar />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/addEmployee' element={<AddEmployee />} />

      </Routes>            
    </div>
  );
}

export default App;
