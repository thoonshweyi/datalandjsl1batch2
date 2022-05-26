var playerbox;
var title = document.querySelector('.musicinfo .title');
var vocalist = document.querySelector('.musicinfo .vocal');
var musiclists = document.querySelector('.musiclists');

var heartbtn,shufflebtn,loopbtn,listbtn;
var prebtn,playbtn,nextbtn;
var closebtn;
var signupbtn;

var modal = document.querySelector('.modalcontainer');

playerbox = document.querySelector('.playerbox');

heartbtn = document.querySelectorAll('.player-btn')[0];
shufflebtn = document.querySelectorAll('.player-btn')[1];
loopbtn = document.querySelectorAll('.player-btn')[2];
listbtn = document.querySelectorAll('.player-btn')[3];

prebtn = document.querySelectorAll('.control-btn')[0];
playbtn = document.querySelectorAll('.control-btn')[1];
nextbtn = document.querySelectorAll('.control-btn')[2];

closebtn = document.getElementById('closebtn');

signupbtn = document.getElementById('signup');

var audio = document.getElementById('myaudio');
var songindex=0;
const songs = [
    {
        title: 'Shape Of You',
        vocalist:'Ed Sheeran',
        path:'./music/shapeofyou.mp3'
    },
    {
        title: 'Despacito',
        vocalist:'Justinbieber',
        path:'./music/despacito.mp3'
    },
    {
        title: 'Closer',
        vocalist:'The Chainsmokers',
        path:'./music/closer.mp3'
    },
    {
        title: 'All I Ever Need',
        vocalist:'Austin Mahone',
        path:'./music/allieverneed.mp3'
    },
    {
        title: 'One call a way',
        vocalist:'Charlie Puth',
        path:'./music/onecallaway.mp3'
    },
    {
        title: 'You Are My Everything',
        vocalist:'Gummy',
        path:'./music/youaremyeverything.mp3'
    },
    {
        title: 'Fire',
        vocalist:'BTS',
        path:'./music/fire.mp3'
    },
];

loadplayer(songs[songindex]);
function loadplayer(song){
    audio.src = song.path;
    title.textContent = song.title;
    vocalist.textContent = song.vocalist;
}

//for heart btn click
heartbtn.addEventListener('click',()=>{
   if(heartbtn.children[0].classList.contains('far')){
    heartbtn.children[0].classList.remove('far');
    heartbtn.children[0].classList.add('fas');
    heartbtn.children[0].style.color = 'red';
   }else{
    heartbtn.children[0].classList.remove('fas');
    heartbtn.children[0].classList.add('far');
    heartbtn.children[0].style.color = 'var(--primarycolor)';
   }
})

//for shuffle btn click
shufflebtn.addEventListener('click',()=>{
    shufflebtn.classList.add('on');
    loopbtn.classList.remove('on');
});

//for loop btn click
loopbtn.addEventListener('click',()=>{
    loopbtn.classList.add('on');
    shufflebtn.classList.remove('on');
});

//for list btn click
listbtn.addEventListener('click',()=>{
    musiclists.classList.add('open');
    var lists='';
    var id=0;
    songs.forEach(function(song){
        lists += `
        <li sid='${id}'>
        <i class="fal fa-ellipsis-v"></i>
        <h3>${song.title}</h3>
        <span>${song.vocalist}</span>
        </li>`;
        id++;
    });
    document.querySelector('.listcontent').innerHTML = lists;
    var lis= document.querySelector('.listcontent').children;
    lis = Array.from(lis);
    lis.forEach(function(li){
        li.addEventListener('click',listclick);
    });
});
//for li click in songlists
function listclick(){
    songindex = Number(this.getAttribute('sid'));
    loadplayer(songs[songindex]);
    playSong();
}

//for play btn click
playbtn.addEventListener('click',()=>{
    var isplaying = playerbox.classList.contains('play');
    if(isplaying){
       pauseSong();
    }else{
        playSong();
    }
    
});

//for pausing song
function pauseSong(){
    audio.pause();
    playerbox.classList.remove('play');
    playbtn.querySelector('i.fas').classList.add('fa-play');
    playbtn.querySelector('i.fas').classList.remove('fa-pause');
}
//for playing song
function playSong(){
    audio.play();
    playerbox.classList.add('play');
    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');
}

//for pre btn click
prebtn.addEventListener('click',()=>{
    if(songindex > 0){
        songindex--;
        loadplayer(songs[songindex]);
        playSong();
    }else{
        songindex = 6;
        loadplayer(songs[songindex]);
        playSong();
    }
});

//for next btn click
nextbtn.addEventListener('click',()=>{
    if(songindex < 6){
        songindex++;
        loadplayer(songs[songindex]);
        playSong();
    }else{
        songindex = 0;
        loadplayer(songs[songindex]);
        playSong();
    }
});

//for close btn click
closebtn.addEventListener('click',()=>{
    musiclists.classList.remove('open');
})

//for signup btn click
signupbtn.addEventListener('click',()=>{
    modal.classList.add('show');
});
window.addEventListener('click',(e)=>{
    if(e.target == modal){
        modal.classList.remove('show');
    }
})