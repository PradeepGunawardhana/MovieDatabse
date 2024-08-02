import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';



function Login() {
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState('');

    const [userPassword, setUserPassword] = useState('');
    // const [message, setMassage] = useState('');






    async function sendUserData(e) {


        e.preventDefault();
        console.log(userEmail);
        console.log(userPassword);

        await axios.post("http://localhost:8000/account/get", { email: userEmail }).then((response) => {

            console.log(response.data.password);

            if (response) {
                
                if (userPassword === response.data.password) {
                    
                    navigate("/");

                }

            }



        }).catch((err) => console.log(err));

    }






    return (


        <div className='wrapper   vh-100'>
            <div className="container vh-100 d-flex flex-column justify-content-center align-items-center ">

                <div className="login-frm bg-dark rounded-5">

                    <form className=' d-flex flex-column  justify-content-center align-items-center px-3' onSubmit={sendUserData}>
                        <h1 className='mb-5'>Login</h1>
                        <div className="mb-3 w-100">

                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="email" onChange={(e) => setUserEmail(e.target.value)} />

                        </div>

                        <div className="mb-3 w-100">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" onChange={(e) => setUserPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Sign In</button>
                    </form>

                </div>



            </div>



        </div>
    )
}

export default Login