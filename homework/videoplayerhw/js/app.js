const progress = document.querySelector('.progress');
const elapsetime = document.querySelector('.elapse-time'),
        remainingtime = document.querySelector('.remaining-time');

const video = document.querySelector('.vd');

const playicon = document.querySelector('.vdplayicon');

const previousbtn = document.querySelector('.previousbtn'),
        playbtn = document.querySelector('.playbtn'),
        nextbtn = document.querySelector('.nextbtn');

const vdplayicon = document.querySelector('.vdplayicon');


// video (click) => play / paused , update play icon 
// play (click) => play / paused , update play icon
// video (timeupdate) => updateprogress 
// progress (click) =>  setprogress


//Event Listener
video.addEventListener('click',(e)=>{
    togglevideo();
    // updateplayicon();
});

playicon.addEventListener('click',togglevideo);

video.addEventListener('play',updateplayicon);
video.addEventListener('pause',updateplayicon);

playbtn.addEventListener('click',()=>{
    togglevideo();
    // updateplayicon();
});

video.addEventListener('timeupdate',()=>{
    updateprogrerss();
    timeupdate();
});
progress.addEventListener('click',()=>{
    setprogress();
});


function togglevideo(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}
function updateplayicon(){
    
    if(playbtn.firstChild.classList.contains('fa-play')){
        // console.log(playbtn.firstChild);
        playbtn.firstChild.classList.replace('fa-play','fa-pause');
        vdplayicon.style.display = 'none';
    }else{
        playbtn.firstChild.classList.replace('fa-pause','fa-play');
        vdplayicon.style.display = 'flex';
    }
    
}

function updateprogrerss(){
    //current progress based on max progress value
    progress.value = video.currentTime/video.duration * 100;
    // console.log(video.duration);
}
function timeupdate(){
    // elapsetime
    //remainingtime
    let elapsemins = 0,
        elapsesecs = 0;

    elapsemins = Math.floor(video.currentTime/60);
    elapsesecs = Math.floor(video.currentTime%60);

    elapsetime.textContent = `${elapsemins < 10 ? '0'+elapsemins : elapsemins}:${elapsesecs < 10 ? '0'+elapsesecs : elapsesecs}`;

    // console.log(Math.floor(video.currentTime%60));

    let remainingmins = 0,
        remaingsecs = 0;

    remainingmins = Math.floor((video.duration - video.currentTime) / 60);
    remaingsecs = Math.floor(video.duration - video.currentTime) % 60;

    remainingtime.textContent = `${remainingmins < 10 ? '0'+remainingmins : remainingmins}:${remaingsecs < 10 ? '0'+remaingsecs : remaingsecs}`;
}
function setprogress(){
    video.currentTime = (progress.value / 100) * video.duration;
}