"use strict";

document.addEventListener("DOMContentLoaded",init)

function init ()
{
    let buttons  = document.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {
            addDrink(buttons[i])
        });
    }
    //document.getElementById("orders").innerHTML += `<p> ${allStorage()} </p>`


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
    if (number === 1)
    {
        return{
            "name": "bier",
            "date": Date.now(),
            "price": getPrice(value)
        }
    }
    else if (number === 2)
    {
        return {
            "name":"frisdrank",
            "date": Date.now(),
            "price": getPrice(value)
        }

    }
    else if (number === 3)
    {
        return {
            "name":"Duvel",
            "date": Date.now(),
            "price": getPrice(value)
        }
    }
    else if (number === 4)
    {
        return {
            "name":"cocktail",
            "date": Date.now(),
            "price": getPrice(value)
        }
    }
    else if (number === 5)
    {
        return {
            "name":"rodenbach",
            "date": Date.now(),
            "price": getPrice(value)
        }
    }
}

function getPrice(value)
{
    //crazy berekeningen
    return 1.5;
}
let i = 1;
function addDrink(e)
{
    window.localStorage.setItem(i,JSON.stringify(getJson(e.value)));
    console.log(e.innerText)
    document.getElementById("justOrdered").innerHTML += `<p> ${e.innerText} </p>`
    let drink = window.localStorage.getItem(i);
    document.getElementById("justOrdered").innerHTML += `<i> ${drink} </i>`
    i ++
}
