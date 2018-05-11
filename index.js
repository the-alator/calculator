//TODO Ездящие туда-сюда машины на заднем плане
//TODO Чаевые

let brands = document.getElementById("1");
let models = document.getElementById("2");
let colors = document.getElementById("3");
let filterButtons = document.getElementsByClassName("greenToggles");
let serviceButtons = document.getElementsByClassName("yellowToggles");

var brandsList;
var modelsList;
var visibleModelsList;



let priceView;

init();

function refreshModels(){
    // let
    getFilteredModels();
}
function getFilteredModels(){
    let newModels = [];
    console.log(brands.selectedIndex);
    for(let a = 0; a < modelsList[brands.selectedIndex].length; a++){
        for(let b = 0; b < filterButtons.length; b++){

        }
    }
}
function init(){
    for(let a = 0; a < brandsList.length; a++)
        brands.appendChild(brandsList[a]);
    // refreshModels();
    for(let b of filterButtons) {
        b.addEventListener("click", function (e) {
            if (b.pressed === undefined || b.pressed === false) {
                b.style.backgroundColor = "white";
                b.style.color = "#4CAF50";
                b.pressed = true;
            } else {
                b.style.backgroundColor = "#4CAF50";
                b.style.color = "white";
                b.pressed = false;
            }

        })
    }
    for(let b of serviceButtons) {
        b.addEventListener("click", function (e) {
            if (b.pressed === undefined || b.pressed === false) {
                b.style.backgroundColor = "white";
                b.style.color = "#ffdf00";
                b.pressed = true;
            } else {
                b.style.backgroundColor = "#ffdf00";
                b.style.color = "white";
                b.pressed = false;
            }

        })
    }
}






//AIzaSyC-oP-CtwxnCTbpAEekGevXEujfbvtUYMQ
