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
