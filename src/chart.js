"use strict";

const FIVE_SECONDS = 5000;
const MINUTE = 60000;
const INTERVAL = 10000;
const DRINKS = ["Bier","Frisdrank","Duvel","Appelmoes","Rodenbach"];
const ORIGINAL_PRICE = [1.50, 1.40, 2.50, 3.40, 1.60];


document.addEventListener("DOMContentLoaded",init)

function init ()
{
    if (localStorage.getItem("prices") === null) {
        window.localStorage.setItem("prices", JSON.stringify(ORIGINAL_PRICE));
    }
    window.setTimeout( function() {
        window.location.reload();
    }, INTERVAL);

    function allStorage() {
        let prices = JSON.parse(localStorage.getItem("prices"));
        window.localStorage.removeItem("prices");

        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length;
        while ( i-- ) {
            let timeLast = Date.now() - INTERVAL;
            let itemInJSon = JSON.parse(localStorage.getItem(keys[i]) );
            if (itemInJSon.date >= timeLast)
            {
                values.push(itemInJSon);
            }
        }
        window.localStorage.setItem("prices", JSON.stringify(prices));
        return values;
    }

    if (allStorage().length === 0)
    {
        console.log("no (new) orders yet")
        initChart()
    }
    else{
        console.log(JSON.parse(localStorage.getItem("prices")));

        let set = allStorage();
        console.log(set)
        let mappedSet = sortData(set);
        console.log(mappedSet)
        calculatePrice(mappedSet);
    }
    showPrices()

}

function sortData(dataset)  //should return a key(name) value(amount sold) map to calculate price
{
    console.log("sortData")
    const drinks = DRINKS;
    let res = new Map();

    drinks.forEach(el =>{
        let total = 0
        dataset.forEach(ord => {
            if (ord.name === el)
            {
                total ++
            }
        })
        res.set(el,total);
    })
    return res;
}

function showPrices()
{
    let prices = JSON.parse(localStorage.getItem("prices"));
    console.log(prices);
    prices.forEach(el =>
    {
        document.getElementById("pricesContainer"). innerHTML += `<p>${el} €</p>`
    })
}

function calculatePrice(dataset)
{
    console.log("calculatePrice")

    console.log(dataset)
    let amount = JSON.parse(localStorage.getItem("prices")).length;
    console.log(amount)
    let average = amount/ DRINKS.length;
    let currentPrices = JSON.parse(localStorage.getItem("prices"));
    let res = [];
    for (let i = 0; i < dataset.size; i++)
    {
        // console.log("1: " + (map.get(DRINKS[i])))
        // console.log("avg: " + average)

        if ((dataset.get(DRINKS[i])) > average)
        {
            console.log("price up")
            res[i] = (parseFloat(currentPrices[i]) + 0.10).toFixed(2);
            console.log(typeof parseInt(res[i]))
        }
        else if ((dataset.get(DRINKS[i])) < average)
        {
            console.log("price down")

            res[i] = (parseFloat(currentPrices[i]) - 0.10).toFixed(2);
        }
        else
        {
            console.log("price same")

            res[i] = (parseFloat(currentPrices[i])).toFixed(2);
        }
    }
    console.log(res)
    window.localStorage.setItem("prices", JSON.stringify(res));
    // console.log(window.localStorage.getItem("prices"));
    // console.log(res);
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
        options: {
            plugins: {
                datalabels :{
                    display: true
                }
            }
        }
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
