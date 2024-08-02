import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
function Register() {

    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState('');

    const [userFname, setUserFname] = useState('');
    const [userLname, setUserLname] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [message, setMassage] = useState('');



    const userData = { fname: userFname, lname: userLname, email: userEmail, password: userPassword };


    async function addUserData(e) {


        e.preventDefault();

        await axios.post("http://localhost:8000/account/new", userData).then((response) => {


            navigate("/");


        }).catch((err) => console.log(err));

    }









    return (
        <div className='wrapper '>
            <div className="container  vh-100 d-flex flex-column justify-content-center align-items-center ">



                <form className=' frm d-flex justify-content-center align-items-center  flex-column ' onSubmit={addUserData}>

                    <h1 className='mb-5 heading'>Register</h1>
                    <div className="mb-3 w-100">

                        <label for="fname" className="form-label heading">First Name</label>
                        <input type="text" className="form-control " id="fname" aria-describedby="fname" onChange={(e) => setUserFname(e.target.value)} />
                    </div>

                    <div className="mb-3 w-100">

                        <label for="lname" className="form-label heading">Last Name</label>
                        <input type="text" className="form-control" id="lname" aria-describedby="lname" onChange={(e) => setUserLname(e.target.value)} />

                    </div>
                    <div className="mb-3 w-100">

                        <label for="lname" className="form-label heading">Email</label>
                        <input type="text" className="form-control" id="lname" aria-describedby="lname" onChange={(e) => setUserEmail(e.target.value)} />

                    </div>
                    <div className="mb-3 w-100">
                        <label for="lname" className="form-label heading">Paasword</label>
                        <input type="text" className="form-control" id="lname" aria-describedby="lname" onChange={(e) => setUserPassword(e.target.value)} />

                    </div>





                    <button type="submit" className="btn btn-primary mt-3">Sign In</button>

                </form>





            </div>



        </div>
    )
}

export default Register