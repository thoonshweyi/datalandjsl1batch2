const amountel = document.getElementById('amount');
const durationel = document.getElementById('duration');
const interestel = document.getElementById('interest');

const monthlypaymentel = document.querySelector('.monthlypayments');
const totalinterestel = document.querySelector('.totalinterests');
const totalpaymentel = document.querySelector('.totalpayments');


amountel.addEventListener('input',()=>{
    amountel.nextElementSibling.innerHTML = 
    `
        <span class="fw-bold dollarsigns">$</span> ${amountel.value}
    `;
    calculateloaninterest();
});

durationel.addEventListener('input',()=>{
    durationel.nextElementSibling.innerHTML = 
    `
        ${durationel.value} <span class="fw-bold months">Months</span>
    `;
    calculateloaninterest();
});

interestel.addEventListener('input',()=>{
    interestel.nextElementSibling.textContent = interestel.value + " %";
    calculateloaninterest();
})
calculateloaninterest();
function calculateloaninterest(){
    let amount = parseFloat(amountel.value);
    let duration = parseFloat(durationel.value);
    let interest = parseFloat(interestel.value)/12;

    // console.log(amount);
    // console.log(duration);
    // console.log(interest);

    // console.log((amount * interest/100 * duration).toFixed(2));

    // let totalinterest = +Math.round((amount * (interest/100)) * duration).toFixed(2);
    // let monthlypayment = +((amount+totalinterest)/duration).toFixed(2);
    // let totalpayment = +(monthlypayment*duration).toFixed(2);

    let totalinterest = +Math.round((amount * (interest/100)) * duration);
    let monthlypayment = +((amount+totalinterest)/duration);
    let totalpayment = +(monthlypayment*duration);

    // console.log(monthlypayment);
    // console.log(totalinterest);
    // console.log(totalpayment)

    monthlypaymentel.textContent = "$"+monthlypayment.toFixed(2);
    totalinterestel.textContent = "$"+totalinterest.toFixed(2);
    totalpaymentel.textContent = "$"+totalpayment.toFixed(2);

}