/* =========================
   GET HTML ELEMENTS
========================= */

const audio =
    document.getElementById("audio");

const musicInput =
    document.getElementById("musicInput");

const playlistElement =
    document.getElementById("playlist");

const playPauseButton =
    document.getElementById("playPause");

const previousButton =
    document.getElementById("previous");

const nextButton =
    document.getElementById("next");

const shuffleButton =
    document.getElementById("shuffle");

const repeatButton =
    document.getElementById("repeat");

const progress =
    document.getElementById("progress");

const volume =
    document.getElementById("volume");

const currentTimeElement =
    document.getElementById("currentTime");

const totalTimeElement =
    document.getElementById("totalTime");

const songTitle =
    document.getElementById("songTitle");

const artist =
    document.getElementById("artist");

const songCount =
    document.getElementById("songCount");

const albumArt =
    document.getElementById("albumArt");


/* =========================
   VARIABLES
========================= */

let songs = [];

let currentSongIndex = -1;

let isShuffle = false;

let isRepeat = false;


/* =========================
   FORMAT TIME
========================= */

function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {

        return "0:00";

    }


    const minutes =
        Math.floor(seconds / 60);


    const secondsPart =
        Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");


    return minutes + ":" + secondsPart;

}


/* =========================
   ADD SONGS
========================= */

musicInput.addEventListener(
    "change",
    function() {

        const selectedFiles =
            Array.from(
                musicInput.files
            );


        selectedFiles.forEach(
            function(file) {

                const song = {

                    name: file.name,

                    url:
                        URL.createObjectURL(
                            file
                        )

                };


                songs.push(song);

            }
        );


        displayPlaylist();


        /*
            Automatically load
            first song
        */

        if (
            currentSongIndex === -1 &&
            songs.length > 0
        ) {

            loadSong(0);

        }


        /*
            Reset file input
            so the same file
            can be selected again
        */

        musicInput.value = "";

    }
);


/* =========================
   DISPLAY PLAYLIST
========================= */

function displayPlaylist() {

    songCount.textContent =
        songs.length +
        (songs.length === 1
            ? " song"
            : " songs");


    if (songs.length === 0) {

        playlistElement.innerHTML = `

            <div class="empty">

                No songs added yet.<br>

                Click "+ Add Music"
                to add songs.

            </div>

        `;

        return;

    }


    playlistElement.innerHTML =
        songs.map(
            function(song, index) {

                return `

                    <div
                        class="song ${
                            index === currentSongIndex
                            ? "active"
                            : ""
                        }"
                        data-index="${index}"
                    >

                        <div class="song-number">

                            ${
                                index === currentSongIndex &&
                                !audio.paused
                                ? "♫"
                                : index + 1
                            }

                        </div>


                        <div>

                            <div class="song-name">

                                ${escapeHTML(song.name)}

                            </div>

                            <div class="song-info">

                                Local Audio File

                            </div>

                        </div>


                        <button
                            class="delete-button"
                            data-delete="${index}"
                        >

                            ✕

                        </button>

                    </div>

                `;

            }
        ).join("");

}


/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(text) {

    return text.replace(
        /[&<>"']/g,
        function(character) {

            const map = {

                "&": "&amp;",

                "<": "&lt;",

                ">": "&gt;",

                '"': "&quot;",

                "'": "&#039;"

            };


            return map[character];

        }
    );

}


/* =========================
   LOAD SONG
========================= */

function loadSong(
    index,
    autoPlay = false
) {

    if (!songs[index]) {

        return;

    }


    currentSongIndex = index;


    const song =
        songs[index];


    audio.src =
        song.url;


    /*
        Display song name
    */

    songTitle.textContent =
        song.name.replace(
            /\.[^/.]+$/,
            ""
        );


    artist.textContent =
        "Local audio file";


    albumArt.textContent =
        "🎵";


    /*
        Reset progress
    */

    progress.value = 0;

    currentTimeElement.textContent =
        "0:00";

    totalTimeElement.textContent =
        "0:00";


    displayPlaylist();


    /*
        Play automatically
    */

    if (autoPlay) {

        audio.play();

    }

}


/* =========================
   PLAY / PAUSE
========================= */

function playPause() {

    /*
        No song selected
    */

    if (
        currentSongIndex === -1
    ) {

        if (songs.length > 0) {

            loadSong(
                0,
                true
            );

        }

        return;

    }


    /*
        Play
    */

    if (audio.paused) {

        audio.play();

    }


    /*
        Pause
    */

    else {

        audio.pause();

    }

}


/* =========================
   NEXT SONG
========================= */

function nextSong() {

    if (songs.length === 0) {

        return;

    }


    let nextIndex;


    /*
        Shuffle
    */

    if (
        isShuffle &&
        songs.length > 1
    ) {

        do {

            nextIndex =
                Math.floor(
                    Math.random() *
                    songs.length
                );

        }
        while (
            nextIndex ===
            currentSongIndex
        );

    }


    /*
        Normal order
    */

    else {

        nextIndex =
            (currentSongIndex + 1)
            % songs.length;

    }


    loadSong(
        nextIndex,
        true
    );

}


/* =========================
   PREVIOUS SONG
========================= */

function previousSong() {

    if (songs.length === 0) {

        return;

    }


    /*
        Restart current song
        if already played > 3 sec
    */

    if (
        audio.currentTime > 3
    ) {

        audio.currentTime = 0;

        return;

    }


    const previousIndex =
        (
            currentSongIndex -
            1 +
            songs.length
        )
        %
        songs.length;


    loadSong(
        previousIndex,
        true
    );

}


/* =========================
   PLAY BUTTON EVENT
========================= */

playPauseButton.addEventListener(
    "click",
    playPause
);


/* =========================
   NEXT BUTTON
========================= */

nextButton.addEventListener(
    "click",
    nextSong
);


/* =========================
   PREVIOUS BUTTON
========================= */

previousButton.addEventListener(
    "click",
    previousSong
);


/* =========================
   SHUFFLE
========================= */

shuffleButton.addEventListener(
    "click",
    function() {

        isShuffle =
            !isShuffle;


        shuffleButton.classList.toggle(
            "active",
            isShuffle
        );

    }
);


/* =========================
   REPEAT
========================= */

repeatButton.addEventListener(
    "click",
    function() {

        isRepeat =
            !isRepeat;


        repeatButton.classList.toggle(
            "active",
            isRepeat
        );

    }
);


/* =========================
   AUDIO PLAY
========================= */

audio.addEventListener(
    "play",
    function() {

        playPauseButton.textContent =
            "⏸";

        displayPlaylist();

    }
);


/* =========================
   AUDIO PAUSE
========================= */

audio.addEventListener(
    "pause",
    function() {

        playPauseButton.textContent =
            "▶";

        displayPlaylist();

    }
);


/* =========================
   AUDIO METADATA
========================= */

audio.addEventListener(
    "loadedmetadata",
    function() {

        totalTimeElement.textContent =
            formatTime(
                audio.duration
            );

    }
);


/* =========================
   UPDATE PROGRESS
========================= */

audio.addEventListener(
    "timeupdate",
    function() {

        currentTimeElement.textContent =
            formatTime(
                audio.currentTime
            );


        if (audio.duration) {

            progress.value =
                (
                    audio.currentTime /
                    audio.duration
                ) * 100;

        }

    }
);


/* =========================
   PROGRESS BAR
========================= */

progress.addEventListener(
    "input",
    function() {

        if (audio.duration) {

            audio.currentTime =
                (
                    progress.value /
                    100
                )
                *
                audio.duration;

        }

    }
);


/* =========================
   VOLUME
========================= */

volume.addEventListener(
    "input",
    function() {

        audio.volume =
            volume.value;

    }
);


/* Default volume */

audio.volume = 0.8;


/* =========================
   SONG FINISHED
========================= */

audio.addEventListener(
    "ended",
    function() {

        /*
            Repeat current song
        */

        if (isRepeat) {

            audio.currentTime = 0;

            audio.play();

        }


        /*
            Otherwise play next
        */

        else {

            nextSong();

        }

    }
);


/* =========================
   PLAYLIST CLICK
========================= */

playlistElement.addEventListener(
    "click",
    function(event) {

        /*
            Delete song
        */

        const deleteButton =
            event.target.closest(
                "[data-delete]"
            );


        if (deleteButton) {

            const index =
                Number(
                    deleteButton
                        .dataset
                        .delete
                );


            /*
                Release browser URL
            */

            URL.revokeObjectURL(
                songs[index].url
            );


            songs.splice(
                index,
                1
            );


            /*
                If current song
            */

            if (
                index ===
                currentSongIndex
            ) {

                audio.pause();

                audio.src = "";

                currentSongIndex = -1;


                songTitle.textContent =
                    "No song selected";


                artist.textContent =
                    "Add a song to start playing";


                albumArt.textContent =
                    "🎵";

            }


            /*
                Adjust index
            */

            else if (
                index <
                currentSongIndex
            ) {

                currentSongIndex--;

            }


            displayPlaylist();

            return;

        }


        /*
            Select song
        */

        const song =
            event.target.closest(
                ".song"
            );


        if (song) {

            const index =
                Number(
                    song.dataset.index
                );


            loadSong(
                index,
                true
            );

        }

    }
);


/* =========================
   INITIAL DISPLAY
========================= */

displayPlaylist();