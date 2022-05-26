const listbtn = document.querySelector('.listbtn');
const songlistcontainer = document.querySelector('.songlistcontainer');
const backbtn = document.querySelector('.backbtn');



const playbtn = document.querySelector('.playbtn'),
        previousbtn = document.querySelector('.previousbtn'),
        nextbtn = document.querySelector('.nextbtn');

const progressbar = document.querySelector('.progressbar'),
        progress = document.querySelector('.progress'),
        currentpoint = document.querySelector('.currentpoint');

const elapsedtimeel = document.querySelector('.elapsedtime'),
        remainingtimeel = document.querySelector('.remainingtime');
        

const songlist = document.querySelector('.songlist');

const songimagesjs = [];

listbtn.addEventListener('click',()=>songlistcontainer.classList.add('show'));
backbtn.addEventListener('click',()=>songlistcontainer.classList.remove('show'));


const songarr = [
    {
        image : './img/song1.jpg',
        audio : './audio/background-fashion-sport-party-hiphop_by_watermello_preview.mp3',
        name : 'Fashion Party',
        vocalist : 'Watermello',
    },
    {
        image : './img/song2.jpg',
        audio : './audio/dream-sonata-inspiring-piano_by_pinkzebra_preview.mp3',
        name : 'Dream Sonata',
        vocalist : 'Pinkzebra',
    },
    {
        image : './img/song3.jpg',
        audio : './audio/uplifting-inspiring-upbeat-pop_by_bluefoxmusic_preview.mp3',
        name : 'Uplifting',
        vocalist : 'Bluefoxmusic',
    },
    {
        image : './img/song4.jpg',
        audio : './audio/stylish_by_glowcity_preview.mp3',
        name : 'Stylish',
        vocalist : 'Glowcity',
    },
    {
        image : './img/song5.jpg',
        audio : './audio/energetic-upbeat-pop_by_stocksounds_preview.mp3',
        name : 'Energetic',
        vocalist : 'Stocksounds',
    },
    {
        image : './img/song6.jpg',
        audio : './audio/becoming_by_bluegestalt_preview.mp3',
        name : 'Becoming',
        vocalist : 'Bluegestalt',
    }
]

let songindex = 0;


function fillsonglist(song,idx){
    const li = document.createElement('li');
    li.classList.add('songlist-item');

    li.innerHTML = `
<div>
    <div class="imgcontainer">
        <img src="${song.image}" alt="song" class="songimg"/>
    </div>
    <div class="songinfo">
        <h4 class="songname">${song.name}</h4>
        <small class="vocalist">by ${song.vocalist}</small>
    </div>
</div>
<a href="#"><i class="fas fa-ellipsis-v"></i></a>
    `;
    songlist.appendChild(li);


    // Event Listener
    const songimage = li.querySelector('.imgcontainer');
    songimage.addEventListener('click',()=>{
        // for play pause using songimage
        if(songimage.classList.contains('play')){
            pausesong();
        }else{
            songindex = idx;
            loadsong(songindex);
            playsong();
        }
    });

    //push songimage which is added by js to songimages array.
    songimagesjs.push(songimage);
}

songarr.forEach((song,idx)=>{
    fillsonglist(song,idx);
});

const audio = document.getElementById('audio'),
        currentsongimg = document.getElementById('currentsongimg'),
        currentsongname = document.getElementById('currentsongname'),
        currentsongvocalist = document.getElementById('currentsongvocalist');

function loadsong(idx){
    audio.src = songarr[idx].audio;
    // console.log(audio.src);
    currentsongimg.src = songarr[idx].image;
    currentsongname.textContent = songarr[idx].name;
    currentsongvocalist.textContent = `by ${songarr[idx].vocalist}`;
}
loadsong(songindex);



function togglesong(){
    if(playbtn.firstElementChild.classList.contains('fa-play')){
        playsong();
    }else{
        pausesong();
    }
}

function playsong(){
    playbtn.firstElementChild.classList.remove('fa-play');
    playbtn.firstElementChild.classList.add('fa-pause');

    // for play icon live change in songlists
    removpreplay();
    songimagesjs[songindex].classList.add('play');

    audio.play();
}

function pausesong(){
    playbtn.firstElementChild.classList.remove('fa-pause');
    playbtn.firstElementChild.classList.add('fa-play');

    // for play icon live change in songlists
    songimagesjs[songindex].classList.remove('play');

    audio.pause(); 
}

function updateprogress(){
    let currentpercentage = audio.currentTime/audio.duration * 100;
    progressbar.style.width = `${currentpercentage}%`;
    currentpoint.style.left = `${currentpercentage}%`;
    // console.log(currentpercentage);
}

function setprogress(e){
    if(e.target.classList.contains('progress') || e.target.classList.contains('progressbar')){
        // let width = e.target.clientWidth;
        // let clickpoint = e.offsetX;
        let width = progress.clientWidth;
        let clickpoint = e.offsetX;
        // console.log(clickpoint);

        audio.currentTime = clickpoint/width * audio.duration;
    }
}

function removpreplay(){
    const songimages = document.querySelectorAll('.imgcontainer');
    songimages.forEach((songimage)=>{
        songimage.classList.remove('play');
    });
}


function timeupdate(){
    // console.log(audio.duration);
        let elapsedminutes = Math.floor(audio.currentTime / 60);
        let elapsedseconds = Math.floor(audio.currentTime % 60);

        elapsedtimeel.textContent = `
            ${elapsedminutes < 10 ? '0'+elapsedminutes : elapsedminutes}:${elapsedseconds < 10 ? '0'+elapsedseconds : elapsedseconds}
        `;

        
        // console.log(Math.floor(audio.currentTime%60));
        // console.log(audio.currentTime % 60);

        let remainingminutes = Math.floor((audio.duration - audio.currentTime) / 60);
        let remainingseconds = Math.floor((audio.duration - audio.currentTime) % 60);

        

        if(!isNaN(remainingminutes) && !isNaN(remainingseconds)){
            remainingtimeel.textContent = `
            ${remainingminutes < 10 ? '0'+remainingminutes : remainingminutes}:${remainingseconds < 10 ? '0'+remainingseconds : remainingseconds}
        `;
        }
}

function presong(){
    songindex--;
    if(songindex < 0){
        songindex = songarr.length-1;
    }
    loadsong(songindex);
    playsong();

    // console.log(songindex);
}

function nextsong(){
    songindex++;
    if(songindex > songarr.length-1){
        songindex = 0;
    }
    loadsong(songindex);
    playsong();
    // console.log(songindex);
}


// Event Listerner
playbtn.addEventListener('click',togglesong);

audio.addEventListener('timeupdate',()=>{
    updateprogress();
    timeupdate();
});
audio.addEventListener('ended',nextsong);

progress.addEventListener('click',(e)=>{
    setprogress(e);
});


previousbtn.addEventListener('click',presong);
nextbtn.addEventListener('click',nextsong);

