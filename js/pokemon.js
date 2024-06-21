//////////////////////////////
//  SCREEN & CONTROLLERS    //

let screenData = document.getElementById("screen-data");

let a_button = document.getElementById("a-button");
let b_button = document.getElementById("b-button");

a_button.addEventListener("click", addSample, false);
b_button.addEventListener("click", removeText);

let u_button = document.getElementById("u-button");
let d_button = document.getElementById("d-button");
let l_button = document.getElementById("l-button");
let r_button = document.getElementById("r-button");


let start_button = document.getElementById("start-button");
start_button.addEventListener("click", function() {
    location.reload()
})


function printText(text){
    let parser = new DOMParser();
    let html = parser.parseFromString(text, 'text/html');
    let body = html.body.innerHTML; 
    screenData.innerHTML += body;

    // When adding text, navigate to bottom
    screenData.scrollIntoView(false);
    
    //TO DO 1    Delay text avoids recognizing html tags
    /*
    let counter = 0;
    function delayText() {
        if (counter < body.length) {
            screenData.innerHTML += body.charAt(counter);
            counter++;
            
            // When adding text, navigate to bottom
            screenData.scrollIntoView(false);
            
            setTimeout(delayText, 30);
        }   
    }
    delayText();
    */
}


function removeText() {
    let noText = "";
    screenData.innerHTML = noText;
}





//////////////////////////////
//  STARTING THE GAME       //

class Pokemon {
    constructor(name, type, moves, evs, health) {
        this.name = name;
        this.type = type;
        this.moves = moves;
        this.attack = evs['attack'];
        this.defense = evs['defense'];
        this.health = health;
        this.bars = 20;
    }

    fight() {
        let introText = `
            _____POKEMON BATTLE_____
            <br>${pokemon1.name}<br>
            Type: ${pokemon1.type}<br>
            Attack: ${pokemon1.attack}<br>
            Defense: ${pokemon1.defense}<br>
            
            <br>VS<br>

            <br>${pokemon2.name}<br>
            Type: ${pokemon2.type}<br>
            Attack: ${pokemon2.attack}<br>
            Defense: ${pokemon2.defense}<br>
            ________________________
        `;

        printText(introText);

        //TO DO 1    Delay text avoids recognizing html tags
        /*
        screenData.innerHTML += "_____POKEMON BATTLE_____<br>";
        screenData.innerHTML += (pokemon1.name);
        screenData.innerHTML += "<br>VS<br>";
        screenData.innerHTML += (pokemon2.name);
        screenData.innerHTML += "<br>________________________<br>";
        */

        if(pokemon1.bars > 1) {
            let continueFight = `
            
                <br>${pokemon1.name} Health: ${pokemon1.bars}<br>
                <br>${pokemon2.name} Health: ${pokemon2.bars}<br>
                ________________________<br>

                <br>Go! ${pokemon1.name}!<br>
                u. ${pokemon1.moves[0]}<br>
                l. ${pokemon1.moves[1]}<br>
                r. ${pokemon1.moves[2]}<br>
                d. ${pokemon1.moves[3]}<br>
            `;

            printText(continueFight);

        }
    }
}

const venusaur = new Pokemon("Venusaur", "Plant", ["Vine Wip","Razor Leaf","Earthquake","Frenzy Plan"], {"attack" : 8, "defense": 12});
const blastoise = new Pokemon("Blastoise", "Water", ["Water Gun","Bubblebeam","Hydro Pump","Surf"], {"attack" : 10, "defense": 10});
const charizard = new Pokemon("Charizard", "Fire", ["Flamethrower","Fly","Blast Burn","Fire Punch"], {"attack" : 12, "defense": 8});

const pokeballs = [venusaur, blastoise, charizard];



// TESTING///////////////////////////////
let pokemon1 = pokeballs[Math.floor(Math.random() * 3)];
let pokemon2 = pokeballs[Math.floor(Math.random() * 3)];

pokemon1.fight(pokemon2);



function addSample() {
    let test = "_____POKEMON BATTLE_____";
    screenData.innerHTML += "<br>";
    printText(test);
}

console.log(pokemon1);
console.log(pokemon2.name);