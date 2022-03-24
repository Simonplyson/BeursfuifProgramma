"use strict";

document.addEventListener("DOMContentLoaded",init)

function init ()
{
    console.log("yeet");

    // dezen dan uiteindelijk zetten op een half uur, of iets anders we zien wel nog
    window.setTimeout( function() {
        window.location.reload();
    }, 5000);

}

//hier dan ook de chart laden
//functie voor prijsberekening zal gebeuren in scriptjs peisk
// maar hoe ga ik die data zenden van script naar chart? (data voor chart te vullen)