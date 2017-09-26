//This file was created to preserve the html file and script file to safetly make changes

//This function goes through the gearball and returns a string of characters representing the color of each block
function getBlockString(){

    var blockName;
    var blockString = "";
    for(i = 0; i < 54 ;i++ ){

        blockName = "block" + i;
        var block = document.getElementById(blockName);
        blockString += block.myColor[0];
    }

    return blockString;
}

function solve(){
    var startBlocks = getBlockString();
    var startGears = getGearArray();
    var rootGearBall = new GearBall(startBlocks, startGears, undefined, undefined);

    var moveList = aStar(rootGearBall);
    //alert("check");
    createSolutionDisplay(moveList);

}

//this gets an array of arrays with the data of each gear to be recreated
function getGearArray(){

    var gearName;
    var gearArray = [];

    for(i = 0; i < 12; i++){

        gearName = "gear" + i;
        var gear = document.getElementById(gearName);

        gearArray.push([gear.myColor, gear.angle, gear.true]);
    }

    return gearArray;
}

//GearBall class
class GearBall {
    
    constructor(blockString, gearArray, prev, dad){


        this.blocks = blockString;
        this.gears = gearArray;
        this.h = this.calculateHeuristic();
        this.prevMove = prev;
        this.parent = dad;
        this.d = 0;

        if(this.parent != undefined){

            this.d = this.parent.d + 1;
        }

        this.f = this.d + this.h;
        
    }

    //Makes this gearball the main one that can be turned
    loadGearball(){

        var blockName;
        var blockString = this.blocks;
        for(i = 0; i < 54; i++){

            blockName = "block" + i;
            var block = document.getElementById(blockName);

            switch(blockString[i]){
                case "y":
                    updateColor(block, "yellow.png");
                    break;
                case "b":
                    updateColor(block, "blue.png");
                    break;
                case "r":
                    updateColor(block, "red.png");
                    break;
                case "g":
                    updateColor(block, "green.png");
                    break;
                case "o":
                    updateColor(block, "orange.png");
                    break;
                case "p":
                    updateColor(block, "purple.png");
                    break;
            }
        }

        var gearName;
        var gearArray = this.gears;
        for(i = 0; i < 12; i++){

            gearName = "gear" + i;
            var gear = document.getElementById(gearName);

            updateColor(gear, gearArray[i][0]);
            gear.angle = gearArray[i][1];
            gear.true = gearArray[i][2];
            updateGear(gear);
        }

        
    }

    //Takes the gears and blocks and calulates the heuristic value for the gearball
    //Currently using:
    //  (Blocks out of place/24) or (gears out of angle/4)
    //Both are floored, and then take the larger of the two
    calculateHeuristic(){

        var correctBlocks = "yyyyyyyyybbbbbbbbbrrrrrrrrrgggggggggoooooooooppppppppp";
        var blockString = this.blocks;
        var blockCounter = 0;
        var blockHeu;

        for(i = 0; i < blockString.length; i++){

            if(correctBlocks[i] != blockString[i]){
                blockCounter++;
            }
        }

        blockHeu = Math.floor(blockCounter/24.0);

        var gearString = this.gears;
        var gearName;
        var gearCounter = 0;
        var gearHeu;

        for(i = 0; i < 12; i++){

            gearName = "gear" + i;
            var gear = document.getElementById(gearName);

            if(gear.true != 0){

                gearCounter++;
            }
        }

        gearHeu = Math.floor(gearCounter/4.0);

        return Math.max(blockHeu, gearHeu);
    }

    //0 = A_Up
    //1 = A_Down
    //2 = B_Left
    //3 = B_Right
    //4 = C_Left
    //5 = C_Right
    expand(){
        
        //need to expand the parent into 5 moves (unless it is the root) 
        //first, we will need to know what the move was that got to this state
        //Then this will make children that are all of the moves that can be done except the opposite of the previous move
        
        var skip;
        if(this.prevMove == 0){
            skip = 1;
        }
        else if(this.prevMove == 1){
            skip = 0;
        }
        else if(this.prevMove == 2){
            skip = 3;
        }
        else if(this.prevMove == 3){
            skip = 2;
        }
        else if(this.prevMove == 4){
            skip = 5;
        }
        else if(this.prevMove == 5){
            skip = 4;
        }

        if(skip != 0 ){

            this.loadGearball();
            upTurnSetA();
            this.upA = new GearBall(getBlockString(), getGearArray(), 0, this);
        }
        if(skip != 1){

            this.loadGearball();
            downTurnSetA();
            this.downA = new GearBall(getBlockString(), getGearArray(), 1, this);
        }
        if(skip != 2){

            this.loadGearball();
            leftTurnSetB();
            this.leftB = new GearBall(getBlockString(), getGearArray(), 2, this);
        }
        if(skip != 3){
                
            this.loadGearball();
            rightTurnSetB();
            this.rightB = new GearBall(getBlockString(), getGearArray(), 3, this);
        }
        if(skip != 4){
                
            this.loadGearball();
            leftTurnSetC();
            this.leftC = new GearBall(getBlockString(), getGearArray(), 4, this);
        }
        if(skip != 5){
                
            this.loadGearball();
            rightTurnSetC();
            this.rightC = new GearBall(getBlockString(), getGearArray(), 5, this);
        }            
        
    }

    //Checks to see if the gear array and the block array are equivalent to the current gear
    isEqual(ball){

        if(this.blocks != ball.blocks || this.gears != ball.gears){

            return false;
        }

        return true;
    }

}