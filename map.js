let mapLoaded;

let mapDOM = document.getElementById('map');
let fromIn;
let toIn;
let selectedField;

function startLoading(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            loadMap( {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });

        });

    } else {
        loadMap( {lat: 49.985678, lng: 36.235693});
    }
}
function loadMap(center){
    let map = new google.maps.Map(mapDOM, {
        center: center,
        zoom: 16
    });
    console.log("222");
    let controlDiv = document.createElement('div');
    controlDiv.innerHTML = "<div id=\"controlDiv\">\n" +
        "            <div class=\"container\">\n" +
        "                <div class=\"row\">\n" +
        "                    <div class=\"col-3\">\n" +
        "                        <div class=\"title\">From:</div>\n" +
        "                    </div>\n" +
        "                    <div class=\"col-9\">\n" +
        "                        <input type=\"text\" id=\"fromIn\" class=\"form-control\">\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "                <div class=\"row\">\n" +
        "                    <div class=\"col-3\">\n" +
        "                        <div class=\"title\">To:</div>\n" +
        "                    </div>\n" +
        "                    <div class=\"col-9\">\n" +
        "                        <input type=\"text\" id=\"toIn\" class=\"form-control\">\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "            <button id=\"applyPath\" class=\"btn btn-primary\">OK</button>\n" +
        "        </div>";

    let l = map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv);
    console.log(l);

    fromIn = document.getElementById("fromIn");
    console.log(fromIn);
    fromIn.addEventListener("focus", function(e){
        selectNew(fromIn);
    });

    toIn = document.getElementById("toIn");
    toIn.addEventListener("focus", function(e){
        selectNew(toIn);
    });

    selectedField = fromIn;
    selectedField.style.borderColor = "blue";
    // var chicago = {lat: 41.850, lng: -87.650};
    //
    // controlDiv.addEventListener('click', function() {
    //     map.setCenter(chicago);
    // });


    let marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Click to zoom'
    });

    map.addListener('click', function() {

    });



    // controlDiv.position = google.maps.ControlPosition.TOP_CENTER;
}
function selectNew(field){
    selectedField.style.borderColor = "black";
    selectedField = field;
    selectedField.style.borderColor = "blue";
}

function mapApiLoaded(){
    mapLoaded = true;
}