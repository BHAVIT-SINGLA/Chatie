import React,{useState,useEffect,useRef} from 'react'
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIRoutes";
import Contact from "../components/Contact";
import Welcome from "../components/Welcome";
import ChatArea from "../components/ChatArea";
import {io} from "socket.io-client";
import { host } from '../utils/APIRoutes';
export default function Chat () {
  const socket =useRef();
  const [contacts,setContacts] =useState([]);
  const [currentUser,setCurrentUser] =useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  let navigate=useNavigate();
  useEffect( () => {
    if (!localStorage.getItem("user-chat")) {
      navigate("/login");
    } else {
      setCurrentUser(
        JSON.parse(
          localStorage.getItem("user-chat")
        )
      );
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect( () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
         axios.get(`${allUsersRoute}/${currentUser._id}`).then((res) =>
         {
            
            const reply=res.data;
            console.log(reply);
            setContacts(reply);

         }).catch((e)=>
         {
              console.log(e);
         })
        
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
    return (
        <>
         <Container>
        <div className="container">
        <Contact contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatArea currentChat={currentChat} socket={socket} />
          )}
        </div>
        </Container>
        </>
       
    )
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;