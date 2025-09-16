import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import FetchingUser from './components/fetchingUser/FetchingUser';
import Home from './pages/Home';
import Navbar from './components/navbar/Navbar';
import AddUser from './components/addUser/AddUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/AddUser' element={<AddUser />} />
        </Routes>
        <FetchingUser />
      </BrowserRouter>
    </div>
  );
}

export default App;
