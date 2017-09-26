//Implementation of A* for algorithm using pseudocode on https://en.wikipedia.org/wiki/A*_search_algorithm

//A* function. Takes startState as the initial gearball position and correctBall is defined above
function aStar(startState){

    //openList is the "fringe" of the tree. These gearballs have not been expanded upon yet
    var openList = [startState];
    //var visitedList = [];

    //defined the state a correct gearballs gears and blocks
    var correctBlocks = "yyyyyyyyybbbbbbbbbrrrrrrrrrgggggggggoooooooooppppppppp";
    var correctGears = [["purpleyellow.png",0,0],["blueyellow.png",0,0],["yellowgreen.png",0,0],["yellowred.png",0,0],["bluered.png",0,0],["redgreen.png",0,0],["redorange.png",0,0],["blueorange.png",0,0],["orangegreen.png",0,0],["orangepurple.png",0,0],["bluepurple.png",0,0],["purplegreen.png",0,0]];

    //this is the current gearball being examined
    var current;

    //The number of nodes that have been expanded
    var expandCounter = 0;

    //while there are gears to be expanded
    while(openList != []){

        //set the gear with the lowest f value to be expanded
        current = getLowestF(openList);
        console.log(openList.length);

        //check if the blocks and gears of the current gearball match the goal
        if(current.blocks == correctBlocks && compareGearArray(current.gears, correctGears)){

            startState.loadGearball();
            //returns the path
            return reconstructPath(current, expandCounter);
        }

        //checks to find where in open list the 
        for(i = 0; i < openList.length; i++){

            if(current.isEqual(openList[i])){

                removeValue = i;
                break;
            }
        }

        openList.splice(removeValue, 1);
        //visitedList.push(current);

        //initialize all of the children of the current node
        current.expand();
        expandCounter++;

        var neighbors = [current.upA, current.downA, current.leftB, current.rightB, current.leftC, current.rightC];

        for(j = 0; j < neighbors.length; j++){

            if(neighbors[j] != undefined){

                openList.push(neighbors[j]);
            }
        }
    }
}

//Takes the current node which we know is a solution because this function was called
//Returns an array of moves done from last to first, with the 
function reconstructPath(current, counter){
    var returnArray = [];

    while(current.prevMove != undefined){

        returnArray.push(current.prevMove);
        current = current.parent;
    }

    returnArray.push(counter);
    return returnArray;
}

//this goes through the given array and returns the an element with the lowest f value
function getLowestF(array){

    var returnValue = array[0];
    var current;
    for(i = 0; i < array.length; i++){

        current = array[i];
        
        if(current.f <= returnValue.f){

            returnValue = current;
        }
    }

    return returnValue;
}

//compares the array of arrays that is are the gears of a gearball
function compareGearArray(gearArray1, gearArray2){

    for(i = 0; i < gearArray1.length; i++){
    
        if(gearArray1[i][0] != gearArray2[i][0]){

            return false;
        }
        else if(gearArray1[i][1] != gearArray2[i][1]){
            
            return false;
        }
        else if(gearArray1[i][2] != gearArray2[i][2]){
            
            return false;
        }
    }

    return true;
}

//takes a stack where the top number is the amount of nodes that were expanded
//the next of the numbers in the stack correspond to different moves that need to be done to get to the solved state
function createSolutionDisplay(moveStack){

    var numberOfExpands = moveStack.pop();
    var solutionText = "Solution:\n";
    var nextMove;
    var moveCounter = 1;
 
    solutionText += "Number of nodes expanded: " + numberOfExpands + "\n";
    while(moveStack.length > 0){

        nextMove = moveStack.pop();
        solutionText += moveCounter + ". ";

        if(nextMove == 0){
            solutionText += "Turn A Up.\n";
        }   
        else if(nextMove == 1){
            solutionText += "Turn A Down.\n";
        }   
        else if(nextMove == 2){
            solutionText += "Turn B Left.\n";
        }
        else if(nextMove == 3){
            solutionText += "Turn B Right.\n";
        }
        else if(nextMove == 4){
            solutionText += "Turn C Left.\n";
        }
        else if(nextMove == 5){
            solutionText += "Turn C Right.\n";
        }
        
        moveCounter++;
    }

    document.getElementById("solution").innerHTML = solutionText;
}