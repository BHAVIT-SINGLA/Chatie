import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
 import { setAvatarRoute } from "../utils/APIRoutes";
export default function SetAvatar () {
    let navigate=useNavigate();
    const [curAv,setcur]=useState([]);
    const [selectedAv,setselAv]=useState(undefined);
    const [isload,setload]=useState(true);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
    const myfun = (myavtar) =>
    {
        setcur(myavtar);
    }
    const getmore = () =>
    {
        const myavtar=[];
        for (let i = 0; i < 4; i++) {
           
            const result = Math.random().toString(36).substring(2,7);
            const avtarsrc=`https://avatars.dicebear.com/api/avataaars/${result}.svg`;
            myavtar.push(avtarsrc);
        }
        myfun(myavtar);
    }
    
    useEffect( () => {
        if ((!localStorage.getItem("user-chat")) || (JSON.parse(
            localStorage.getItem("user-chat")
          ).avatarImage!=""))
          navigate("/login");
        else
        {
            setTimeout(()=>
            {
                setload(false);
            },2000);
            console.log(isload)
            const myavtar=[];
            for (let i = 0; i < 4; i++) {
               
                const result = Math.random().toString(36).substring(2,7);
                const avtarsrc=`https://avatars.dicebear.com/api/avataaars/${result}.svg`;
                myavtar.push(avtarsrc);
            }
            myfun(myavtar);
            
        }
      }, []);
      const setPic = async ()=>
      {
           if(selectedAv===undefined)
           {
            toast.error("Please Select the Avtar", toastOptions);
           }
           else
           {
            const user = JSON.parse(
                localStorage.getItem("user-chat")
              );
              user.avatarImage=curAv[selectedAv];
            await axios.post(`${setAvatarRoute}/${user._id}`, {
                ...user,
               
              }).then((res)=>
              {
                console.log(res);
                  const reply=res.data;
                  if(reply.user.isAvatarImageSet)
                  {
                    localStorage.setItem(
                     "user-chat",
                      JSON.stringify(reply.user)
                    )
                   
                  }
                  navigate("/");
              }).catch((e)=>
              {
                toast.error("Error setting avatar. Please try again.", toastOptions);
              })
           }
      }
      return (
        <>
          {isload ? (
            <Container>
              <img src={loader} alt="loader" className="loader" />
            </Container>
          ) : (
            <Container>
              <div className="title-container">
                <h1>Pick an Avatar as your profile picture</h1>
              </div>
              <div className="avatars">
            {curAv.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAv === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={avatar}
                    alt="avatar"
                    key={index}
                    onClick={() => setselAv(index)}
                  />
                </div>
              );
            })}
          </div>
          <button  className="submit-btn" onClick={setPic}>
            Set as Profile Picture
          </button>
          <button className="submit-btn avtaar" onClick={getmore}>
            More Profile Avtaar
          </button>
          <ToastContainer />
            </Container>
          )}
        </>
      );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    
      img {
        height: 10rem;
        
      }
    }
    .selected {
      border: 0.6rem solid #4e0eff;
    }
  }
  .submit-btn {
    width: 35%;
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
  .avtaar 
{
    background-color: #00CC66;
    &:hover {
        background-color: #00CC66;
      }
}
`;
