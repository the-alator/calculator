function PriceView(){
    this.container = document.getElementById("footerRow");
    this.model = 0, this.path = 1, this.time = 2, this.services = 3, this.tips = 4;
    const messages = ["Model`s cost", "Path`s cost", "Time`s cost", "Services` cost", "Tips` cost"];
    const signW = (this.container.offsetWidth * 0.02) | 0;
    const fieldW = (this.container.offsetWidth * 0.15) | 0;
    const startPoint = signW + fieldW;
    this.animationIntId = -1;

    this.resultF = document.getElementById("resultPrice");
    this.resultF.innerText = "0";
    this.resultF.style.display = "none";
    this.resultF.message = "Total price";

    this.fieldsArr = [];
    this.fieldsAmount = 0;

    let signsArr = [];

    for(let i = 0; i < 5; i++){
        let newSign = document.createElement("div");
        if(i === 0)
            newSign.innerText = "=";
        else
            newSign.innerText = "+";
        newSign.classList.add("sign");
        newSign.style.left = (fieldW + startPoint * i) + "px";
        // newSign.style.display = "none";
        signsArr[i] = newSign;
        this.container.appendChild(newSign);
    }

    this.insertField = function(priority, value, message){
        let newField = document.createElement("div");
        newField.priority = priority;
        newField.innerText = value;
        newField.message = message;
        newField.classList.add("partPrice");

        newField.currentPos = this.countLefts(priority - 1);
        newField.currentX = startPoint * (newField.currentPos + 1);
        newField.style.left = newField.currentX + "px";
        newField.getAppropriateX = function(){
            return startPoint * (this.currentPos + 1);
        }
        this.fieldsArr[priority] = newField;
        console.log(this.fieldsArr.length);
        this.changeRights(priority + 1, 1);
        this.container.insertBefore(newField, this.getFirstRighter(priority + 1));
        console.log(this.fieldsArr.length);
        this.animation();
        console.log(this.fieldsArr.length);
        // for(let i = 0; i < this.fieldsArr.length; i++){
        //
        // }
        $(".partPrice").mouseover(function () {
            $(this).popover({title: "Price", content: $(this)[0].message, animation: true, placement:"top"});
            $(this).popover("show")
        });
        $(".partPrice").mouseout(function () {
            $(this).popover('hide');
        });
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
        this.animation();
    }
    this.changeRights = function(from, value){
        for(let i = from; i < this.fieldsArr.length; i++){
            if(this.fieldsArr[i] !== undefined)
                this.fieldsArr[i].currentPos += value;
        }
    }
    this.countLefts = function(from){
        let counter = 0;
        for(let i = from; i >= 0; i--){
            if(this.fieldsArr[i] !== undefined)
                counter++;
        }
        return counter;
    }
    this.animation = function(){
        if(this.animationIntId !== -1) {
            clearInterval(this.animationIntId);
            this.animationIntId = -1;
        }
        console.log(this.fieldsArr.length);
        let animationList = [];
        for(let i = 0; i < this.fieldsArr.length; i++)
            if(this.fieldsArr[i] !== undefined && this.fieldsArr[i].getAppropriateX() !== this.fieldsArr[i].currentX) {
                animationList.push(this.fieldsArr[i]);
            }
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
                console.log("animationList[i].getAppropriateX(); animationList[i].currentX " + animationList[i].getAppropriateX() + " " + animationList[i].currentX);
                if(animationList[i].getAppropriateX() === animationList[i].currentX)
                    animationList.splice(i, 1);
            }
            clearInterval(this.animationIntId);
            this.animationIntId = -1;
        }
    }
    this.changeData = function(value, type){
        if(this.fieldsArr[type] === undefined) {
            this.insertField(type, value, messages[type]);
        }else
            this.fieldsArr[type].innerText = Number.parseInt(this.fieldsArr[type].innerText) + Number.parseInt(value);
        if(this.fieldsArr[type].innerText === "0")
            this.removeField(type);

        this.resultF.innerText = Number.parseInt(this.resultF.innerText) + Number.parseInt(value);
        if(this.resultF.innerText === "0")
            this.resultF.style.display = "none";
        else
            this.resultF.style.display = "block";
    }
}