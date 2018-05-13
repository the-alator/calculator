const CS = [createColor("yellow"),createColor("red"),createColor("blue"),createColor("green"),createColor("black")
    ,createColor("white"),createColor("brown"),createColor("pink"),createColor("grey"),createColor("silver")];

function fillData() {
    brandsList = [getDummyOptionTag(), createBrand(0, "BMW"), createBrand(2, "Daewoo"), createBrand(3, "Kia"), createBrand(1, "BMW"),
        createBrand(1, "BMW"), createBrand(1, "BMW"), createBrand(1, "BMW"), createBrand(1, "BMW"),];
    modelsList = [
        [
            createModel(0, "BMW 4 Series F33", 60, 5, 1, 1, 0, 0, [CS[0], CS[1], CS[5]]), createModel(1, "BMW M1", 70, 4, 1, 0, 0, 0, [CS[0], CS[1], CS[5]]),
            createModel(2, "BMW 4 Series Gran Coupe F36", 70, 4, 1, 0, 0, 0, [CS[0], CS[1], CS[5]]), createModel(3, "BMW X2 F39", 55, 5, 1, 0, 1, 0, [CS[0], CS[1], CS[5]])
        ], [
            createModel(0, "Daewoo Lanos 1.4  (KLAT)", 30, 3, 0, 0, 0, 0, [CS[9], CS[6], CS[5]])
        ], [
            createModel(0, "Kia Sorento New FL 2.2D АT", 40, 4, 1, 0, 0, 1, [CS[3], CS[4], CS[5]])]
    ,[
        // createModel(0,,,,,,,[]), createModel(1,,,,,,,[]),
        // createModel(2,,,,,,,[]), createModel(3,,,,,,,[])
    ],[
        // createModel(0,,,,,,,[]), createModel(1,,,,,,,[]),
        // createModel(2,,,,,,,[]), createModel(3,,,,,,,[])
    ],[
        // createModel(0,,,,,,,[]), createModel(1,,,,,,,[]),
        // createModel(2,,,,,,,[]), createModel(3,,,,,,,[])
    ],[
        // createModel(0,,,,,,,[]), createModel(1,,,,,,,[]),
        // createModel(2,,,,,,,[]), createModel(3,,,,,,,[])
    ],[
        // createModel(0,,,,,,,[]), createModel(1,,,,,,,[]),
        // createModel(2,,,,,,,[]), createModel(3,,,,,,,[])
    ]
    ];
}

function createBrand(id, title){
    let obj = document.createElement("option");
    obj.value = id;
    obj.text = title;
    obj.imagePath = title + ".png";
    return obj;
}
function createModel(id, title, startPrice, kilometerPrice, conditioner, cabriolet, trapdoor, seats, color){
    let obj = document.createElement("option");
    obj.value = id;
    obj.text = title;
    obj.startPrice = startPrice;
    obj.kilometerPrice = kilometerPrice;
    obj.conditioner = conditioner;
    obj.cabriolet = cabriolet;
    obj.color = color;
    obj.trapdoor = trapdoor;
    obj.seats = seats;
    return obj;
}
function createColor(title){
    let obj = document.createElement("option");
    obj.text = title;
    return obj;
}
// [
//     createModel(,,,,,[]), createModel(,,,,,[]), createModel(,,,,,[]), createModel(,,,,,[])
// ]