import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import loader from "../assets/loader.gif";
import {useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from "buffer";

export default function SetAvatar(){
    const api = 'https://api.multiavatar.com/45678945';
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    const setProfilePicture = async () => {

    };
    useEffect(() => {
        async function getAvatar() {
            const data = [];
            for (let i = 0; i < 4; i++) {
              const image = await axios.get(
                `${api}/${Math.round(Math.random() * 1000)}`
              );
              const buffer = new Buffer(image.data);
              data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        }
        getAvatar();        
      }, []);
    return (
        <>
            <Container>
                <div className='title-container'>
                    <h1>Pick an avatar as your profile picture</h1>
                </div>
                <div className='avatars'>
                    {avatars.map((avatar,index) => {
                        return(
                            <div 
                            key = {index}
                                className={`avatar ${
                                    selectedAvatar === index ? "selected" : ""
                                    }`}
                            >    
                                 <img
                                    src={`data:image/svg+xml;base64,${avatar}`}
                                    alt="avatar"
                                    key={avatar}
                                    onClick={() => setSelectedAvatar(index)}
                                />
                            </div>
                        )
                    })}
                </div>
            <ToastContainer/>
            </Container>
        </>
    )
}

const Container = styled.div`
    height: 100vh;
    wigth: 100vw;
    display:flex;
    flex-direction: column;
    justify-content: center;
    gap: 3rem;
    align-items: center;
    background-color: #131324;

    .loader{
        max-inline-size: 100%;
    }

    .title-container{
        h1{
            color:white;
        }
    }

    .avatars{
        display:flex;
        gap: 2rem;
        .avatar{
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img {
                height: 6rem;

            }
        }
        .selected{
            border: 0.4rem solid #4e0eff;
        }
    }
    

`;