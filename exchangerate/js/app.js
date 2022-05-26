//UI
const currencyoneel = document.getElementById('currency-one'),
        ammountoneel = document.getElementById('amount-one');
        
const currencytwoel = document.getElementById('currency-two'),
        amountwoel = document.getElementById('amount-two');

const swapel = document.getElementById('swap'),
        rateel = document.getElementById('rate');



function calculate(){
    // console.log('hay');

    const crcyone = currencyoneel.value;
    const crcytwo = currencytwoel.value;

    const amtone = ammountoneel.value;
    const amttwo = amountwoel.value;

//     console.log(crcyone,crcytwo);
//     console.log(amtone,amttwo);

        const apikey = "6641a70a1af8d98c0f02d688";
        const uri = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${crcyone}`;
        // console.log(uri);

        //AJAX Request
        //Promise(test my web and api are connected or not)
        // console.log(fetch(uri));
        fetch(uri)
        .then(res=>res.json())//convert response to json
        .then(data=>{//store json object to data(data=req)
                // console.log(data);
                // console.log(typeof data.conversion_rates);
                // console.log(data.conversion_rates.USD);

                const rate = data.conversion_rates[crcytwo];
                // console.log(rate);

                rateel.textContent = `1 ${crcyone} = ${rate} ${crcytwo}`;
        
                // amttwo = (amtone * rate).toFixed(2);//GET Error
                
                amountwoel.value = (ammountoneel.value * rate).toFixed(2);

        });
}

//Event Listener
currencyoneel.addEventListener('change',calculate);
ammountoneel.addEventListener('input',calculate);

currencytwoel.addEventListener('change',calculate);
amountwoel.addEventListener('input',calculate);

swapel.addEventListener('click',()=>{
    // console.log('already swap');

    const temp = currencyoneel.value;
    
    currencyoneel.value = currencytwoel.value
    currencytwoel.value = temp;

    calculate();
});