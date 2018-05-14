//TODO Ездящие туда-сюда машины на заднем плане
//TODO Чаевые

let brandsList;
let modelsList;

let brandsDOM = document.getElementById("1");
let modelsDOM = document.getElementById("2");
let colorsDOM = document.getElementById("3");
let filterButtonsDOM = document.getElementsByClassName("greenToggles");
let serviceButtonsDOM = document.getElementsByClassName("yellowToggles");
let dateTimeNowButton = document.getElementById("dtNow");
let dateTimeForm = document.getElementById("dtform");

let currentModels;
let filter = [];

let priceView = new PriceView();

let lastModel;
let lastDate;

// document.getElementById("order").addEventListener("click",function(e){
//    console.log(document.getElementById("dt").defaultValue);
//     console.log(document.getElementById("dt").value);
// });
// document.getElementById("dt").value = "2015-09-03T11:49";
// document.getElementById("dt").min = "2015-09-02T11:49";
// let now = new Date(document.getElementById("dt").value);
// console.log(now);
//
// document.getElementById("dt").addEventListener("focusout", function(){
//    console.log("###");
// });

// let f = document.getElementById("footerRow");
// console.log(f.offsetWidth);
// document.getElementById("resultPrice").style.left = 500 + "px";

// let d = new Date("2015-09-03T24:49");

init();

// testAnimation();

function testAnimation() {
    let elem = document.getElementById("partPrice");
    let step = 10;
    let pos = 0;
    let iId = setInterval(move,200);

    function move(){
        // console.log(999);
        pos += step;
        elem.style.left = pos + "px";
        // elem.style.top = pos + "px";
    }
}

function refreshModels(brandChanged){
    let newModels = getFilteredModels(currentModels);
    if(!brandChanged && newModels.length === modelsDOM.options.length)
        return;
    if(lastModel !== undefined)
        priceView.changeData(-lastModel.startPrice, priceView.model);
    lastModel = undefined;
    clearListDOM(colorsDOM);
    clearListDOM(modelsDOM);
    for(let a = 0; a < newModels.length; a++) {
        modelsDOM.appendChild(newModels[a])
        console.log(newModels[a].value);
        modelsDOM.selectedIndex = 0;
    }
}

function getFilteredModels(chosenBrand){
    let newModels = [getDummyOptionTag()];
    console.log("1");
    outer:
    for(let a = 0; a < modelsList[chosenBrand].length; a++) {
        for(let f in filter) {
            console.log(modelsList[chosenBrand][a][f]  + " " + filter[f]);
            if(modelsList[chosenBrand][a][f] != filter[f])
                continue outer;
        }
        newModels.push(modelsList[chosenBrand][a]);
    }

    return newModels;
    // console.log(brandsDOM.selectedIndex);
    // for(let a = 0; a < modelsList[brandsDOM.selectedIndex].length; a++){
    //     for(let b = 0; b < filterButtonsDOM.length; b++){
    //
    //     }
    // }
}
function init(){
    fillData();
    for(let a = 0; a < brandsList.length; a++)
        brandsDOM.appendChild(brandsList[a]);
    //and others

    $(".yellowToggles").mouseover(function () {
        $(this).popover({title: "Price", content: $(this)[0].value, animation: true, placement:"top"});
        $(this).popover("show")
    });
    $(".yellowToggles").mouseout(function () {
        $(this).popover('hide');
    });

    for(let b of filterButtonsDOM) {
        b.addEventListener("click", function (e) {
            if (b.pressed === undefined || b.pressed === false) {
                b.style.backgroundColor = "#4CAF50";
                b.style.color = "white";
                b.pressed = true;
                filter[b.value] = 1;
                refreshModels(false);
            } else {
                b.style.backgroundColor = "white";
                b.style.color = "#4CAF50";
                b.pressed = false;
                delete filter[b.value];
                refreshModels(false);
            }

        })
    }
    for(let b of serviceButtonsDOM) {
        b.addEventListener("click", function (e) {
            if (this.pressed === undefined || this.pressed === false) {
                this.style.backgroundColor = "#ffdf00";
                this.style.color = "white";
                this.pressed = true;
                priceView.changeData(this.value, priceView.services);
            } else {
                this.style.backgroundColor = "white";
                this.style.color = "#ffdf00";
                this.pressed = false;
                priceView.changeData(-this.value, priceView.services);
            }

        })
    }

    dateTimeNowButton.pressed = true;
    dateTimeNowButton.addEventListener("click", function(e){
        if (this.pressed === true) {
            this.style.backgroundColor = "white";
            this.pressed = false;
            dateTimeForm.disabled = false;
        } else {
            this.style.backgroundColor = "darkgray";
            this.pressed = true;
            dateTimeForm.disabled = true;
            dateTimeForm.min = getCurrentDateForInput();
            dateTimeForm.value = getCurrentDateForInput();

            priceView.changeData(-getDateTimePrice(lastDate), priceView.time);
            lastDate = new Date(dateTimeForm.value);
            priceView.changeData(getDateTimePrice(new Date(dateTimeForm.value)), priceView.time);
        }
    });
    dateTimeForm.disabled = true;
    dateTimeForm.min = getCurrentDateForInput();
    dateTimeForm.value = getCurrentDateForInput();
    lastDate = new Date(dateTimeForm.value);
    dateTimeForm.addEventListener("focusout",function(e){
        priceView.changeData(-getDateTimePrice(lastDate), priceView.time);
        lastDate = new Date(dateTimeForm.value);
        priceView.changeData(getDateTimePrice(new Date(dateTimeForm.value)), priceView.time);
    });
    dateTimeForm.addEventListener("focusin",function(e){
        // priceView.changeData(getDateTimePrice(new Date(dateTimeForm.value)), priceView.time);
    });

    brandsDOM.addEventListener("change", function(e){
        currentModels = brandsDOM.selectedIndex - 1;
        refreshModels(true);

    });
    modelsDOM.addEventListener("change", function(e){
        if(lastModel !== undefined)
            priceView.changeData(-lastModel.startPrice, priceView.model);
        lastModel = modelsDOM.options[modelsDOM.selectedIndex];
        priceView.changeData(lastModel.startPrice, priceView.model);
        clearListDOM(colorsDOM);
        colorsDOM.appendChild(getDummyOptionTag());
        for(let a = 0; a < modelsDOM.options[modelsDOM.selectedIndex].color.length; a++)
            colorsDOM.appendChild(modelsDOM.options[modelsDOM.selectedIndex].color[a]);
        colorsDOM.selectedIndex = 0;

    });
}


