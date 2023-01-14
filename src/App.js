import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './redux/features/authSlice';
import AddEditTour from './pages/AddEditTour';
import SingleTour from './pages/SingleTour';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';
import TagTours from './pages/TagTours';

function App() {
  const dispatch = useDispatch()

  const user = JSON.parse(localStorage.getItem('Profile'))

  useEffect(() => {
    dispatch(setUser(user))
  }, [])


  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />
        <Header></Header>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/register' element={<Register></Register>} ></Route>
          <Route path='/tours/search' element={<Home></Home>}></Route>
          <Route path="/tours/tag/:tag" element={<TagTours></TagTours>} ></Route>
          <Route path='/addTour' element={<PrivateRoute><AddEditTour></AddEditTour></PrivateRoute>} ></Route>
          <Route path='/editTour/:id' element={
            <PrivateRoute> <AddEditTour></AddEditTour></PrivateRoute>} ></Route>
          <Route path="/tour/:id" element={<SingleTour></SingleTour>} ></Route>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>} ></Route>
          <Route path='*' element={<NotFound></NotFound>} ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
