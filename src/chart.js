"use strict";

const FIVE_SECONDS = 5000;
const MINUTE = 60000;
const INTERVAL = 5000;

document.addEventListener("DOMContentLoaded",init)

function init ()
{
    console.log("yeet");

    // dezen dan uiteindelijk zetten op een half uur, of iets anders we zien wel nog
    window.setTimeout( function() {
        window.location.reload();
    }, INTERVAL);

    function allStorage() {

        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        //console.log(new Date())


        while ( i-- ) {
            let timeLast = Date.now()-INTERVAL;
            let itemInJSon = JSON.parse(localStorage.getItem(keys[i]) );
            console.log(typeof itemInJSon.date)
            if (itemInJSon.date >= timeLast)
            {
                values.push(itemInJSon);
            }
        }

        return values;
    }

    console.log(allStorage())

    initChart()
}

function initChart()
{
    //import {Chart} from "chart.js";

    //const ctx = document.getElementById('myChart').getContext('2d');
    const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
    ];

    const data = {
        labels: labels,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
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

//hier dan ook de chart laden
//functie voor prijsberekening zal gebeuren in scriptjs peisk
// maar hoe ga ik die data zenden van script naar chart? (data voor chart te vullen)
