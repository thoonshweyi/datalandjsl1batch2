//UI
const form = document.getElementById('task-form');
const taskinput = document.getElementById('task');
const filter = document.getElementById('filter');
const tasklist = document.querySelector('.collection');
const clearbtn = document.querySelector('.clear-tasks');

function addtask(e){
    // console.log('hay');

    // if do not want to use else statement can use return
    // if(taskinput.value === ''){
    //     window.alert('Add a task');
    //     return;
    // }
    //line 22 to 49

    //another way using else statement
    if(taskinput.value === ''){
        window.alert('Add a task');
    }else{
    // console.log(taskinput.value);

    //create li element
    const li = document.createElement('li');

    //add class
    // li.className = 'collection-item';
    li.classList.add('collection-item');

    //create text node append to li
    li.appendChild(document.createTextNode(taskinput.value))

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = `<i class='far fa-trash-alt'></i>`;
    // console.log(link);
    
    //append link to li
    li.appendChild(link);

    // console.log(li);

    //append li to ul
    tasklist.appendChild(li);

    storetaskinlocalstorage(taskinput.value);
    taskinput.value = '';

    }
    e.preventDefault();
}

//Remove Task
function removetask(e){
    // console.log(e.target);
    // console.log(e.target.parentElement);
    //    i       a            
    if(e.target.parentElement.classList.contains('delete-item')){
        // console.log('delete item');
        if(confirm('Are you sure')){
        //i       a            li
        e.target.parentElement.parentElement.remove();
        }
    }

    //Remove task from local storage
                                //i        a          li
    removetaskfromlocalstorage(e.target.parentElement.parentElement);
}

//Clear Tasks
function cleartasks(){
    // console.log('hay');
    
    //Meghod 1
    // tasklist.innerHTML = '';

    //Method 2
    // console.log(tasklist);
    // console.log(tasklist.childElementCount);

    // let x = 0;
    // while(x < tasklist.childElementCount){
    //     tasklist.removeChild(tasklist.firstChild);
    // }

    //Meghod 3
    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild)
    }
    //Clear All Data From Local Storage
    cleartasksfromlocalstorage();

}

//Store Task
function storetaskinlocalstorage(task){
    // console.log(task);

    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // console.log(typeof(tasks));
    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Get tasks from local storage
function gettasks(){
    // console.log('hay');

    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task)=>{
        // console.log(task);

        //create li elelmlent
        const li = document.createElement('li');
        

        //add class
        li.className = 'collection-item';

        //create text node and append to li
        li.appendChild(document.createTextNode(task));

        //create new link element
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        //add icon
        link.innerHTML = `<i class="far fa-trash-alt"></i>`;
        //append link into li
        li.appendChild(link);

        //append li into ul
        tasklist.appendChild(li);

        // console.log(li);
    });
}
// gettasks();

//Remove task form localStorage
function removetaskfromlocalstorage(taskitem){
    // console.log('hay');
    // console.log(taskitem);
    // console.log(taskitem.textContent);

    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task,index)=>{
        // console.log(task);

        if(taskitem.textContent === task){
            tasks.splice(index,1);
        }

    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Clear All Data from localStorage
function cleartasksfromlocalstorage(){
    localStorage.clear();
}

//filter tasks
function filtertasks(e){
    // console.log(e.target);
    const inputfilter = e.target.value.toLowerCase();
    // console.log(inputfilter);

    const tasks = document.querySelectorAll('.collection-item');

    tasks.forEach((task)=>{

        const item = task.firstChild.textContent.toLowerCase();

        if(item.indexOf(inputfilter) !== -1){
            task.style.display = "block";
        }else{
            task.style.display = "none";
        }
    });
}

//Event Listener

//Add Task
form.addEventListener('submit',addtask);


//Remove Task
tasklist.addEventListener('click',removetask);

//Clear tasks
clearbtn.addEventListener('click',cleartasks);

//DOM Load Event
document.addEventListener('DOMContentLoaded',gettasks);

//Filter task event
filter.addEventListener('keyup',filtertasks);