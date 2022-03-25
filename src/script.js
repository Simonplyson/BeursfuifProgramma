"use strict";

const INTERVAL = 10000;

document.addEventListener("DOMContentLoaded",init)

function init ()
{
    let buttons  = document.querySelectorAll(".button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {
            addDrink(buttons[i])
        });
    }
    showPricesButtons()
    //document.getElementById("orders").innerHTML += `<p> ${allStorage()} </p>`

    window.setTimeout( function() {
        window.location.reload();
    }, INTERVAL);

}

function allStorage() {

    let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}


function getJson(value)
{
    let number = parseInt(value)
    if (number === 0)
    {
        return{
            "name": "Bier",
            "date": Date.now(),
            "price": getPrice(number)
        }
    }
    else if (number === 1)
    {
        return {
            "name":"Frisdrank",
            "date": Date.now(),
            "price": getPrice(number)
        }

    }
    else if (number === 2)
    {
        return {
            "name":"Duvel",
            "date": Date.now(),
            "price": getPrice(number)
        }
    }
    else if (number === 3)
    {
        return {
            "name":"Appelmoes",
            "date": Date.now(),
            "price": getPrice(number)
        }
    }
    else if (number === 4)
    {
        return {
            "name":"Rodenbach",
            "date": Date.now(),
            "price": getPrice(number)
        }
    }
}

function showPricesButtons()
{
    let prices = JSON.parse(localStorage.getItem("prices"));
    for (let i = 0; i < prices.length; i ++)
    {
        console.log(prices[i]);
        document.getElementById(i).innerHTML = `${prices[i]}`;
        //document.querySelector(i + " + .price").innerHTML= "tesfasdfasd"
    }
}

function getPrice(number)
{
    let prices = JSON.parse(localStorage.getItem("prices"));
    console.log(prices[number]);
    return prices[number];
}
let i = 1;
function addDrink(e)
{
    console.log(e.id);
    window.localStorage.setItem(i,JSON.stringify(getJson(e.id)));
    console.log(e.innerText)
    document.getElementById("justOrdered").innerHTML += `<p> ${e.innerText} </p>`
    let drink = window.localStorage.getItem(i);
    document.getElementById("justOrdered").innerHTML += `<i> ${drink} </i>`
    i ++
}
