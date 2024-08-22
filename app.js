const BASE_URL="https://2024-03-06.currency-api.pages.dev/v1/currencies"

  const dropdowns = document.querySelectorAll(".dropdown select")
  const btn = document.querySelector("button")
  const fromCurr = document.querySelector(".from select")
  const toCurr = document.querySelector(".to select")
  const msg = document.querySelector(".msg")

  

  for(let select of dropdowns){
    for (let currCode in countryList) {
      let newOption = document.createElement("option")
      newOption.innerText = currCode
      newOption.value = currCode
      if(select.name === "from" && currCode === "USD"){
        newOption.selected = "selected"
      }
      else if(select.naem === "to" && currCode === "IND"){
        newOption.selected = "selected";
      }
      select.append(newOption)
    }
        //  console.log(select);
      select.addEventListener("change", (evt)=>{
       // console.log(evt);
        
       updateFlag(evt.target)
     })
 
  }

  updateExchangeRate =  async () =>{
    let amount = document.querySelector(".amount input")
    let amtValue = amount.value
    // console.log(amtValue);
    if(amtValue === "" || amtValue < 1 || isNaN(amtValue)){
      amtValue = 1;
    amount.value = "1";
    alert("Enter Correct Value");
    }

    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL)
    //console.log(response);
    let data = await response.json();
    // console.log(data);
     let rate= data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
     //console.log(rate);

     let finalAmount = rate * amtValue;
     msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`

  }

  const updateFlag = (element)=>{
    //console.log(element);
    let currCode = element.value;
    //console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newSrc
  }

  btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    
  });

  window.addEventListener("load", ()=>{
    updateExchangeRate();

  })
