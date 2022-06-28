import React from "react";
import styled from "styled-components";
import Logout from "./Logout";
export default function ChatArea({currentChat})
{
    return (
        <>
        <Container>
            <div className="chat-header">
                <div className="user-details">
                <div className="avatar">
                    <img src={currentChat.avatarImage} alt="avatar" />
                </div>
                <div className="username">
                     <h2>{currentChat.username}</h2>
                </div>
            </div>
            <Logout/>
            </div>
            <div className="chat-message"></div>
            <div className="chat-input"></div>
        </Container>
        </>
    )
}
const Container = styled.div`
display: grid;
grid-template-rows: 10% 80% 10%;
gap: 0.1rem;
overflow: hidden;
@media screen and (min-width: 720px) and (max-width: 1080px) {
  grid-template-rows: 15% 70% 15%;
}
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  .user-details {
    display: flex;
    align-items: center;
    gap: 1rem;
    .avatar {
      img {
        height: 3rem;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
  }
}

  
 
}
`