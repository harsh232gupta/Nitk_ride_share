
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Add_Ride from './pages/Add_Ride';
import { useState, useEffect } from 'react';
import RefrshHandler from './RefrshHandler';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Set authentication status based on token existence
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path='/Add_Ride' element={<PrivateRoute><Add_Ride /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
