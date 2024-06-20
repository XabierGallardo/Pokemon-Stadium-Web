//////////////////////////////
//  SCREEN & CONTROLLERS    //

let screenData = document.getElementById("screen-data");

let a_button = document.getElementById("a-button");
let b_button = document.getElementById("b-button");

a_button.addEventListener("click", addSample, false);
b_button.addEventListener("click", removeText);

function addText(text){
    for(let i = 0; i < text.length; i++) {    
        setTimeout(function() {
            screenData.innerHTML += text[i];

            // When adding text, navigate to bottom
            screenData.scrollIntoView(false);
        }, 100);
    }
    screenData.innerHTML += "<br>";
}

function removeText() {
    let noText = "";
    screenData.innerHTML = noText;
}

function addSample() {
    let test = "_____POKEMON BATTLE_____";
    addText(test);
}


//////////////////////////////
//  STARTING THE GAME       //

//class Pokemon(name, type, moves, EVs, health)

/*  _____POKEMON BATTLE_____
    Pokemon 1 info
    VS
    Pokemon 2 info
*/