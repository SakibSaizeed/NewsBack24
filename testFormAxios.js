import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const RegistrationForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async data => {
    try {
      const response = await axios.post("https://your-api.com/register", data);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Name"
        name="name"
        ref={register({ required: true })}
      />
      {errors.name && <p>This field is required</p>}

      <input
        type="email"
        placeholder="Email"
        name="email"
        ref={register({
          required: true,
          pattern: /^\S+@\S+$/i
        })}
      />
      {errors.email && errors.email.type === "required" && (
        <p>This field is required</p>
      )}
      {errors.email && errors.email.type === "pattern" && (
        <p>Invalid email address</p>
      )}

      <input
        type="password"
        placeholder="Password"
        name="password"
        ref={register({ required: true, minLength: 6 })}
      />
      {errors.password && errors.password.type === "required" && (
        <p>This field is required</p>
      )}
      {errors.password && errors.password.type === "minLength" && (
        <p>Password must be at least 6 characters</p>
      )}

      <input type="submit" />
      {message && <p>{message}</p>}
    </form>
  );
};

export default RegistrationForm;
//////////////
/////////////////////////////////////////////////////////
//////////////////////////////////////
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';

const Form = () => {
  const { handleSubmit, register, errors } = useForm();
  const [data, setData] = useState({});

  const onSubmit = async (formData) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        name="title"
        label="Title"
        inputRef={register({ required: true })}
        error={Boolean(errors.title)}
        helperText={errors.title && 'Title is required'}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        name="body"
        label="Body"
        inputRef={register({ required: true })}
        error={Boolean(errors.body)}
        helperText={errors.body && 'Body is required'}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default Form;
