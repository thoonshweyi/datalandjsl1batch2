const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cfmpassword = document.getElementById("cfmpassword");

// //Event Listener(Method 1)
// form.addEventListener("submit", function(e){
//     // console.log("hay");
//     e.preventDefault();/*stop refreshing */
//     // console.log("hay");

//     if(username.value === ""){
//         showerror(username,"Username is required");
//     }else{
//         showsuccess(username);
//     }

//     if(email.value === ""){
//         showerror(email,"Email is required");
//     }else if(!validateEmail(email.value)){
//         showerror(email,"Email is not valid");
//     }else{
//         showsuccess(email);
//     }

//     if(password.value === ""){
//         showerror(password,"Password is required")
//     }else{
//         showsuccess(password);
//     }

//     if(cfmpassword.value === ""){
//         showerror(cfmpassword,"Comfirm password is required")
//     }else if(password.value !== cfmpassword.value){
//         showerror(cfmpassword, "Password do not match");
//     }else{
//         showsuccess(cfmpassword);
//     }
// }
// );





function showerror(input,message){
    const formcontrol = input.parentElement;/*get formcontrol of input with parentElement(formcontrol can be called directly with id)*/
    formcontrol.className = "form-control error";
    // formcontrol.classList.add("error");

    //const small = document.querySelector("small")/*get first small of document */
    const small = formcontrol.querySelector("small")/*get fist small tag of formcontrol*/
    small.innerText = message;
}

function showsuccess(input){
    const formcontrol = input.parentElement;

    // formcontrol.classList.remove("error");
    // formcontrol.classList.add("success");

    formcontrol.className = "form-control success";
}


//check if input field is blank
function checkrequired(inputarrs){
    // console.log(inputarr);
    inputarrs.forEach(function(inputarr){
        // console.log(inputarr);
        // console.log(inputarr.value);
        // console.log(inputarr.id);
        if(inputarr.value === ""){
            showerror(inputarr,`${getfieldname(inputarr)} is required`);
        }else{
            showsuccess(inputarr);
        }
    });
}
//Get Field Name
function getfieldname(inputarr){
    // return inputarr.id.charAt(0);
    // console.log(inputarr.id.charAt(0).toUpperCase()+inputarr.id.slice(1));

    // convert the first letter of input field id to uppercase and concat the input field id with cutting the first letter
    return inputarr.id.charAt(0).toUpperCase()+inputarr.id.slice(1);
}
// getfieldname(username);

//check the input field length is between minimum and maximum
function checklength(input,min,max){
    if(input.value.length < min){
        showerror(input, `${getfieldname(input)} must be at least ${min} characters`);
    }else if(input.value.length > max){
        showerror(input , `${getfieldname(input)} must be less than ${max} characters`)
    }
}

//Check email is valid
function checkEmail(input) {
    //regular expression for valid email address
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(email).toLowerCase());

    if(re.test(input.value)){
        showsuccess(input);
    }else{
        showerror(input, "Email is not valid");
    }
}
//For checking email format
// function validateEmail(email) {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }


//Check Passwords Match
function checkpasswordsmatch(input1,input2){
   if(input1.value !== input2.value){
       showerror(input2,"Password do not match");
   }
}

// Event Listener (Method 2)
form.addEventListener("submit",function(e){
    e.preventDefault();
    // console.log("hay");
    checkrequired([username,email,password,cfmpassword]);
    checklength(username,3,15);
    checklength(password, 6, 25);
    checkEmail(email);
    checkpasswordsmatch(password,cfmpassword);
});