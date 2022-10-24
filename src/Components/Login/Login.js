import react from 'react';
import UserService from '../../Services/users.service';
import { toast } from "react-toastify";
import {Button, ButtonGroup, Modal, Form} from 'react-bootstrap'
import { useState } from "react";
import './Login.css'
import {login} from '../../Redux/authSlice/apiCalls'
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Logo } from "../../Assets/Logo/E-BOSSY.svg"
import { Link } from 'react-router-dom'

function Signup(props) {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    const handleErrorState = (name, value) => {
		value === ""
			? delete errors[name]
			: setErrors({ ...errors, [name]: value });
	};

    const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
			login(data, dispatch);
		} else {
			console.log("please fill out properly");
		}
	};

    return (
        <div className='navbarContainer' style={{height: '100vh', position: 'absolute'}}>
        <div className='navbarBackground' style={{height: '100vh', position: 'absolute', width: '100%'}}>
        <Link to= '/'><Logo className="logo" style={{marginLeft: '80vh', marginTop: '5vh'}}></Logo></Link> 
        <div className='signupFormContainer'>
            <form className='signupForm' onSubmit={handleSubmit}>
            <input
							className= 'inputlogin1'
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							
						/>
						<input
							className= 'inputlogin'
							type="password"
							placeholder="Mot de passe"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
						/>
                 <button type="submit" className='mbutton' style={{marginLeft: '8vh'}}>Se connecter</button>
            </form>
        </div>
        <Link to = '/signup'><button className='mbutton' style={{marginLeft: '88vh', marginTop: '3vh'}}>Créer un compte</button></Link>
        </div>
        </div>
    )
}

export default Signup