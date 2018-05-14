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

function getDateTimePrice(date){
    let resultPercent = 0;
    if(date.getDay() === 0)
        resultPercent += 20;
    if(date.getHours() > 22 || date.getHours() < 6)
        resultPercent += 15;
    return resultPercent;
}

//AIzaSyC-oP-CtwxnCTbpAEekGevXEujfbvtUYMQ
