"use strict";

document.addEventListener("DOMContentLoaded",init)

function init ()
{
    console.log("test");
    let buttons  = document.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {
            addDrink(buttons[i])
        });
    }
    document.getElementById("orders").innerHTML += `<p> ${allStorage()} </p>`


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
let order =
    {
        "name": "bier",
        "price": 1.5
    }

function getJson(value)
{
    if (value === 1)
    {
        return {
            "name": "bier",
            "date": new Date(),
            "price": getPrice(value)
        };
    }
    else if (value === 2)
    {
        return {
            "name":"frisdrank",
            "date": new Date(),
            "price": getPrice(value)
        }
    }
    else if (value === 3)
    {
        return {
            "name":"Duvel",
            "date": new Date(),
            "price": getPrice(value)
        }
    }
    else if (value === 4)
    {
        return {
            "name":"cocktail",
            "date": new Date(),
            "price": getPrice(value)
        }
    }
    else if (value === 5)
    {
        return {
            "name":"rodenbach",
            "date": new Date(),
            "price": getPrice(value)
        }
    }
}

function getPrice(value)
{
    //crazy berekeningen
    return 1.5;
}
let i = 0;      //da gawe dan veranderen met datum van nu
function addDrink(e)
{
    window.localStorage.setItem(i,JSON.stringify(order));
    console.log(e.innerText)
    document.getElementById("test").innerHTML += `<p> ${e.innerText} </p>`
    let drink = window.localStorage.getItem(i);
    document.getElementById("test").innerHTML += `<i> ${drink} </i>`
    document.getElementById("test").innerHTML += `<i> ${i} </i>`
    i ++
}