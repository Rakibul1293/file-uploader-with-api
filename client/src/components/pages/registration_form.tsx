import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Input as InputField, message } from "antd";
import './registration_form.css';

const RegistrationForm = () => {
	const { register, handleSubmit, control, errors } = useForm();
	const history = useHistory();

	const onSubmit = (data: any) => {
		console.log(data);
		
		axios.post('https://file-uploader-with-api.herokuapp.com/auth/signup', data, {
			headers: {
			  'Content-Type': 'application/json'
			}
        })
		.then((data: any) => {
			console.log(data);
			message.success('Registration Successfully!');
			history.push('/login-form');
		})
		.catch(err => {
			console.log(err);
			message.error(err);
		})
	}
	
	const handleLogin = () => {
      history.push('/login-form');
    }

	return (
		<div>
			<h3 className="text-muted text-center">Sign Up</h3>
			<form className="forms form-margin" onSubmit={handleSubmit(onSubmit)}>
				<input name="name" ref={register({ required: true })} placeholder="Your Name" />
				{errors.name && <span className="error">Name is required</span>}

				< input name="email" ref={register({ required: true })} placeholder="Your Email" />
				{errors.email && <span className="error">Email is required</span>}

				<input name="password" ref={register({ required: true })} type="password" placeholder="Your Password" />
				{errors.password && <span id="passErr" className="error">Password is required</span>}
				<input type="submit" />
				<p className="ml-4 mt-2 text-primary font-weight-bold" style={{cursor: "pointer"}} onClick={handleLogin}>Already have an Account ? Please Log In</p>
			</form>
		</div>
	)
}

export default RegistrationForm;