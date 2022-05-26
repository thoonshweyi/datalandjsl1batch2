//UI
const video = document.getElementById('video');

const play = document.getElementById('play'),
      stop = document.getElementById('stop'),
      progress =document.getElementById('progress'),
      timestamp = document.getElementById('timestamp');

//Event Listener
video.addEventListener('click',togglevideostatus);
video.addEventListener('play',updateplayicon);
video.addEventListener('pause',updateplayicon);
video.addEventListener('timeupdate',updateprogress);

play.addEventListener('click',togglevideostatus);
stop.addEventListener('click',stopvideo);

progress.addEventListener('click',setvideoprogress);

//Play & Pause Video
function togglevideostatus(){
    //paused from video api                                                 
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}

//Update Play & Pause Icon
function updateplayicon(){
    if(video.paused){
        play.innerHTML = `<i class='fas fa-play fa-2x'></i>`;
    }else{
        play.innerHTML= `<i class='fas fa-pause fa-2x'></i>`;
    }
}

//Update Progress & Timestamp
function updateprogress(){
    // console.log(video.currentTime);
    // console.log(video.duration);

    progress.value = (video.currentTime / video.duration) * 100;

    // Get minutes
    let mins= Math.floor(video.currentTime/60);
    if(mins < 10){
        // mins = '0'+mins;
        mins = 0+String(mins);
    }
    // console.log(mins)

    let secs = Math.floor(video.currentTime % 60);
    if(secs < 10){
        secs = 0+String(secs);
    }

    timestamp.textContent = `${mins}:${secs}`;
}

//Stop Video
function stopvideo(){
    video.currentTime = 0;
    video.pause();
}

//Set Video Time to progress
function setvideoprogress(){
    video.currentTime = (progress.value * video.duration) / 100;
    // video.currentTime = (progress.value / 100) * video.duration;
}