import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router';
import Select from "react-select";
import { Input as InputField, message } from "antd";
import './form.css';
require('dotenv').config();

const Form = () => {
	const { register, handleSubmit, control, errors } = useForm();
	const history = useHistory();

	const onSubmit = (data: any) => {
		console.log(data);
		console.log(data.select.value);
		console.log(data.file[0].name);
		
		//const file_name = data.file[0].name;
		//const form_data = data;
		//form_data.file = file_name;
		//console.log(form_data);
		
		const formData: any = new FormData();
		formData.append('name', data.name);
		formData.append('email', data.email);
		formData.append('file', data.file[0]);
		formData.append('TextField', data.TextField);
		formData.append('select', data.select.value);
				
		/*
		fetch("https://file-uploader-with-api.herokuapp.com/api/userInfo", {
			method: 'POST',
			headers: {
				'content-Type': 'multipart/form-data'
			},
			body: JSON.stringify(data),
		})
		*/
		
		//axios.post('http://localhost:5000/api/userInfo', formData, {
		axios.post('https://file-uploader-with-api.herokuapp.com/api/userInfo', formData, {
			headers: {
			  'Content-Type': 'multipart/form-data'
			  //'Authorization' : `Bearer ${}`
			}
        })
		.then((data: any) => {
			console.log(data);
			localStorage.setItem("token", JSON.stringify(data.token));
			//localStorage.setItem("name", JSON.stringify(data.user.name));
			if(data.message === "Auth failed") return message.error("You are not registerd user !!!");
			message.success('User Added Successfully!');
			history.push('/list');
		})
		.catch(err => {
			console.log(err);
			message.error(err);
		})
	}

	return (
		<div className="add-user">
			<h3 className="text-muted text-center">Please Fill Up This Form</h3>
			< form className="forms form-margin" onSubmit={handleSubmit(onSubmit)} >

				<input name="name" ref={register({ required: true })} placeholder="Your Name" />
				{errors.name && <span className="error">Name is required</span>}

				<input name="email" ref={register({ required: true })} placeholder="Your Email" />
				{errors.email && <span className="error">Email is required</span>}

				<input name="file" ref={register({ required: true })} type="file" />
				{errors.file && <span className="error">Image is required</span>}

				<Controller style={{ marginTop: "30px", marginBottom: "30px" }} as={InputField.TextArea} name="TextField" control={control} defaultValue="" />
				{errors.TextField && <span className="error">Text Field is required</span>}

				<Controller
					name="select"
					as={Select}
					options={[
						{ value: "chocolate", label: "Chocolate" },
						{ value: "strawberry", label: "Strawberry" },
						{ value: "vanilla", label: "Vanilla" }
					]}
					control={control}
					rules={{ required: true }}
				/>

				<input
					className="checkbox"
					style={{ marginTop: "30px", marginBottom: "10px", display: "inline", width: "33px" }}
					ref={register({ required: 'This is required' })}
					name="MyCheckbox"
					type="checkbox"
				/>If you agree please check this box
				{errors.MyCheckbox && <span className="error">{errors.MyCheckbox.message}</span>}
				<input type="submit" />
			</form >
		</div>
	)
}

export default Form;