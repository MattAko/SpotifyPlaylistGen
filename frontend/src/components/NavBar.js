import React, {useEffect, useState} from 'react';
import '../index.css';
import axios from 'axios';
import '../fonts.css';

function NavBar(){
    const [userID, setUserID] = useState('');
    const [userPhoto, setUserPhoto] = useState('');
    const [username, setUsername] = useState('');

    function login(){
        axios.get('/login')
        .then((res) => {
            window.location.href = res.data;
        })
    }

    // Load user information from cookies
    useEffect(() => {
        const getCookieValue = (name) => (
            document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
        )
        if(getCookieValue('id') !== ''){
            setUserID(getCookieValue('id'))
        }
        if(getCookieValue('name') !== ''){
            setUsername(decodeURIComponent(getCookieValue('name')));
        }
        if(getCookieValue('photo_url') !== ''){
            setUserPhoto(decodeURIComponent(getCookieValue('photo_url')));
            document.getElementById('loginButton').classList += 'hidden';
        }
        else{
            document.getElementById('profilePicture').classList += 'hidden';
            document.getElementById('username').classList += 'hidden';
        }
    }, []);

    return(
        <header className="Lato lg:px-32 px-6 bg-gray-800 text-gray-50 flex items-center lg:py-3 py-2">
            <div className="flex-1 text-xl flex items-center ">
                <a className='lg:p-4 text-emerald-600' href="#">
                    Spotify Playlist Generator
                </a>
                <div className='h-14 w-0.5 bg-gray-50'>

                </div>
                <a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-emerald-600" href="https://github.com/MattAko/SpotifyPlaylistGen" target='_blank' rel='noreferrer'>GitHub</a>
            </div>
            <div id='loginButton'>
                <button onClick={login} className='bg-emerald-600 rounded-lg px-4 py-2'>Log In</button>
            </div>
            <div id='profilePicture'>
                <img className='h-10 w-10 rounded-full mx-4' src={userPhoto} alt='ProfilePic'></img>
            </div>
            <div id='username'>
                <a className='py-2 border-b-2 border-transparent hover:border-emerald-600' href={`https://open.spotify.com/user/${userID}`} target='_blank' rel='noreferrer'>{username}</a>
            </div>
            
        </header>
    )
}

export default NavBar;