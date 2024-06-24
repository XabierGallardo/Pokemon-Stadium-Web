//////////////////////////////
//  MAPPING CONTROLS        //

let screenData = document.getElementById("screen-data");
let screenImg = document.getElementById("screen-img");

let u_button = document.getElementById("u-button");
let d_button = document.getElementById("d-button");
let l_button = document.getElementById("l-button");
let r_button = document.getElementById("r-button");


let start_button = document.getElementById("start-button");
start_button.addEventListener("click", function() {
    location.reload()
});


let select_button = document.getElementById("select-button");

let movesMap = [];




///////////////////////////////
//  DEFINING CLASS POKEMON  //

class Pokemon {

    constructor(name, type, moves, evs, health) {
        this.name = name;
        this.type = type;
        this.moves = moves;
        this.attack = evs['attack'];
        this.defense = evs['defense'];
        this.health = health;
        this.bars = 20 + this.defense;
    }



    //////////////////////////////////
    //  INTRO & TYPE ADVANTAGES     //
    startGame() {

        let introText = `
            _____POKEMON BATTLE_____
                <br>${pokemon2.name}<br>
                Type: ${pokemon2.type}<br>
                Attack: ${pokemon2.attack}<br>
                Defense: ${pokemon2.defense}<br>

                <br>VS<br>

                <br>${pokemon1.name}<br>
                Type: ${pokemon1.type}<br>
                Attack: ${pokemon1.attack}<br>
                Defense: ${pokemon1.defense}<br>
                ________________________<br>`;

        printText(introText);
        printImg(pokemon2.name.toLowerCase(), 2);
        printImg(pokemon1.name.toLowerCase(), 1);

    
        // Our pokemon has super effective attacks! attack + 7
        if(pokemon1.type === "Grass" && pokemon2.type === "Water" || pokemon1.type === "Fire" && pokemon2.type === "Grass" || pokemon1.type === "Water" && pokemon2.type === "Fire") {
            pokemon1.attack += 7;
            pokemon1.defense += 7;

            console.log(pokemon1.type + " is superior than " + pokemon2.type);
    
        // Same type, nothing changes!
        } else if(pokemon1.type === pokemon2.type) {
            console.log("Both are same type " + pokemon2.type);
    
        // Oponent's pokemon has super effective attacks! attack + 7
        } else if(pokemon2.type === "Grass" && pokemon1.type === "Water" || pokemon2.type === "Fire" && pokemon1.type === "Grass" || pokemon2.type === "Water" && pokemon1.type === "Fire") {
            pokemon2.attack += 7;
            pokemon2.defense += 7;

            console.log(pokemon1.type + " is inferior than " + pokemon2.type);
        }
    }

    

    //////////////////////////
    //  BATTLE LOGIC        //
    continueBattle() {

        setTimeout(function() { // Delaying 1 second first battle text

            let continueFight = `
                <br>${pokemon1.name} Health: ${pokemon1.bars}<br>
                <br>${pokemon2.name} Health: ${pokemon2.bars}<br>
                ________________________<br>
                <br>Go! ${pokemon1.name}!<br>
                u. ${pokemon1.moves[0]}<br>
                l. ${pokemon1.moves[1]}<br>
                r. ${pokemon1.moves[2]}<br>
                d. ${pokemon1.moves[3]}<br>`;

            printText(continueFight);
            
            if(movesMap.length > 0) {

                let textAttack1 = '';
                let textAttack2 = '';
                let selectedAttack = '';


                // Pick last move selected on the array
                let lastMove = movesMap[movesMap.length - 1];
                
                switch(lastMove) {
                    case "u":
                        selectedAttack = `${pokemon1.moves[0]}`;
                        break;

                    case "l":
                        selectedAttack = `${pokemon1.moves[1]}`;
                        break;

                    case "r":
                        selectedAttack = `${pokemon1.moves[2]}`;
                        break;

                    case "d":
                        selectedAttack = `${pokemon1.moves[3]}`;
                        break;
                }


                // Randomize which pokemon attacks first, from 1 to 10: pokemon1 is even, pokemon 2 is odd
                let attackOrder = Math.floor(Math.random() * 10) + 1;

                if (attackOrder % 2 === 0) { // POKEMON 1 ATTACKS FIRST
                    
                    let attackPower1 = pokemon1.attack + (Math.floor(Math.random() * 5 ) + 1);
                    textAttack1 = `<br>${pokemon1.name} used ${selectedAttack}!<br>`;

                    console.log(`${pokemon1.name} used ${selectedAttack}! Attack: ${attackPower1}`);
                    printText(textAttack1);
    
                    pokemon2.bars = pokemon2.bars - attackPower1;

                    if(pokemon2.bars < 1 ) {
                        printVictory();

                    } else {

                        // Pokemon 2 counter attacks
                        let randomAttack2 = Math.floor(Math.random() * 4); 
                        let attackPower2 = pokemon1.attack + (Math.floor(Math.random() * 5 ) + 1 );
                        textAttack2 = `<br>${pokemon2.name} used ${pokemon2.moves[randomAttack2]}!<br>`;

                        console.log(`${pokemon2.name} used ${pokemon2.moves[randomAttack2]}! Attack: ${attackPower2}`);
                        printText(textAttack2);
                        
                        pokemon1.bars = pokemon1.bars - attackPower2;

                        if(pokemon1.bars > 0) {
                            printContinue();
                        } else {
                            printGameOver();
                        }

                    }


                } else { // POKEMON 2 ATTACKS FIRST

                    let randomAttack2 = Math.floor(Math.random() * 4); 
                    let attackPower2 = pokemon1.attack + (Math.floor(Math.random() * 5 ) + 1 );
                    textAttack2 = `<br>${pokemon2.name} used ${pokemon2.moves[randomAttack2]}!<br>`;

                    console.log(`${pokemon2.name} used ${pokemon2.moves[randomAttack2]}! Attack: ${attackPower2}`);
                    printText(textAttack2);
                    
                    pokemon1.bars = pokemon1.bars - attackPower2;

                    if(pokemon1.bars < 1) {
                        printGameOver();

                    } else {

                        // Pokemon 1 counter attacks
                        let attackPower1 = pokemon1.attack + (Math.floor(Math.random() * 5 ) + 1);
                        textAttack1 = `<br>${pokemon1.name} used ${selectedAttack}!<br>`;

                        console.log(`${pokemon1.name} used ${selectedAttack}! Attack: ${attackPower1}`);
                        printText(textAttack1);
        
                        pokemon2.bars = pokemon2.bars - attackPower1;
    
                        if(pokemon2.bars > 0) {
                            printContinue();
                        } else {
                            printVictory();
                        }
                    }
                }




                //////////////////////////////////
                //  PRINTING BATTLE TEXTS       //
                function printVictory() {
                    let victoryText = `
                        ________________________<br>
                        <br>VICTORY<br>
                        <br>${pokemon1.name} won! Health: ${pokemon1.bars}<br>
                            <br>${pokemon2.name} fainted! Health: ${pokemon2.bars}<br>
                        <br><em>PRESS START BUTTON TO RESET</em><br>`;
                    
                    console.log(pokemon1.name + " won!\n" + "Health " + pokemon1.bars);
                    console.log(pokemon2.name + " fainted!\n" + "Health " + pokemon2.bars);
                    
                    setTimeout(printText(victoryText), 1000);
                }


                function printGameOver() {
                    let gameoverText = `
                            ________________________<br>
                            <br>GAME OVER<br>
                            <br>${pokemon2.name} won! Health: ${pokemon2.bars}<br>
                            <br>${pokemon1.name} fainted! Health: ${pokemon1.bars}<br>
                            <br><em>PRESS START BUTTON TO RESET</em><br>`;
        
                        console.log(pokemon2.name + " won!\n" + "Health " + pokemon2.bars);
                        console.log(pokemon1.name + " fainted!\n" + "Health " + pokemon1.bars);

                        setTimeout(printText(gameoverText), 1000);
                }


                function printContinue() {
                    let continueFight2 = `
                        ________________________<br>
                        <br>${pokemon1.name} Health: ${pokemon1.bars}<br>
                        <br>${pokemon2.name} Health: ${pokemon2.bars}<br>
                        ________________________<br>
            
                        <br>Go! ${pokemon1.name}!<br>
                        u. ${pokemon1.moves[0]}<br>
                        l. ${pokemon1.moves[1]}<br>
                        r. ${pokemon1.moves[2]}<br>
                        d. ${pokemon1.moves[3]}<br>`;

                    printText(continueFight2);
                }


            }


        }, 1000)
    }
}




//////////////////////////////////
//  CREATING POKEMON OBJECTS    //

const bulbasaur = new Pokemon("Bulbasaur", "Grass", ["Vine Wip","Leech Seed","Tackle","Body Slam"], {"attack" : 5, "defense": 5});
const squirtle = new Pokemon("Squirtle", "Water", ["Bubble","Water Gun","Bite","Tackle"], {"attack" : 4, "defense": 6});
const charmander = new Pokemon("Charmander", "Fire", ["Ember","Fire Fang","Tackle","Scratch"], {"attack" : 6, "defense": 4});

const ivysaur = new Pokemon("Ivysaur", "Grass", ["Vine Wip","Cut","Razor Leaf","Poison Powder"], {"attack" : 7, "defense": 7});
const wartortle = new Pokemon("Wartortle", "Water", ["Water Gun","Mega Punch","Bubblebeam","Skull Bash"], {"attack" : 5, "defense": 9});
const charmeleon = new Pokemon("Charmeleon", "Fire", ["Flamethrower","Dig","Fire Blast","Slash"], {"attack" : 9, "defense": 5});

const venusaur = new Pokemon("Venusaur", "Grass", ["Solar Beam","Earthquake","Razor Leaf","Hyper Beam"], {"attack" : 10, "defense": 10});
const blastoise = new Pokemon("Blastoise", "Water", ["Hydro Pump","Earthquake","Ice Beam","Surf"], {"attack" : 8, "defense": 12});
const charizard = new Pokemon("Charizard", "Fire", ["Flamethrower","Fly","Fire Blast","Hyper Beam"], {"attack" : 12, "defense": 8});


// Random Pokeballs & Pokemon selection
const pokeballs = [bulbasaur, squirtle, charmander, ivysaur, wartortle, charmeleon, venusaur, blastoise, charizard];

let pokemon1 = pokeballs[Math.floor(Math.random() * 9)];
let pokemon2 = pokeballs[Math.floor(Math.random() * 9)];

pokemon1.startGame(pokemon2);
pokemon1.continueBattle(pokemon2);




//////////////////////////////
//  SCREEN & CONTROLLERS    //

u_button.addEventListener("click", function() {
    movesMap.push('u');
    pokemon1.continueBattle(pokemon2);
});

d_button.addEventListener("click", function() {
    movesMap.push('d');
    pokemon1.continueBattle(pokemon2);
});

l_button.addEventListener("click", function() {
    movesMap.push('l');
    pokemon1.continueBattle(pokemon2);
});

r_button.addEventListener("click", function() {
    movesMap.push('r');
    pokemon1.continueBattle(pokemon2);
});


function printText(text){
    let parser = new DOMParser();
    let html = parser.parseFromString(text, 'text/html');
    let body = html.body.innerHTML; 
    screenData.innerHTML += body;

    // When adding text, navigate to bottom
    screenData.scrollIntoView(false);
}


function printImg(name, num) {

    // Pokemon 2
    if (num === 2) {
        screenImg.innerHTML += `
            <a href="https://pokemondb.net/pokedex/${name}" target="_blank" id="pokemon2">
                <img class="sprite" src="https://img.pokemondb.net/sprites/yellow/normal/${name}-color.png" alt="${name}">
            </a>`;

    // Pokemon 1
    } else {
        screenImg.innerHTML += `
        <a href="https://pokemondb.net/pokedex/${name}" target="_blank" id="pokemon1">
            <img class="sprite" src="https://img.pokemondb.net/sprites/yellow/back-normal/${name}-color.png" alt="${name}">
        </a>`;
    }
}


function removeText() {
    let noText = "";
    screenData.innerHTML = noText;
}



////////////////////////////////
//  GAMEBOY COLOR SELECTOR    //
/* TO DO Color Selector on SELECT button
.shell
    background: #00727a;    green
    background: #e8e5df;    white
    background: #ff4132;    red
    background: #f9b722;    yellow

.controls-logo
	color: #6052a4;
	color: #313943;

.dpad-button p
    color: #a84673;
	color: #6052a4;
	color: #313943;

.ab-button
	background-color: #a84673;
	background-color: #313943;

.start-select
	border: 3px solid #484848;
	background-color: #9e9596;
	background-color: #313943;
*/