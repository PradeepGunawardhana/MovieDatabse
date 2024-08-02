import React from 'react'
import { NavLink } from 'react-router-dom'

function Nav() {
    return (
        <div>


<nav class="navbar navbar-expand-lg  bg-dark" data-bs-theme="dark">
  <div class="container">

    <NavLink className="navbar-brand" to={"/"}>Movie Database</NavLink>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to={'/'}>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to={'/login'}>Sign In</NavLink>
       
        </li>
        <li className="nav-item">
       
          <NavLink className="nav-link" aria-current="page" to={'/register'}>Sign Up</NavLink>
        </li>
     
       
      </ul>

    </div>
  </div>
</nav>














        </div>
    )
}

export default Nav