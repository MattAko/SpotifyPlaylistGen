import logo from './logo.svg';
import './index.css';
import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const [error, setError] = useState('');

  // Check if the input URL matches YouTube playlist URL
  function validURL(event){
    event.preventDefault();
    const input = document.getElementById('inputURL').value;
    console.log(input.slice(0,39));
    if(input.slice(0,38) === 'https://www.youtube.com/playlist?list='){
      document.getElementById('alert').classList = 'hidden';
      getPlaylistInfo(input);
    }
    else{
      setError('Please input a valid YouTube playlist URL.');
      document.getElementById('alert').classList = 'italic text-red-600 block';
    }
  }

  function getPlaylistInfo(URL){
    axios.post('/youtubeplaylist', {
      url: URL
    })
    .then(() => {
      console.log('Post was successful');
    })
    .catch((error) => {
      console.log('There was an error');
    })
  }


  return (
    <div className='py-10 bg-gray-800 h-screen text-center'>
      <form onSubmit={validURL} className='flex justify-center'>
        <input id='inputURL' className='w-3/5 max-w-screen-sm px-3 py-2 bg-gray-700 border-b-2 rounded text-gray-50 outline-none' type='text' placeholder='Paste YouTube playlist URL here.'></input>
      </form>
      <div id='alert' className='hidden'>{error}</div>
    </div>
  );
}

export default App;
