import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import {UserContextProvider} from './context/UserContext';


function App() {
  return (
    <div>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />            
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}



export default App;
