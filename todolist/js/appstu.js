//UI
const form = document.getElementById('task-form');
const taskinput = document.getElementById('task');
const filter = document.getElementById('filter');
const tasklist = document.querySelector('.collection');
const clearbtn = document.querySelector('.clear-tasks');


function addtask(e){
    // console.log('hay');

    // if(taskinput.value === ""){
    //     window.alert('Add a task');
    // }

    if(taskinput.value === ""){
        window.alert("Add a task");
        return;
    }

    // console.log(taskinput.value);

    // create li element
    const li = document.createElement('li');

    // add class
    // li.classList.add('collection-item');
    li.className = "collection-item";

    // create text node append to li
    li.appendChild(document.createTextNode(taskinput.value));

    // create link
    const link = document.createElement('a');

    // add class
    link.className = "delete-item secondary-content";

    // add icon
    link.innerHTML = `<i class="far fa-trash-alt"></i>`;

    // append link to li
    li.appendChild(link);

    // append li to ul
    tasklist.appendChild(li);

    // console.log(link);
    // console.log(li);

    // store in localStorage
    storetaskinlocalstorage(taskinput.value);



    e.preventDefault();
}



// Remove task
function removetask(e){
    // console.log(e.target);

    // console.log(e.target.parentElement);


    //   i        a
    if(e.target.parentElement.classList.contains('delete-item')){
        // console.log('delete-item');

        if(confirm('Are you sure')){
            // i         a            li
            e.target.parentElement.parentElement.remove();
        }

    }

}


// Clear Taks
function cleartasks(){
    // console.log('hay');

    // Method 1
    // tasklist.innerHTML = "";

    // Method 2
    // console.log(tasklist);
    // console.log(tasklist.childElementCount);

    // let x = 0;
    // while(x < tasklist.childElementCount){
    //     tasklist.removeChild(tasklist.firstChild);
    // }

    // Method 3
    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild);
    }

}


// Store task
function storetaskinlocalstorage(task){
    // console.log(task);

    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
        // console.log(typeof tasks);
    }

    tasks.push(task);

    // console.log(tasks);

    localStorage.setItem('tasks',JSON.stringify(tasks));

}

// Get tasks from localstorage
function gettasks(){
    // console.log('hay');

    let tasks;

    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task) => {
        // console.log(task);

        // create li element
        const li = document.createElement('li');
        // add class
        li.className = "collection-item";
        // create text node and append to li
        li.appendChild(document.createTextNode(task));

        // create new link element
        const link = document.createElement('a');
        // add class
        link.className = "delete-item secondary-content";
        // add icon
        link.innerHTML = `<i class="far fa-trash-alt"></i>`;
        // append link into li
        li.appendChild(link);

        // console.log(li);

        // append li into ul
        tasklist.appendChild(li);


    });


}

// gettasks();








// Event Listener
// Add Task
form.addEventListener('submit',addtask);

// Remove task
tasklist.addEventListener('click',removetask);

// clear tasks
clearbtn.addEventListener('click',cleartasks);

document.addEventListener('DOMContentLoaded',gettasks);

