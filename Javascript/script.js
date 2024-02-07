// Add tags and Elements

const container = document.querySelector(".container");
musicImg = container.querySelector(".img-area img")
musicName = container.querySelector(".song-details .name")
musicArtist = container.querySelector(".song-details .artist")
mainAudio = container.querySelector("#main-audio");
play_pause_btn = container.querySelector(".play-pause");
prev_btn = container.querySelector("#prev");
next_btn = container.querySelector("#next");
progree_area = container.querySelector(".progress-area");
progress_bar = container.querySelector(".progress-bar");
musicList = container.querySelector(".music-list");
moreMusic_btn = container.querySelector("#more-music");
closeMusic_btn = container.querySelector("#close");



let musicIndex = Math.floor((Math.random() * allmusic.length) + 1);

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingSong();
})

// loadMusic Function
function loadMusic(indexNum) {
    musicName.innerText = allmusic[indexNum - 1].name;
    musicArtist.innerText = allmusic[indexNum - 1].artist;
    musicImg.src = `cover/${allmusic[indexNum - 1].img}.jpg`
    mainAudio.src = `songs/${allmusic[indexNum - 1].src}.mp3`
}






function playMusic() { // playMusic function
    container.classList.add("paused");
    play_pause_btn.querySelector("i").innerText = "pause";
    mainAudio.play();
}
function pauseMusic() { // pausedMusic function
    container.classList.add("paused");
    play_pause_btn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

// play or music button event
play_pause_btn.addEventListener("click", () => {
    const isMusicPaused = container.classList.contains("paused")

    isMusicPaused ? pauseMusic() : playMusic();
})



// nextMusic function
function nextMusic() {
    if (musicIndex > allmusic.length) {
        musicIndex = 1;
    } else {
        musicIndex++; // increment of musicIndex by 1;
    }

    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

// prevMusic Function
function prevMusic() {
    if (musicIndex < 1) {
        musicIndex = allmusic.length;
    } else {
        musicIndex--; //decrement of musicIndex by 1;
    }
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

// next music button event
next_btn.addEventListener("click", () => {
    nextMusic();
})
// prev music button event
prev_btn.addEventListener('click', () => {
    prevMusic();
})





// update progress_bar width according to music current time
mainAudio.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime; //getting playing the song currenttime
    const duration = e.target.duration; //getting playing total song duration

    let progressWidth = (currentTime / duration) * 100;
    progress_bar.style.width = `${progressWidth}%`;




    let musicCurrentTime = container.querySelector(".current-time");
    musicDuration = container.querySelector(".max-duration");
    mainAudio.addEventListener("loadeddata", () => {
        // update song total duration
        let mainAudioDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAudioDuration / 60);
        let totalSec = Math.floor(mainAudioDuration % 60);
        if (totalSec < 10) { //if sec is less than 10 adding 0 before it...
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });



    // updating playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;

});




// update playing song current width onaccording to the progress bar width
progree_area.addEventListener('click', (e) => {
    let progressWidth = progree_area.clientWidth; // getting width of progress bar
    let clickOffSetX = e.offsetX; // getting offset x value
    let songDuration = mainAudio.duration; //getting song total duration

    mainAudio.currentTime = (clickOffSetX / progressWidth) * songDuration;
    playMusic();
});





// change loop, shufle, repeat icon onclick
const repeat_btn = container.querySelector("#repeat-playlist");
repeat_btn.addEventListener("click", () => {
    let getText = repeat_btn.innerText; //getting this tag innerText
    switch (getText) {
        case "repeat":
            repeat_btn.innerText = "repeat_one";
            repeat_btn.setAttribute("title", "song looped");
            break;
        case "repeat_one":
            repeat_btn.innerText = "shuffle";
            repeat_btn.setAttribute("title", "playback shuffled");
            break;
        case "shuffle":
            repeat_btn.innerText = "repeat";
            repeat_btn.setAttribute("title", "playlist looped");
            break;
    }
});





// above we just change icons, now it's time to work on what to do after song ended
mainAudio.addEventListener("ended", () => {
    let getText = repeat_btn.innerText; //getting this tag innerText

    switch (getText) {
        case "repeat":
            nextMusic(); //calling nextMusic() function
            break;
        case "repeat_one":
            mainAudio.currentTime = 0; //setting the audio time to 0
            loadMusic(musicIndex); //calling loadMusic() function with  agrument "musicIndex"
            playMusic(); // calling playMusic() function
            break;
        case "shuffle":
            let randomIndex = Math.floor((Math.random() * allmusic.length) + 1);
            do {
                randomIndex = Math.floor((Math.random() * allmusic.length) + 1);
            } while (musicIndex == randomIndex); //this loop will run until the next randomIndex isn't equal to current music playing....
            musicIndex = randomIndex; // passing randomIndex to musicIndex
            loadMusic(musicIndex);
            playMusic();
            playingSong();
            break;
    }
});





// showing Music playList onclick music icon
moreMusic_btn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});
closeMusic_btn.addEventListener("click", () => {
    moreMusic_btn.click();
})




const ulTag = container.querySelector("ul");
// let's create li tag according to array length for list
for (let i = 0; i < allmusic.length; i++) {
    let liTag =
        `<li li-index="${i + 1}">
        <div class="row">
            <span>${allmusic[i].name}</span>
            <p>${allmusic[i].artist}</p>
        </div>
        <audio class="m-${allmusic[i].src}" src="songs/${allmusic[i].src}.mp3"></audio>
        <span id="m-${allmusic[i].src}" class="audio-duration">1:00</span>
    </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);


    let liaudioDurationTag = ulTag.querySelector(`#m-${allmusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.m-${allmusic[i].src}`);

    liAudioTag.addEventListener("loadeddata", () => {
        let duration = liAudioTag.duration;
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        if (totalSec < 10) { //if sec is less than 10 the add '0' in front
            totalSec = `0${totalSec}`;
        }

        liaudioDurationTag.innerText = `${totalMin}:${totalSec}`;
        // adding t-duration(total-duration) attribute with total duration value
        liaudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
    });
}




// playing particular song form the list on click of li tag

const allLiTags = ulTag.querySelectorAll("li");
function playingSong() {
    for (let j = 0; j < allLiTags.length; j++) {

        let audioTag = allLiTags[j].querySelector(".audio-duration");

        // lets remove playing class from all other li expect the last one which click
        if(allLiTags[j].classList.contains("playing")){
            allLiTags[j].classList.remove("playing");
            // audioTag.innerText = "";
            // lets get that audio duration value and pass to .audio-duration innerText
            let audio_Duration = audioTag.getAttribute("t-duration");
            audioTag.innerText = audio_Duration;
        }

        // if there is an li tag which li index is equal to musicIndex
        // then this music is playing now and we'll style it
        if (allLiTags[j].getAttribute("li-index") == musicIndex) {
            allLiTags[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }


        // adding on click attribute in all li tags
        allLiTags[j].setAttribute("onclick", "clicked(this)")
    }
}


// function
// lets play song on click li
function clicked(element) {
    // getting li index of particular clicked li tag
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex; // passing that li-index to the musicIndex
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}