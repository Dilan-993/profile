document.addEventListener("DOMContentLoaded", () => {

    const playlist = [

        {
            title: "Crystal",
            file: "assets/audio/Crystal.mp3"
        },

        {
            title: "Dying Campfire",
            file: "assets/audio/Dying Campfire.mp3"
        },

        {
            title: "Tutaime",
            file: "assets/audio/Tutaime.mp3"
        }

    ];



    const audio = new Audio();


    let currentTrack = Number(
        localStorage.getItem("currentTrack")
    ) || 0;


    const savedVolume =
        localStorage.getItem("volume");


    audio.volume = savedVolume
        ? Number(savedVolume)
        : 0.5;


    const terminalPlayer =
        document.getElementById("terminalPlayer");


    const togglePlayer =
        document.getElementById("togglePlayer");


    const terminalArrow =
        document.getElementById("terminalArrow");


    const playButton =
        document.getElementById("playPause");


    const previousButton =
        document.getElementById("prevTrack");


    const nextButton =
        document.getElementById("nextTrack");


    const volumeSlider =
        document.getElementById("volumeSlider");


    const trackTitle =
        document.getElementById("trackTitle");


    const playerStatus =
        document.getElementById("playerStatus");


    function loadTrack(index) {


        if (!playlist[index]) {

            return;

        }


        currentTrack = index;


        audio.src = playlist[currentTrack].file;


        trackTitle.textContent =
            playlist[currentTrack].title;


        localStorage.setItem(
            "currentTrack",
            currentTrack
        );


    }


    function playTrack() {


        audio.play()
            .then(() => {


                updatePlayingState(true);


            })
            .catch(error => {


                console.log(
                    "Playback error:",
                    error
                );


            });


    }


    function pauseTrack() {


        audio.pause();


        updatePlayingState(false);


    }


    function togglePlayback() {


        if (audio.paused) {


            playTrack();


        } else {


            pauseTrack();


        }


    }


    function nextTrack() {


        currentTrack++;


        if (currentTrack >= playlist.length) {

            currentTrack = 0;

        }


        loadTrack(currentTrack);


        playTrack();


    }


    function previousTrack() {


        currentTrack--;


        if (currentTrack < 0) {

            currentTrack =
                playlist.length - 1;

        }


        loadTrack(currentTrack);


        playTrack();


    }


    function updatePlayingState(isPlaying) {


        const icon =
            playButton.querySelector("i");


        const status =
            isPlaying
                ? "playing"
                : "paused";


        playerStatus.textContent =
            status;


        terminalPlayer.classList.toggle(
            "playing",
            isPlaying
        );


        if (isPlaying) {


            icon.classList.remove(
                "fa-play"
            );


            icon.classList.add(
                "fa-pause"
            );


        } else {


            icon.classList.remove(
                "fa-pause"
            );


            icon.classList.add(
                "fa-play"
            );


        }


    }


    function saveVolume(value) {


        audio.volume =
            Number(value);


        localStorage.setItem(
            "volume",
            value
        );


    }


    function restoreState() {


        volumeSlider.value =
            audio.volume;


        loadTrack(currentTrack);


    }


    togglePlayer.addEventListener(
        "click",
        () => {


            terminalPlayer.classList.toggle(
                "collapsed"
            );


        }
    );


    playButton.addEventListener(
        "click",
        togglePlayback
    );


    nextButton.addEventListener(
        "click",
        nextTrack
    );


    previousButton.addEventListener(
        "click",
        previousTrack
    );


    volumeSlider.addEventListener(
        "input",
        (event) => {


            saveVolume(
                event.target.value
            );


        }
    );


    audio.addEventListener(
        "ended",
        nextTrack
    );


    restoreState();


});