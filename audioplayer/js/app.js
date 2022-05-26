//UI
const musiccontainer = document.getElementById("music-container");

const title = document.getElementById("title"),
    progresscontainer = document.getElementById("progress-container"),
    progress = document.getElementById("progress");

const audio = document.getElementById("audio");

const cover = document.getElementById("cover");

const prebtn = document.getElementById("prev"),
    playbtn = document.getElementById("play"),
    nextbtn = document.getElementById("next");

//Song Title
let songindex = 0;
const songs = ['sample1','sample2','sample3'];
// console.log(songs[soundindex]);

loadsong(songs[songindex]);
function loadsong(music){
    // console.log('hay');
    title.innerText = music;
    audio.src = `music/${music}.mp3`;
    cover.src = `img/${music}.jpg`;
}

//Play Song

playbtn.addEventListener('click',()=>{
    // console.log('hay');
    // musiccontainer.classList.add('play');
    const isplaying = musiccontainer.classList.contains('play');
    if(isplaying){
        pausesong();
    }else{
        playsong();
    }
});

function playsong(){
    musiccontainer.classList.add('play');

    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}
function pausesong(){
    musiccontainer.classList.remove('play');
    playbtn.querySelector('i.fas').classList.remove('fa-pause');
    playbtn.querySelector('i.fas').classList.add('fa-play');
    
    audio.pause();
}
//Change Song
prebtn.addEventListener('click',previousSong);
nextbtn.addEventListener('click',nextSong);
//Previous Song
function previousSong(){
    // console.log('hay');
    songindex--;
    if(songindex < 0){
        songindex = songs.length-1;
    }
    loadsong(songs[songindex]);
    playsong();
    // console.log(songindex);
}
//Next Song
function nextSong(){
    // console.log('hay');
    songindex++;
    // console.log(songindex);
    if(songindex > songs.length-1){
        songindex = 0;
    }
    loadsong(songs[songindex]);
    playsong();
}

//Time Play and Stop Update
                        //timeupdate = time changing in audio
audio.addEventListener('timeupdate',updateProgress)

//Update Progress Bar
function updateProgress(e){
    // console.log(audio.currentTime);
    // console.log(audio.duration);


    //Method 1
    // const progresspercent = (audio.currentTime / audio.duration) * 100;
    // console.log(progresspercent);
    // progress.style.width = `${progresspercent}%`;

    // Event Call
    //this keyword work only in regular function and does't work in arrow function
    // console.log(this)
    // console.log(e.target);
    // console.log(e.srcElement)

    //Meghod 2
    // const currentTime = e.target.currentTime;
    // const duration = e.target.duration;
    // const progresspercent = (currentTime / duration)* 100;
    // progress.style.width = `${progresspercent}%`;

    //Meghod 3
    // const{currentTime} = e.target;
    // const {duration} = e.target;
    // const progresspercent = (currentTime / duration)* 100;
    // progress.style.width = `${progresspercent}%`;


    //Meghod 4
    const {currentTime,duration} = e.target;
    const progresspercent = (currentTime / duration)* 100;
    progress.style.width = `${progresspercent}%`;
}

//Click On Progress Bar
progresscontainer.addEventListener('click',setProgress);
function setProgress(e){
    // console.log('hay');

    //getting element width
    const width = e.target.clientWidth;
    // console.log(width);

    // getting click position x
    const clickx = e.offsetX;
//     console.log(clickx);

    const duration = audio.duration;

    //overwirte audio currentTime
    audio.currentTime = ( clickx / width) * duration;
}

//Song End
audio.addEventListener('ended',nextSong);