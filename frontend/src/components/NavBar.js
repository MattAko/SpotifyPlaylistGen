import React, {useEffect, useState} from 'react';
import '../index.css';
import axios from 'axios';

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
        <header className="lg:px-16 px-6 bg-gray-700 text-gray-50 flex flex-wrap items-center lg:py-0 py-2">
            <div className="flex-1 flex justify-between items-center">
                <a href="#">
                    Spotify Playlist Generator
                </a>
            </div>
            <div className="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
                <nav>
                    <ul className="lg:flex items-center justify-between text-base text-gray-50 pt-4 lg:pt-0">
                        <li><a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-gray-400" href="#">GitHub</a></li>
                        <li><a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-gray-400 lg:mb-0 mb-2" href="#">Spotify</a></li>
                    </ul>
                </nav>
            </div>
            <div id='loginButton'>
                <button onClick={login} className='bg-emerald-600 rounded-lg px-4 py-2'>Log In</button>
            </div>
            <div id='profilePicture'>
                <img className='h-10 w-10 rounded-full ' src={userPhoto} alt='User Photo'></img>
            </div>
            <div id='username'>
                <a className='px-4 py-2' href={`https://open.spotify.com/user/${userID}`} target='_blank'>{username}</a>
            </div>
        </header>
    )
}

export default NavBar;