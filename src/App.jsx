import { Route, Routes } from 'react-router-dom'
import Home from './Component/Home/Home'
import Nav from './Component/Nav/Nav'
import Search from './Component/Search/Search'
import Movie from './Component/Movie/Movie'
import Login from './Component/Login/Login'
import './App.css';
import Register from './Component/Register/Register'


function App() {


  return (
    <>
      <div  >
      <Nav />
        <Routes>
          
          <Route path='/search' element={<Search />}/>
          <Route path='/Movie' element={<Movie/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<Home/>}/>

        </Routes>

      </div>

    </>
  )
}

export default App
