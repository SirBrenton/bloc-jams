// Example Album

/**
* Variable(s) albumPicasso & albumMarconi are defined as objects via their {.
* Value pairs are created by "name and value (in this case a string)" separated by a colon (i.e. title: 'The Colors').
**/

var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',

/**
* @Junior: Don't know if this is the correct terminology, but it seems like the "[ (bracket)" after song: creates a "nested" object?
* Regardless, it allow the ojbect to reference additional information (title, duration) as values of "songs: within the albumPicasso object".
**/

     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };

 // Another Example Album object

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

// Variable createSongRow defines a function that takes 3 agrguments: songNumber, songName, songLength.

 var createSongRow = function(songNumber, songName, songLength) {

// The variable template is defined by the contents of a table <tr> and the table's standard cells <td>.

     var template =

// The table album-view-song-item is styled via the .class selector defined on rows 45-49 of styles/album.css.

        '<tr class="album-view-song-item">'

/**
* The 1st argument in the createSongRow fucntion is songNumber and it's value populates the album-view-song-item table's standard cells via the <td>.
* song-item-number is styled via the .class selector defined on rows 51-54 of styles/album.css.
*
* We need a way to store the song-item-number so that the play button reverts back to the song's number when the user no longer hovers over the track number.
* HTML5 data attributes allow us to store information in an attribute on an HTML element.
* We've added an attribute called data-song-number to the template we generate using the createSongRow() function.
*
* When I inspect data-song-number="' + songNumber + '">' + songNumber + '</td>'  via developer tools I notice that...
* A. we are somehow giving the track a number (how does it know to start at 1)
* B. displaying it
* C. increasing it from the last track
*
* @Junior: I don't understand how???
*
**/

      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'

/**
* The 2nd argument in the createSongRow function is songName and it's value populates the album-view-song-item table's standard cells via the <td>.
* song-item-title is styled via the .class selector defined on rows 56-58 of styles/album.css.
**/

      + '  <td class="song-item-title">' + songName + '</td>'

/**
* The 3nd argument in the createSongRow function is songLength and it's value populates the album-view-song-item table's standard cells via the <td>.
* song-item-duration is styled via the .class selector defined on rows 60-62 of styles/album.css.
**/

      + '  <td class="song-item-duration">' + songLength + '</td>'

// The album-view-song-item table is closed via the </tr>.

      + '</tr>'
      ;

//The createSongRow function is called via return template; (@Junior: I tried to console.log this but I wasn't able to).

     return template;
 };

/**
* We need a way for the user to engage with dynaic "album" content as soon as they navigate to an album via the collection page.
* We accomplish that with a function called setCurrentAlbum.
* setCurrentAlbum has 1 argument which is album.
**/

 var setCurrentAlbum = function(album) {

/**
* We need a way to display all the HTML elements no matter which album is selected by the user.
* We accomplish this by creating variables and utilizing the document.getElementsByClassName() and getting all the elements that have the specified class name.
* For example... album-view-title populates the variable albumTitle with the name of the specified album (albumPicasso object) 'The Colors'.
* We also need to "assign the corresponding values of the album objects' properties" to the HTML elements via the [0];
*
* We duplicate this process by creating variable for all the HTML elements via document.getElementsByClassName ('their unique class selectors') & [index];
*
* Talk to @Junior and make sure you understand this COMPLETELY...
*
**/

    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

/**
* We want to be able to be able to display the contents of the albumTitle varable.
* We give a nodeValue of album.title to the firstChild of the albumTitle variable.
**/

    albumTitle.firstChild.nodeValue = album.title;

// We also give a nodeValue of album.artist to the firstChild of the albumArtist variable.

    albumArtist.firstChild.nodeValue = album.artist;

/**
* In this case we're combing two values which are defined within the nodeValue by calling the "album" agrgument.
* The "album" aregument was set in the setCurrentAlbum function.  We then attach it to .year and .lable (e.g. album.year + ' ' + album.label).
* We've also created a string and correctly spaced the string via the  + ' ' + separating the album.year & album.label nodeValue (s).
**/

    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;

/**
* Lastly we specifying the name of the attribute whose value is to be set (.setAttribute).
* We tell the program where to find the albumImage via the ('src', album.albumArtUrl);
* In the case of var albumPicasso, the albumArtUrl is found via the file path: 'assets/images/album_covers/01.png'.
**/

    albumImage.setAttribute('src', album.albumArtUrl);

/**
* @Junior: Don't totally understand what's going on here—the description in Checkpoint11 instructions says:
*
* "When we populated the Collection view with albums, we initially set the value of the parent container's innerHTML to an empty string.
* This ensured that we were working with a clean slate.
*
* We do the same here, and clear the album song list HTML to make sure there are no interfering elements.
**/

    albumSongList.innerHTML = '';

/**
* We need a way to go through all the songs in any album and display the content to the user.
* We accomplish this via a for loop.
* First we set the var i to 0.
* While i is less than album (setCurrentAlbum function) songs (as defined by the reference additional information within to specified object') length.
* Continue "looping" (i++).
*
* albumSongList???
*
* This is the 3rd instnce of that element. The first was when we defined it as a variable in the setCurrentAlbum function.
*
* The second is when albumSongList is "attched" to .innerHTML and = and empty string (albumSongList.innerHTML = '';)
*
* createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);???  Talk to Junior about this.... @Junior: Don't totally know whats going on here.
**/

    for (var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    }
};

/**
* Leaned a lot on Checkpoint12 explanation for this part. Of all the commenting exercise, this is the leaste familiar.
* We're using event bubbling to listen for an event on the parent element.
* "The target parent element is the table with the class .album-view-song-list".
* We've created a variable songListContainer which stores the selected table album-view-song-list...
*
* @Junior: how is this listener on line 197 which uses album-view-song-list different than the listener on 125?
*
* What I am imagining is var i = 0, and var x = 0, and var y = 0, all used in different places...  That is what I isee with var songListContainer, songRows, albumSongList all utilizing the same listener.
**/

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

/**
* Variable playButtonTemplate is a little confusing. I see where we link to Ionicons via: the <script> in the head of album.html.
* @Junior: I don't understand the cnonection between span class="ion-play"></span> and the aforementioned script.
* album-song-button is styled via the .class selector defined on rows 64-83 of styles/album.css.
**/

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

// Create a function that displays albumPicasso (or any other predetermined album) upon the loading of the album page.

window.onload = function() {
    setCurrentAlbum(albumPicasso);

/**
* The songListContainer variable was previously assined the contents of the album-view-song-list @ [0] index.
* We've added an event listerner to songListContainer.
* @Junior: a little fuzzy on whats happening here...  The 'mouseover' is the listenr? function(event)?  Is that somehow creating a new function with event at it's argument?
**/

    songListContainer.addEventListener('mouseover', function(event) {

/**
* We are triggering playButtonTemplate with an if statement.
* event (the argument from the function above)?
* @Junior: .target? There is no explanation for in the Checkpoint12 curriculum. The only places .target is used is in this if statement.
**/

    if (event.target.parentElement.className === 'album-view-song-item') {

// Not a lot of clarity on this...

      event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;

  }
         });

//@Junior: Pretty much fried my brain on lines 219-241.

    for (var i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {
            // Selects first child element, which is the song-item-number element
            this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
        });
    }

};
