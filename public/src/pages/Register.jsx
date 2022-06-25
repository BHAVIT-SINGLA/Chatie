import {React,useState} from 'react';
import styled, { css } from 'styled-components';
import {Link} from "react-router-dom";
import logo from "../assets/logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/APIRoutes';
import axios from 'axios';
function Register () {
    const [data,newdata] =useState(
        {
            username: "",
            email: "",
            password : "",
            confirmPassword : ""
        }
    )
    const handleSubmit = async (event) =>
    {
         event.preventDefault();
         if(handleValidation())
         {
            const {username,email,password,confirmPassword}=data;
            const{postData} = await axios.post(registerRoute,
                {
                    username,
                    email,
                    password,
                    confirmPassword
                });
         }
    }
    const handleChange =(event) =>
    {
        newdata(
        {
            ...data,
            [event.target.name]:event.target.value
        }
        )
    }
    const handleValidation = () =>
    {
        const {username,email,password,confirmPassword} = data;
        if(password!=confirmPassword)
        {
           toast.error("Password and confirm password are not same",
          { 
          position: "bottom-right",
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          } 
        )}
        else if(username.length<3)
        {
            toast.error("Username length should be greater than 3",
            {
                position: "bottom-right",
                autoClose: 8000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            })
        }
        else if(password.length<8)
        {
            toast.error("Password length should be greater than 8",
            {
                position: "bottom-right",
                autoClose: 8000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            })
        }
        else if(email=="")
        {
            toast.error("Please enter the email",
            {
                position: "bottom-right",
                autoClose: 8000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            })
        }
    }
    return (
        <>
        <FormContainer>
            <form onSubmit={(event)=>{handleSubmit(event)}}>
            <div className="brand">
            <img src={logo} alt="logo" />
            <h1>CHATTY😉</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(event) => {handleChange(event)}}
          
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(event) => {handleChange(event)}}
           
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => {handleChange(event)}}
           
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(event) => {handleChange(event)}}
           
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
            </form>
        </FormContainer>
        <ToastContainer/>
        </>
    )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
   
    justify-content: center;
    img {
      height: 6rem;
      width: 45%;
    }
    h1 {
      color: white;
      
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;