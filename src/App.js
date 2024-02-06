import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddEmployee from './components/AddEmployee';

function App() {
  return (
    <div className="bg-[#272937] min-h-[100vh] h-auto">
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/addEmployee' element={<AddEmployee />} />

      </Routes>            
    </div>
  );
}

export default App;
