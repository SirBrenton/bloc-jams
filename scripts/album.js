// Example Album
var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };

 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

/**
* Create a third album object in album.js.
* Populate the object with the same properties as the other two album objects,
* but provide values of your choosing.
**/

 var albumKlegseth = {
     title: 'Long Way Home',
     artist: 'Junior Lee Klegseth',
     label: 'Universal Music Group',
     year: '2007',
     albumArtUrl: 'assets/images/klegseth.jpg',
     songs: [
         { title: 'Crazy Things', duration: '3:37' },
         { title: '66 Chevelle', duration: '4:39' },
         { title: 'Dance', duration: '4:16'},
         { title: 'Long Way Home', duration: '5:35' },
         { title: 'I Want What\'s Coming To Me', duration: '4:42'}
     ]
 };

  var createSongRow = function(songNumber, songName, songLength) {
      var template =
         '<tr class="album-view-song-item">'
       + '  <td class="song-item-number">' + songNumber + '</td>'
       + '  <td class="song-item-title">' + songName + '</td>'
       + '  <td class="song-item-duration">' + songLength + '</td>'
       + '</tr>'
       ;

      return template;
  };

      var albumTitle = document.getElementsByClassName('album-view-title')[0];
      var albumArtist = document.getElementsByClassName('album-view-artist')[0];
      var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
      var albumImage = document.getElementsByClassName('album-cover-art')[0];
      var albumSongList = document.getElementsByClassName('album-view-song-list')[0];


  var setCurrentAlbum = function(album) {
      // #1
      // #2
      albumTitle.firstChild.nodeValue = album.title;
      albumArtist.firstChild.nodeValue = album.artist;
      albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
      albumImage.setAttribute('src', album.albumArtUrl);

      // #3
      albumSongList.innerHTML = '';

      // #4
      for (var i = 0; i < album.songs.length; i++) {
          albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
      }
  };

/**
* Add an event listener to the album cover.
* When a user clicks it, the album page content should toggle between the three album objects:
* albumPicasso, albumMarconi, and your album object.
**/

window.onload = function() {
// Set current album to Jounior's for fun. lol!
    setCurrentAlbum(albumKlegseth);
// Create an array to hold all the album names and give function something to index.
    var albums = [albumPicasso, albumMarconi, albumKlegseth];
// Set the index to 1 because we needed to change the initialzation of the index—the video's words not mine.
    var index = 1;
/**
* Pull in albumImage and attach it to .addEventListener on "click" (which is one of the many Mouse Events).
* Required a function to run when the event occurs.
**/
    albumImage.addEventListener("click", function(event) {
//The function calls setCurrentAlbum and access them via the albums array
    setCurrentAlbum(albums[index]);
// Cycle through index, increasing by one.
    index++;
// create If statement that takes user back to setCurrentAlbum
    if (index == albums.length) {
       index = 0;
    }
  });
};
