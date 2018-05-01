//TODO Ездящие туда-сюда машины на заднем плане

let  list = document.getElementById("test");
let allowMapApiUse = false;
list.addEventListener("click", clicked);

tester();

function clicked(event){
    console.log(list.value);
}
function mapApiLoaded(){
    console.log(456);
    allowMapApiUse = true;
}
//AIzaSyC-oP-CtwxnCTbpAEekGevXEujfbvtUYMQ
