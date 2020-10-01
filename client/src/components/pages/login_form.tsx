import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Input as InputField, message } from "antd";
import './login_form.css';
require('dotenv').config();

const LoginForm = () => {
	const { register, handleSubmit, control, errors } = useForm();
	const history = useHistory();

	const onSubmit = (data: any) => {
		console.log(data);
		
		axios.post('https://file-uploader-with-api.herokuapp.com/auth/login', data, {
			headers: {
			  'Content-Type': 'application/json'
			  //'Authorization' : `Bearer ${}`
			}
        })
		.then((data: any) => {
			console.log(Object.keys(data));
			console.log(data);
			console.log(data.data);
			localStorage.setItem("token", data.data.token);
			if(data.data.message === "Auth failed") return message.error("User doesn't exist");
			message.success('Login Successfully!');
			history.push('/list');
		})
		.catch(err => {
			console.log(err);
			message.error("User doesn't exist");
		})
	}
  
    const handleRegistration = () => {
      history.push('/registration-form');
    }

	return (
		<div>
			<h3 className="text-muted text-center">Login Form</h3>
			<form className="forms form-margin" onSubmit={handleSubmit(onSubmit)} style={{marginLeft: "395px!important"}} >
				< input name="email" ref={register({ required: true })} placeholder="Your Email" />
				{errors.email && <span className="error">Email is required</span>}

				<input name="password" ref={register({ required: true })} type="password" placeholder="Your Password" />
				{errors.password && <span id="passErr" className="error">Password is required</span>}
				<input type="submit" />
				<p className="ml-4 mt-2 text-primary font-weight-bold" style={{cursor: "pointer"}} onClick={handleRegistration}>Create a new Account ? Please Sign Up</p>
			</form >
		</div>
	)
}

export default LoginForm;