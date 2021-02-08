import React from 'react';
import '../index.css';
import axios from 'axios';

function NavBar(){

    function login(){
        axios.get('/login')
        .then((res) => {
            window.location.href = res.data;
        })
    }

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
                        <li><button onClick={login} className='bg-emerald-600 rounded-lg px-4 py-2'>Log In</button></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default NavBar;