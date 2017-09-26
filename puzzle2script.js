//This function shifts blocks from a given array to the right
//If a vertical array is given, it is similar to shifting everything down
function shiftRightOrDown(blocks){

    var colors = [];
    for(i = 0; i < blocks.length; i++){

        var block = document.getElementById(blocks[i]);
        colors.push(block.myColor);
    }

    //shift the array to the right by 1
    var temp = colors.pop();
    colors.unshift(temp);

    for(i = 0; i < blocks.length; i++){

        var block = document.getElementById(blocks[i]);
        updateColor(block, colors[i]);
    }
}

//This function shifts blocks from a given array to the left
//If a vertical array is given, it is simlar to shifting everything up
function shiftLeftOrUp(blocks){

    var colors = [];
    for(i = 0; i < blocks.length; i++){
        var block = document.getElementById(blocks[i]);
        colors.push(block.myColor);
    }
    
    //shift the array to the left by 1    
    var temp = colors.shift();
    colors.push(temp);
        
    for(i = 0; i < blocks.length; i++){
        
        var block = document.getElementById(blocks[i]);
        updateColor(block, colors[i]);
    }
}

//This function rotates a face to the right or left
//The second parameter is a string which corresponds to rotating to the "right" or "left"
function rotateFace(blocks, direction){

    var colors = [];
    for(i = 0; i < blocks.length; i++){
        var block = document.getElementById(blocks[i]);
        colors.push(block.myColor);
    }

    
    //If the direction variable is "right" there will be a right rotation
    var newColor;
    if(direction == "right"){

        var rightPairs = [[0,6], [1,3], [2,0], [3,7], [4,4], [5,1], [6,8], [7,5], [8,2]];

        for(i = 0; i < rightPairs.length; i++){
            var block = document.getElementById( blocks[rightPairs[i][0]] );
            newColor = colors[ rightPairs[i][1] ];
            updateColor(block, newColor);
        }
    }


    //Otherwise the rotation will be left
    else{

        var leftPairs = [[0,2], [1,5], [2,8], [3,1], [4,4], [5,7], [6,0], [7,3], [8,6]];
        
        for(i = 0; i < leftPairs.length; i++){
            var block = document.getElementById( blocks[leftPairs[i][0]] );
            newColor = colors[ leftPairs[i][1] ];
            updateColor(block, newColor);
        }
    }
}

//Creates a label with text at the position labelX and labelY
function generateLabel(name,text,labelX,labelY){
                
    var mytext = document.createTextNode(text);
    Label = document.createElement("Label");
    Label.setAttribute('style', "position: absolute; top:" + labelY +"px; left: " + labelX + "px");
    Label.setAttribute('class', 'Label');
    Label.setAttribute('id', name);
    Label.appendChild(mytext);
    document.body.appendChild(Label);
}

//This function takes a block's name and a color and gives the color to the block
function updateColor(block, newColor){

    block.setAttribute('src', newColor);
    block.myColor = newColor;
}

//Creates the block object and places it on the page
function buildBlock(blockName, color, xPosition, yPosition){

    newBlock = document.createElement("img");
    newBlock.setAttribute('src', color);
    newBlock.myColor = color;
    newBlock.setAttribute('style', "position: absolute; top:" + yPosition + "px; left:" + xPosition +"px;");
    newBlock.setAttribute('id', blockName);
    document.body.appendChild(newBlock);
}

//This generates a 3 x 3 block with the top left block being at initialX and initialY location
//The blocks are given names "block"N where N is blockNumber through blockNumber+8
//This function returns faceArray which includes the names of the blocks to be passed into the rotateFace function
function generateFace(blockNumber, initialX, initialY, color){

    var faceArray = [];
    var xPosition = initialX;
    var yPosition = initialY;

    //1st row generation
    for(i = blockNumber; i < blockNumber + 3; i++){
            
        var blockName = "block" + i;
        buildBlock(blockName, color, xPosition, yPosition);
        faceArray.push(blockName);
        xPosition += 50;
    }

    //2nd row generation
    yPosition += 50;
    xPosition = initialX;
    for(i = blockNumber + 3; i < blockNumber + 6; i++){

        var blockName = "block" + i;
        buildBlock(blockName, color, xPosition, yPosition);
        faceArray.push(blockName);
        xPosition += 50;
    }

    //3rd row generation
    yPosition += 50;
    xPosition = initialX;
    for(i = blockNumber + 6; i < blockNumber + 9; i++){

        var blockName = "block" + i;
        buildBlock(blockName, color, xPosition, yPosition);
        faceArray.push(blockName);
        xPosition += 50;
    }

    return faceArray;
}

//This function places a gear and sets its orientation and color
function placeGear(gearColor, xPosition, yPosition, angleOffset, gearName){


    newGear = document.createElement("img");
    newGear.setAttribute("src", gearColor);
    newGear.setAttribute("id", gearName);
    //gear.true is the angle of the gear from a regular perspective
    //it is used to see if a gear is at the right or wrong angle regardless of position
    newGear.true = angleOffset;
    newGear.angle = angleOffset;
    newGear.setAttribute('style', "position: absolute; top:" + yPosition + "px; left:" + xPosition +"px;");
    newGear.myColor = gearColor;
    document.body.appendChild(newGear);
    updateGear(newGear);
}

//gears is an array of gear names and deg is the number of degrees to the right the gear will be turned
function turnGears(gears, deg){

    for(i = 0; i < gears.length; i++){
        gear = document.getElementById(gears[i]);
        gear.angle += deg;
        gear.true += deg;
        gear.true %= 360;
        updateGear(gear);
    }
}

//This updates the gear to match its angle variable.
function updateGear(gear){

    gear.angle %= 360;
    gear.style.WebkitTransform = "rotate(" + gear.angle + "deg)";
}

//This shifts gears to the right around a square and adjusts its angle
function shiftGearsRight(gears){
    
    var colors = [];
    var angles = [];
    var trueAngles = [];
    
    for(i = 0; i < gears.length; i++){
    
        var gear = document.getElementById(gears[i]);
        colors.push(gear.myColor);
        gear.angle += 270;
        angles.push(gear.angle);
        trueAngles.push(gear.true);
    }
    
  
    //shift the array to the right by 1
    var temp = colors.pop();
    colors.unshift(temp);
    temp = angles.pop();
    angles.unshift(temp);
    temp = trueAngles.pop();
    trueAngles.unshift(temp);
    
   
    for(i = 0; i < gears.length; i++){
    
        var gear = document.getElementById(gears[i]);
        gear.angle = angles[i];
        gear.true = trueAngles[i];
        updateColor(gear, colors[i]);
        updateGear(gear);
    }

}

function shiftGearsLeft(gears){
    
    var colors = [];
    var angles = [];
    var trueAngles = [];

    for(i = 0; i < gears.length; i++){
    
        var gear = document.getElementById(gears[i]);
        colors.push(gear.myColor);
        angles.push(gear.angle);
        trueAngles.push(gear.true);
    }
    
    //shift the arrays to the left by 1
    var temp = colors.shift();
    colors.push(temp);
    temp = angles.shift();
    angles.push(temp);
    temp = trueAngles.shift();
    trueAngles.push(temp);
    
    for(i = 0; i < gears.length; i++){
    
        var gear = document.getElementById(gears[i]);
        gear.angle = angles[i];
        gear.angle += 90;
        gear.true = trueAngles[i];
        updateColor(gear, colors[i]);
        updateGear(gear);
    }
}

//This shifts the gears down and passes the angle to the new gears.
function shiftGearsDown(gears){
    
    var colors = [];
    var angles = [];
    var trueAngles = [];
    for(i = 0; i < gears.length; i++){
    
        var gear = document.getElementById(gears[i]);
        colors.push(gear.myColor);
        angles.push(gear.angle);
        trueAngles.push(gear.true);
    }
    
  
    //shift the arrays to the right by 1
    var temp = colors.pop();
    colors.unshift(temp);
    temp = angles.pop();
    angles.unshift(temp);
    temp = trueAngles.pop();
    trueAngles.unshift(temp);
   
    for(i = 0; i < gears.length; i++){
    
        var gear = document.getElementById(gears[i]);
        gear.angle = angles[i];
        gear.true = trueAngles[i];
        updateColor(gear, colors[i]);
        updateGear(gear);
    }

}

function shiftGearsUp(gears){
    
    var colors = [];
    var angles = [];
    var trueAngles = [];
    for(i = 0; i < gears.length; i++){
    
        var gear = document.getElementById(gears[i]);
        colors.push(gear.myColor);
        angles.push(gear.angle);
        trueAngles.push(gear.true);
    }
    
    //shift the array to the left by 1
    var temp = colors.shift();
    colors.push(temp);
    temp = angles.shift();
    angles.push(temp);
    temp = trueAngles.shift();
    trueAngles.push(temp);
    
    for(i = 0; i < gears.length; i++){
    
        var gear = document.getElementById(gears[i]);
        gear.angle = angles[i];
        gear.true = trueAngles[i];
        updateColor(gear, colors[i]);
        updateGear(gear);
    }
}

//This part of the file contains multiple arrays of strings that make up the rows and columns of the gearball
//It also contains the definitions for turning each of the rows and columns
//Each row or column is defined as a set and are passed into the different shifting functions

var set_A = ["block0", "block3", "block6", "block18", "block21", "block24", "block36", "block39", "block42", "block45", "block48", "block51"];
var set_a = ["block2", "block5", "block8", "block20", "block23", "block26", "block38", "block41", "block44", "block47", "block50", "block53"];
var set_B = ["block0", "block1", "block2", "block29", "block32", "block35", "block44", "block43", "block42", "block15", "block12", "block9"];
var set_b = ["block6", "block7", "block8", "block27", "block30", "block33", "block38", "block37", "block36", "block17", "block14", "block11"];
var set_C = ["block9", "block10", "block11", "block18", "block19", "block20", "block27", "block28", "block29", "block53", "block52", "block51"];
var set_c = ["block15", "block16", "block17", "block24", "block25", "block26", "block33", "block34", "block35", "block47", "block46", "block45"];

var yellowGears = ["gear0", "gear1", "gear3", "gear2"];
var middleHorizontal = ["gear4", "gear5", "gear11", "gear10"];
var orangeGears = ["gear6", "gear7", "gear9", "gear8"];

var blueGears = ["gear1", "gear4", "gear7", "gear10"];
var middleVertical = ["gear0", "gear3", "gear6", "gear9"];
var greenGears = ["gear2", "gear5", "gear8", "gear11"];

var redGears = ["gear3", "gear4", "gear6", "gear5"];
var middleCenter = ["gear1", "gear2", "gear8", "gear7"];
var purpleGears = ["gear9", "gear10", "gear0", "gear11"];


//These take the individual shifts that make up any turn and puts them into one function that can be called

function downTurnSetA(){

    //shift right an left need to be called 3 times because each call only shifts each block once
    shiftRightOrDown(set_A);
    shiftRightOrDown(set_A);
    shiftRightOrDown(set_A);
    shiftLeftOrUp(set_a);
    shiftLeftOrUp(set_a);
    shiftLeftOrUp(set_a);

    //This shows which faces are rotating
    rotateFace(blueFace, "right");
    rotateFace(greenFace, "right");

    //Spin the gears that need to be spun
    turnGears(middleVertical, 60);

    shiftGearsDown(blueGears);
    shiftGearsUp(greenGears);

}

function upTurnSetA(){
    
    shiftLeftOrUp(set_A);
    shiftLeftOrUp(set_A);
    shiftLeftOrUp(set_A);
    shiftRightOrDown(set_a);
    shiftRightOrDown(set_a);
    shiftRightOrDown(set_a);
    
    rotateFace(blueFace, "left");
    rotateFace(greenFace, "left");

    turnGears(middleVertical, 300);

    shiftGearsDown(greenGears);
    shiftGearsUp(blueGears);
}

function rightTurnSetB(){

    shiftRightOrDown(set_B);
    shiftRightOrDown(set_B);
    shiftRightOrDown(set_B);
    shiftLeftOrUp(set_b);
    shiftLeftOrUp(set_b);
    shiftLeftOrUp(set_b);

    rotateFace(redFace, "left");
    rotateFace(purpleFace, "right");

    turnGears(middleCenter, 300);

    shiftGearsRight(purpleGears);
    shiftGearsRight(redGears);
}

function leftTurnSetB(){

    shiftLeftOrUp(set_B);
    shiftLeftOrUp(set_B);
    shiftLeftOrUp(set_B);
    shiftRightOrDown(set_b);
    shiftRightOrDown(set_b);
    shiftRightOrDown(set_b);

    rotateFace(redFace, "right");
    rotateFace(purpleFace, "left");

    turnGears(middleCenter, 60);

    shiftGearsLeft(purpleGears);
    shiftGearsLeft(redGears);
}

function rightTurnSetC(){

    shiftRightOrDown(set_C);
    shiftRightOrDown(set_C);
    shiftRightOrDown(set_C);
    shiftLeftOrUp(set_c);
    shiftLeftOrUp(set_c);
    shiftLeftOrUp(set_c);


    rotateFace(yellowFace, "left");
    rotateFace(orangeFace, "left");
    
    turnGears(middleHorizontal, 300);

    shiftGearsRight(orangeGears);
    shiftGearsRight(yellowGears);
}

function leftTurnSetC(){

    shiftLeftOrUp(set_C);
    shiftLeftOrUp(set_C);
    shiftLeftOrUp(set_C);
    shiftRightOrDown(set_c);
    shiftRightOrDown(set_c);
    shiftRightOrDown(set_c);

    rotateFace(yellowFace, "right");
    rotateFace(orangeFace, "right");

    turnGears(middleHorizontal, 60);

    shiftGearsLeft(orangeGears);
    shiftGearsLeft(yellowGears);
}

//Turn the gearball "numberofTurns" times in random directions
//Every turn cannot be the opposite of the previous turn
function randomize(){

    var numberOfTurns = parseInt(document.getElementById("randomizeTextBox").value);
    var lastTurn = 12;
    for(loop = 0; loop < numberOfTurns; loop++){
        var turn = Math.floor((Math.random()*10 +1) % 6);

        if(turn == 0){

            if(lastTurn != 1){
                upTurnSetA();
                lastTurn = 0;
            }
            else{
                loop--;
            }
        }

        else if(turn == 1){
            
            if(lastTurn != 0){
                downTurnSetA();
                lastTurn = 1;
            }
            else{
                loop--;
            }
        }

        else if(turn == 2){
            
            if(lastTurn != 3){
                rightTurnSetB();
                lastTurn = 2;
            }
            else{
                loop--;
            }
        }

        else if(turn == 3){

            if(lastTurn != 2){
                leftTurnSetB();
                lastTurn = 3;
            }
            else{
                loop--;
            }

        }

        else if(turn == 4){

            if(lastTurn != 5){
                rightTurnSetC();
                lastTurn = 4;
            }
            else{
                loop--;
            }
            
        }

        else if(turn == 5){
            
            if(lastTurn != 5){
                rightTurnSetC();
                lastTurn = 5;
            }
            else{
                loop--;
            }
        }

    }
}