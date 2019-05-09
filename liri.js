
require("dotenv").config();
var axios = require('axios')
const fs = require('fs')
const keys = require("./keys.js");

var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify)

let omdb = (keys.omdb)

let term = process.argv[2]
let item = process.argv.slice(3).join(' ')

//Switch case 
function commands(term, item) {
    switch (term) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this-song":
            spotifySong();
            break;
        case "movie-this":
            movieSearch();
            break;
        case "do-what-it-says":
            doThis(item);
            break;
        default:
            console.log("Error");
            break;
    }

}

commands(term, item);
/*
function concertThis() {
    var part1 = "https://rest.bandsintown.com/artists/"
    var part2 = "/events?app_id=codingbootcamp"
    var URL = part1 + item + part2
    axios.get(URL).then(function (response, error) {
    if (!error && response.statusCode === 200)
    var jsonData = response.data

    console.log('Venue: ' + jsonData.url,)
    })
};
*/
function spotifySong(){
    if (!term) {
        term = "the sign ace of base"
    }
spotify.search({ type: 'track', query: item }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    for (var j = 0; j < data.tracks.items[0].album.artists.length; j++) {
        console.log("Artist(s): " + data.tracks.items[0].album.artists[j].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Song Link: " + data.tracks.items[0].external_urls.spotify);
        console.log("Album: " + data.tracks.items[0].album.name);
/*
        let spotifyArr = data.tracks.items;

        for (i = 0; i < spotifyArr.length; i++) {
            console.log(`\nBA DA BOP!  That's for you...\n\nArtist: ${data.tracks.items[i].album.artists[0].name} 
            \nSong: ${data.tracks.items[i].name}
            \nAlbum: ${data.tracks.items[i].album.name}
            \nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n\n - - - - -`)
   */
  console.log(data); 
  }
});

function movieSearch(){
    axios.get("http://www.omdbapi.com/?t=" + item + "&apikey=trilogy")
    .then(function(response) {
        console.log(`Movie title: ${response.data.title}`);
    })
}

  


    /*
    var showData = [
        'Venue: ' + jsonData.venue.name,
        'Venue Location: ' + jsonData.venue.city,
        'Date: ' + jsonData.datetime
        ].join('\n\n')

        // MOMENT.JS TO FORMAT THE DATE MM/DD/YYYY
        let concertDate = moment(userBand[i].datetime).format("MM/DD/YYYY hh:00 A");
        console.log(`Date and Time: ${concertDate}\n\n- - - - -`);
    };
} else {
    console.log('Band or concert not found!');
};
    };
});
};
*/

// Then run a request with axios to the OMDB API with the movie specified
/* axios.get('http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=trilogy')
    .then(function (response) {
        console.log(`The movie's rating is: ${response.data.imdbRating}`)
    })
*/
/*
// "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`
*/

}