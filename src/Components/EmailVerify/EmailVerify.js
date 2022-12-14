import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Fragment } from 'react'

import './EmailVerify.css'
import UserServices from '../../Services/users.service'

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				 
				const { data } = await UserServices.verify(param.id, param.token);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		<Fragment>
			{validUrl ? (
				<div className='container'>
					<h1>Email verified successfully</h1>
					<Link to="/login">
						<button className='mbutton'>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</Fragment>
	);
};

export default EmailVerify;