//UI
const swapbtn = document.querySelector('.swapbtn');
const currencyoneel = document.getElementById('currencyone'),
        currencytwoel = document.getElementById('currencytwo');

const amountoneel = document.getElementById('amountone'),
        amounttwoel = document.getElementById('amounttwo');

const rateel = document.querySelector('.rate');

const apikey = '6641a70a1af8d98c0f02d688'

let url = `https://v6.exchangerate-api.com/v6/${apikey}/latest/`;

swapbtn.addEventListener('click',()=>{
    // console.log('hay');
    let temp = currencyoneel.value;
    currencyoneel.value = currencytwoel.value;
    currencytwoel.value = temp;

    convert();

});


currencyoneel.addEventListener('change',convert);
currencytwo.addEventListener('change',convert);
amountoneel.addEventListener('input',convert);

amounttwoel.addEventListener('input',convert);

function convert(){
    let currencyone = currencyoneel.value;
    let currencytwo = currencytwoel.value;
    let amountone = amountoneel.value

    url = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${currencyone}`;

    // console.log(fetch(url));
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        
        // console.log(data.conversion_rates.USD); it work
        // console.log(data.conversion_rates.currencytwo); it is not work
        let rate = data.conversion_rates[currencytwo];

        rateel.textContent = `1 ${currencyone} = ${rate} ${currencytwo}`;

        amounttwoel.value = (amountone * rate).toFixed(2);
        
        // console.log(rate);
    });
}
convert();
