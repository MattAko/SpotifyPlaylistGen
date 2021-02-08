var express = require('express');
var bodyParser = require('body-parser');
var Buffer = require('buffer/').Buffer;
var axios = require('axios');
var jsonParser = bodyParser.json();
var app = express();
var cors = require('cors');

var secrets = require('./secrets.json');
var my_client_id = secrets.my_client_id;
var my_client_secret = secrets.my_client_secret;

var port = 5000;

app.listen(port, () => {
    console.log('Listening to port ' + port);
})

/*
    Scope Requirements:
        Create a Playlist: playlist-modify-private, playlist-modify-public
*/
app.get('/login', function(req, res) {
    var scopes = 'playlist-modify-public playlist-modify-private';
    var redirect_uri = 'http://localhost:5000/callback/';
    res.send('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + my_client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(redirect_uri));
});
    
/*
    @desc: Callback route after user login
    Retrieve user access token and refresh tokens
    Then, retrieve user info and return it to user
*/
app.get('/callback', jsonParser, (req, res) => {
    if(req.query.code === 'undefined'){
        res.send('wtf man LET ME IN');
    }
    console.log('Login successful, user code is: ' + req.query.code)
    

    var secret = `${my_client_id}:${my_client_secret}`;
    var headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    var params = new URLSearchParams()
    params.append('grant_type', 'authorization_code');
    params.append('code', req.query.code);
    params.append('redirect_uri', 'http://localhost:5000/callback/');
    params.append('client_id', my_client_id);
    params.append('client_secret', my_client_secret);

    var config = {
        headers
    }
    axios.post('https://accounts.spotify.com/api/token', params, config)
        .then((response) => {
            var access_token = response.data.access_token;
            axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            .then((response) => {
                console.log('Get user ID successful...');
                console.log(response.data.images[0].url);
                res
                    .cookie('id', response.data.id)
                    .cookie('name', response.data.display_name)
                    .cookie('photo_url', response.data.images[0].url)
                    .redirect('http://localhost:3000');
            })
            .catch((error) => {
                console.log('There was an error getting the user ID');
                console.log(error);
            })
        })
        .catch((error) => {
            console.log('There was an error with retrieving access codes');
        })
})

/*
    @desc: Retrieve user ID 
    @return: string for user ID or failed response
    Endpoint documentation: https://developer.spotify.com/documentation/web-api/reference/#category-users-profile
*/
// function getUserID(access_token){
//     axios.get('https://api.spotify.com/v1/me', {
//         headers: {
//             Authorization: `Bearer ${access_token}`
//         }
//     })
//     .then((response) => {
//         console.log('Get user ID successful...');
//         console.log(response)
//         return response.data.id
//     })
//     .catch((error) => {
//         console.log('There was an error getting the user ID');
//         console.log(error);
//         return 'failed'
//     })
// }

app.post('/youtubeplaylist', jsonParser, (req, res) => {
    var url = req.body.url;
    
})