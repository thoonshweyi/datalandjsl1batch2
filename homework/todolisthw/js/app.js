const tasklist = document.querySelector('.task-list');
const addtaskbtn = document.querySelector('.addtaskbtn');
const task = document.querySelector('.task');
const taskform = document.getElementById('taskform');
const filter = document.getElementById('filter');

addtaskbtn.addEventListener('click',()=>{
    task.classList.add('show');
    task.children[1].focus();
});

taskform.addEventListener('submit',(e)=>{
    e.preventDefault();
    addtask();
});

let todos;
function gettaskformlocalstorage(){
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
}
// gettaskformlocalstorage();
function addtasktolocalstorage(){
     gettaskformlocalstorage();
     
     todos.push(task.children[1].value);
     localStorage.setItem('todos',JSON.stringify(todos));
}

function removetaskfromlocalstorage(taskvalue){
    gettaskformlocalstorage();
    todos.forEach((todo,index)=>{
        // console.log(taskvalue.textContent);
        if(taskvalue.textContent === todo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem('todos',JSON.stringify(todos));
}

function addtask(taskvalue = ''){

    // console.log(typeof taskvalue , taskvalue);
    // console.log(typeof task.children[1].value , task.children[1].value);
    
    if(task.children[1].value === '' && taskvalue === ''){
        window.alert("Enter your todo");
    }else{
        // add li to ul as ui
    const li = document.createElement('li');
    li.classList.add('task-list-item');
    li.innerHTML = `
    <a href="#"><span class="check"></span> <span>${taskvalue ? taskvalue : task.children[1].value}</span></a> <a href="#"><i class="fas fa-trash-alt deletebtn"></i></a>
    
    `;
    // console.log(li);

    tasklist.appendChild(li);
    taskvalue ? '' : addtasktolocalstorage();

    task.children[1].value = '';
    task.classList.remove('show');
    
    //remove li from ul as ui
    li.addEventListener('click',(e)=>{
        if(e.target.classList.contains('deletebtn')){
            // console.log('hay');
            if(window.confirm("Are you sure want to delete task?")){
                li.remove();
                // console.log(li.children[0].lastChild);
                removetaskfromlocalstorage(li.children[0].lastChild);
            }
        }
    });
    }
    
   
}

function displaytaskfromlocalstorage(){
    gettaskformlocalstorage();

    todos.forEach((todo)=>{
        addtask(todo);
    });
}
displaytaskfromlocalstorage();

filter.addEventListener('input',()=>{
    const filtervalue = filter.value.toLowerCase();
    
    const taskitems = document.querySelectorAll('.task-list-item');

    taskitems.forEach((taskitem)=>{
        const taskitemvalue = taskitem.children[0].lastChild.textContent.toLowerCase();
        if(taskitemvalue.indexOf(filtervalue) !== -1){
            taskitem.style.display = 'flex';
        }else{
            taskitem.style.display = 'none';
        }
    });
});