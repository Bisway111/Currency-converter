const Base = "https://latest.currency-api.pages.dev/v1/currencies";

let inputAmount = document.querySelector("input");
const dropDown = document.querySelectorAll(".dropDown select");
const fromCurr = document.querySelector("#from");
const toCurr = document.querySelector("#to");
const message = document.querySelector(".msg");
const btn = document.querySelector("button");

// creating the dropdown
for(let select of dropDown){
    for(let currCode in countryList){
       let newOption = document.createElement("option");
       newOption.innerText = currCode;
       newOption.value = currCode;
       if(select.name === "from" && currCode ==="USD" ){
        newOption.selected = "selected";
       }

        if(select.name === "to" && currCode ==="INR" ){
        newOption.selected = "selected";
       }


       select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}


//creating the working of flag

const updateFlag = (evt)=>{
let cCode = evt.value;
let code = countryList[cCode];
let newFlag = `https://flagsapi.com/${code}/flat/64.png`;
let newImg = evt.parentElement.querySelector("img");
newImg.setAttribute("src",newFlag);
}

//Preventing the window reload when clicking the button

btn.addEventListener("click",(evt)=>{
evt.preventDefault();
upDateExchenge();
});

// Using the fecth api for exchange 

const upDateExchenge = async ()=>{

    let amount = inputAmount.value;
    if(amount ===" " || amount <1){
        amount = 1;
         inputAmount.value ="1";
    }

    const URL = `${Base}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let exchange = data[fromCurr.value.toLowerCase()]
    let exchangeData = exchange[toCurr.value.toLowerCase()];
    console.log(exchangeData);
    let total =  amount*exchangeData;
 let newtotal = total.toFixed(3);// to get only 3 number after decimal; or i can do it with math class Math.round(total*1000)/1000;
    message.innerText = `${amount} ${fromCurr.value} = ${newtotal} ${toCurr.value}`;
}

window.addEventListener("load",upDateExchenge);
