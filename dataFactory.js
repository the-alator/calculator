brandsList = [createBrand(0, "BMW"),createBrand(1, "BMW"),createBrand(1, "BMW"),createBrand(1, "BMW"),
                    createBrand(1, "BMW"),createBrand(1, "BMW"),createBrand(1, "BMW"),createBrand(1, "BMW"),];
modelsList = [
    [
        createModel(0,,,,,[]), createModel(1,,,,,[]), createModel(2,,,,,[]), createModel(3,,,,,[])
    ],[
        createModel(0,,,,,[]), createModel(1,,,,,[]), createModel(2,,,,,[]), createModel(3,,,,,[])
    ],[
        createModel(0,,,,,[]), createModel(1,,,,,[]), createModel(2,,,,,[]), createModel(3,,,,,[])
    ],[
        createModel(0,,,,,[]), createModel(1,,,,,[]), createModel(2,,,,,[]), createModel(3,,,,,[])
    ],[
        createModel(0,,,,,[]), createModel(1,,,,,[]), createModel(2,,,,,[]), createModel(3,,,,,[])
    ],[
        createModel(0,,,,,[]), createModel(1,,,,,[]), createModel(2,,,,,[]), createModel(3,,,,,[])
    ],[
        createModel(0,,,,,[]), createModel(1,,,,,[]), createModel(2,,,,,[]), createModel(3,,,,,[])
    ],[
        createModel(0,,,,,[]), createModel(1,,,,,[]), createModel(2,,,,,[]), createModel(3,,,,,[])
    ]
];

const colors = ["yellow","red","blue","green","black","white","brown","pink","grey","silver"];
function createBrand(id, title){
    let obj = document.createElement("option");
    obj.value = id;
    obj.innerHTML = title;
    obj.imagePath = title + ".png";
    return obj;
}
function createModel(id, title, startPrice, kilometerPrice, conditioner, cabriolet,color){
    let obj = document.createElement("option");
    obj.value = id;
    obj.innerHTML = title;
    obj.startPrice = startPrice;
    obj.kilometerPrice = kilometerPrice;
    obj.conditioner = conditioner;
    obj.cabriolet = cabriolet;
    obj.color = color;
    return obj;
}

// [
//     createModel(,,,,,[]), createModel(,,,,,[]), createModel(,,,,,[]), createModel(,,,,,[])
// ]