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

init();

// testAnimation();

function testAnimation() {
    let elem = document.getElementById("partPrice");
    let step = 10;
    let pos = 0;
    let iId = setInterval(move,200);

    function move(){
        console.log(999);
        pos += step;
        elem.style.left = pos + "px";
        // elem.style.top = pos + "px";
    }
}

function refreshModels(brandChanged){
    let newModels = getFilteredModels(currentModels);
    if(!brandChanged && newModels.length === modelsDOM.options.length)
        return;
    clearListDOM(colorsDOM);
    clearListDOM(modelsDOM);
    for(let a = 0; a < newModels.length; a++) {
        modelsDOM.appendChild(newModels[a])
        console.log(newModels[a].value);
        modelsDOM.selectedIndex = 0;
    }
}
function filterModels(){

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
            } else {
                this.style.backgroundColor = "white";
                this.style.color = "#ffdf00";
                this.pressed = false;
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
        }
    });
    dateTimeForm.disabled = true;
    dateTimeForm.min = getCurrentDateForInput();
    dateTimeForm.value = getCurrentDateForInput();
    // dateTimeForm.addEventListener("focusout",function(e){
    //     dateTimeForm
    // });

    brandsDOM.addEventListener("change", function(e){
        currentModels = brandsDOM.selectedIndex - 1;
        refreshModels(true);

    });
    modelsDOM.addEventListener("change", function(e){
        clearListDOM(colorsDOM);
        colorsDOM.appendChild(getDummyOptionTag());
        for(let a = 0; a < modelsDOM.options[modelsDOM.selectedIndex].color.length; a++)
            colorsDOM.appendChild(modelsDOM.options[modelsDOM.selectedIndex].color[a]);
        colorsDOM.selectedIndex = 0;

    });

}
function getDummyOptionTag(){
    let dummyOpt = document.createElement("option");
    dummyOpt.innerText = "Not selected";
    dummyOpt.classList.add("dummyOpt");
    return dummyOpt;
}
function clearListDOM(listDOM){
    while(listDOM.options.length)
        listDOM.options.remove(0);
}
//"2015-09-03T11:49"
function getCurrentDateForInput() {
    let date = new Date();
    return date.getFullYear() + "-" + zeroIsImportant(date.getMonth()) + "-" + zeroIsImportant(date.getDate()) + "T" +
        zeroIsImportant(date.getHours()) + ":" + zeroIsImportant(date.getMinutes());
}
function zeroIsImportant(number){
    number = number + "";
    if(number.length === 1)
        number = "0" + number;
    return number;
}

function PriceView(){
    this.container = document.getElementById("footerRow");
    const model = 0, path = 1, time = 2, services = 3, tips = 4;
    const signW = this.container.offsetWidth * 0.02;
    const fieldW = this.container.offsetWidth * 0.15;
    const startPoint = signW + fieldW;
    this.animationIntId = -1;

    this.resultF = document.getElementById("resultPrice");
    //lower is higher
    // this.visibleFields = [];
    this.fieldsArr = [];

    this.insertField = function(priority, value, message){
        let newField = document.createElement("div");
        newField.priority = priority;
        newField.value = value;
        newField.message = message;
        newField.classList.add("partPrice");
        newField.currentPos = this.countLefts(priority - 1);
        newField.currentX = startPoint * (newField.currentPos + 1);
        newField.style.left = newField.currentX + "px";
        newField.getAppropriateX = function(){
            return startPoint * (this.currentPos + 1);
        }

        this.fieldsArr[priority] = newField;
        this.changeRights(priority + 1, 1);
        animation();
        this.container.insertBefore(newField, this.getFirstRighter(priority + 1));
        // for(let i = 0; i < this.fieldsArr.length; i++){
        //
        // }
    }
    this.getFirstRighter = function(from){
        for(let i = from; i < this.fieldsArr.length; i++){
            if(this.fieldsArr[i] !== undefined)
                return this.fieldsArr[i];
        }
    }
    this.removeField = function(priority){
        this.container.removeChild(this.fieldsArr[priority]);
        this.fieldsArr[priority] = undefined;
        this.changeRights(priority + 1, -1);
        animation();
    }
    this.changeRights = function(from, value){
        for(let i = from; i < this.fieldsArr.length; i++){
            if(this.fieldsArr[i] !== undefined)
                this.fieldsArr[i].currentPos += value;
        }
    }
    this.countLefts = function(from){
        let counter = 0;
        for(let i = from; i >= 0; i++){
            if(this.fieldsArr[i] !== undefined)
                counter++;
        }
        return counter;
    }
    function animation(){
        if(this.animationIntId !== -1) {
            clearInterval(this.animationIntId);
            this.animationIntId = -1;
        }
        let animationList = [];
        for(let i = 0; i < this.fieldsArr.length; i++)
            if(this.fieldsArr[i].getAppropriateX() !== this.fieldsArr[i].currentX)
                animationList.push(this.fieldsArr[i]);
        if(animationList.length === 0)
            return;
        let direction;
        if(animationList[0].getAppropriateX() - animationList[0].currentX > 0)
            direction = 1;
        else
            direction = -1;
        this.animationIntId = setInterval(move, 1);
        console.log("animationIntId " + this.animationIntId);

        function move(){
            for(let i = 0; i < animationList.length; i++) {
                animationList[i].currentX += direction;
                animationList[i].style.left = animationList[i].currentX + "px";
            }
        }
    }
}

//AIzaSyC-oP-CtwxnCTbpAEekGevXEujfbvtUYMQ
