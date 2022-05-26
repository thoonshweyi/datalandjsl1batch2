//UI
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const year = document.getElementById("year");
const countdown = document.getElementById("countdown");
const loading = document.getElementById("loading");

const currentyear = new Date().getFullYear();
// console.log(currentyear);

const newyeartime = new Date(`January 01 ${currentyear+1} 00:00:00`);
// console.log(newyeartime);

year.textContent = currentyear+1;

function updatecountdown(){
    // console.log("hay");
    const currenttime = new Date();
    // console.log(currenttime);

    const diff = newyeartime - currenttime ;/*get different in miliseconds*/

    // console.log(diff)
                    //   ms      s     m    hr   d
    const d = Math.floor(diff / 1000 / 60 / 60 / 24) ;// convert different into day
    // console.log(d);
    const h = Math.floor(diff / 1000 / 60 / 60) % 24 ; //calculate modulus hours after converting to day
    // console.log(h)

    const m = Math.floor(diff / 1000 / 60) % 60 ;//calculate modulus minutes after converting to hours
    // console.log(m);

    const s = Math.floor(diff / 1000) % 60;//calculate modulus seconds after converting to minutes
    // console.log(s)

    days.textContent = d ;
    hours.textContent  = h < 10 ? "0"+ h : h;//add leading zero in hours less than 10
    minutes.textContent = m < 10 ? "0"+ m : m ;// add leading zero in minutes less than 10
    seconds.textContent = s < 10 ? "0"+ s : s;// add leading zero in seconds less than 10
}
setInterval(updatecountdown,1000);//recall updatecountdown in every 1 seconds
setTimeout(() => {
    loading.remove();
    countdown.style.display = "flex" ;
}, 1000);//do nameless function in comming 1 second