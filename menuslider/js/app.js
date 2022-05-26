const togglebtn = document.getElementById("toggle");
const openbtn = document.getElementById("open");

const modal = document.getElementById("modal");
const closebtn = document.getElementById("close");

togglebtn.addEventListener("click",()=>{
    document.body.classList.toggle("shownav");/*add shownav if there is no 'shownav' or remove shownav if there is 'shownav' in the classList*/
});

openbtn.addEventListener("click",()=>{
    modal.classList.add("showmodal");
});
closebtn.addEventListener("click",()=>{
    modal.classList.remove("showmodal");
})

// Hide Modal on outside click

// window.addEventListener("click",(e)=>{
//     // console.log(e.target);
//     if(e.target === modal){
//         modal.classList.remove("showmodal");
//     }
// });
window.addEventListener("click",(e)=>e.target === modal ? modal.classList.remove("showmodal"):false);

