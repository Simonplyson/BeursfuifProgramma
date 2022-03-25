"use strict";

const FIVE_SECONDS = 5000;
const MINUTE = 60000;
const INTERVAL = 5000;
const DRINKS = ["bier","frisdrank","Duvel","cocktail","rodenbach"];
const ORIGINAL_PRICE = [1.50, 1.40, 2.50, 3.40, 1.60];


document.addEventListener("DOMContentLoaded",init)

function init ()
{
    console.log("test")
    if (localStorage.getItem("prices") === null) {
        window.localStorage.setItem("prices", JSON.stringify(ORIGINAL_PRICE));
    }
    // window.setTimeout( function() {
    //     window.location.reload();
    // }, INTERVAL);

    function allStorage() {
        let prices = JSON.parse(localStorage.getItem("prices"));
        window.localStorage.removeItem("prices");

        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length;
        while ( i-- ) {
            let timeLast = Date.now();
            let itemInJSon = JSON.parse(localStorage.getItem(keys[i]) );
            if (itemInJSon.date >= timeLast)
            {
                values.push(itemInJSon);
            }
            values.push(itemInJSon);
        }
        window.localStorage.setItem("prices", JSON.stringify(prices));
        return values;
    }

    let set = allStorage();
    sortData(set)
    calculatePrice(set)
}

function sortData(dataset)  //should return a key(name) value(amount sold) map to calculate price
{
    console.log("sortData")
    const drinks = DRINKS;
    let res = new Map();

    console.log(dataset)
    drinks.forEach(el =>{
        let total = 0
        let price = 0;
        dataset.forEach(ord => {
            if (ord.name === el)
            {
                total ++
            }
            price = ord.price;
        })
        console.log(price)
        res.set(el,total);
    })
    return res;
}

function calculatePrice(dataset)
{
    console.log("calculatePrice")

    let map = sortData(dataset);
    let amount = dataset.length;
    let average = amount/ DRINKS.length;
    let currentPrices = JSON.parse(localStorage.getItem("prices"));
    let res = [];
    for (let i = 0; i < map.size; i++)
    {
        if ((map.get(DRINKS[i])) > average)
        {
            res[i] = (parseFloat(currentPrices[i]) + 0.10).toFixed(2);
            console.log(typeof parseInt(res[i]))
            //res[i].toFixed(2)

        }
        else if ((map.get(DRINKS[i])) < average)
        {
            res[i] = (parseFloat(currentPrices[i]) - 0.10).toFixed(2);
        }
        else
        {
            res[i] = (parseFloat(currentPrices[i])).toFixed(2);
        }
    }
    window.localStorage.setItem("prices", JSON.stringify(res));
    console.log(window.localStorage.getItem("prices"));
    console.log(res);
    initChart()

    return res;
}

function initChart()
{
    console.log("initChart")
    let dataset = JSON.parse(localStorage.getItem("prices") );
    const data = {
        labels: DRINKS,
        datasets: [{
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: dataset,
        }]
    };
    const config = {
        type: 'bar',
        data: data,
        options: {}
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

// function updateChart(dataset)
// {
//     document.getElementById("chartContainer").innerHTML =  ``;
//     document.getElementById("chartContainer").innerHTML = `<canvas id="myChart"></canvas>`
//     const data = {
//         labels: DRINKS,
//         datasets: [{
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: dataset,
//         }]
//     };
//     const config = {
//         type: 'bar',
//         data: data,
//         options: {}
//     };
//
//     const myChart = new Chart(
//         document.getElementById('myChart'),
//         config
//     );
// }
//hier dan ook de chart laden
//functie voor prijsberekening zal gebeuren in scriptjs peisk
// maar hoe ga ik die data zenden van script naar chart? (data voor chart te vullen)
