//////////////////////////////
//  MAPPING CONTROLS        //

let screenData = document.getElementById("screen-data");

let u_button = document.getElementById("u-button");
let d_button = document.getElementById("d-button");
let l_button = document.getElementById("l-button");
let r_button = document.getElementById("r-button");


let start_button = document.getElementById("start-button");
start_button.addEventListener("click", function() {
    location.reload()
})

let movesMap = [];




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
        this.bars = 20 + this.defense;
    }


    startGame() {
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
            ________________________<br>
        `;

        printText(introText);
    }


    continueBattle() {

        setTimeout(function() {

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
            
            if(movesMap.length > 0) {

                let textAttack1 = '';
                let textAttack2 = '';
                let selectedAttack = '';
                let lastMove = movesMap[movesMap.length - 1];
                
                console.log(lastMove);
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

                // Pokemon 1 attacks
                let attackPower1 = pokemon1.attack * (Math.floor(Math.random() * 2) +1 );
                textAttack1 = `<br>${pokemon1.name} used ${selectedAttack}!<br>`;
                printText(textAttack1);

                pokemon2.bars = pokemon2.bars - attackPower1;

                // Pokemon 2 attacks
                let randomAttack2 = Math.floor(Math.random() * 4); 
                let attackPower2 = pokemon1.attack * (Math.floor(Math.random() * 2) +1 );
                textAttack2 = `<br>${pokemon2.name} used ${pokemon2.moves[randomAttack2]}!<br>`;
                printText(textAttack2);
                
                pokemon1.bars = pokemon1.bars - attackPower2;


                // Health check
                if(pokemon1.bars <= 0 || pokemon2.bars <= 0) {
                    printText("<br>GAME OVER<br>");

                    if(pokemon1.bars > 0) {
                        let victory1 = `
                            ________________________<br>
                            <br>VICTORY<br>
                            <br>Your ${pokemon1.name} won!
                            <em>PRESS START BUTTON TO CREATE ANOTHER BATTLE</em>
                        `;

                        printText(victory1);

                    } else {

                        let victory2 = `
                            ________________________<br>
                            <br>VICTORY<br>
                            <br>Oponent's ${pokemon2.name} won!<br>
                            <em>PRESS START BUTTON TO CREATE ANOTHER BATTLE</em>
                        `;

                        printText(victory2);
                    }
                    
                } else {

                    let continueFight2 = `
                        ________________________<br>
                        <br>${pokemon1.name} Health: ${pokemon1.bars}<br>
                        <br>${pokemon2.name} Health: ${pokemon2.bars}<br>
                        ________________________<br>
            
                        <br>Go! ${pokemon1.name}!<br>
                        u. ${pokemon1.moves[0]}<br>
                        l. ${pokemon1.moves[1]}<br>
                        r. ${pokemon1.moves[2]}<br>
                        d. ${pokemon1.moves[3]}<br>
                `;
                printText(continueFight2);
                }
            }
        }, 1000)
    }
}




//////////////////////////////////
//  CREATING POKEMON OBJECTS    //

const bulbasaur = new Pokemon("Bulbasaur", "Plant", ["Vine Wip","Leech Seed","Tackle","Body Slam"], {"attack" : 5, "defense": 5});
const squirtle = new Pokemon("Squirtle", "Water", ["Bubble","Water Gun","Bite","Tackle"], {"attack" : 4, "defense": 6});
const charmander = new Pokemon("Charmander", "Fire", ["Ember","Fire Fang","Tackle","Scratch"], {"attack" : 6, "defense": 4});

const ivysaur = new Pokemon("Ivysaur", "Plant", ["Vine Wip","Cut","Razor Leaf","Poison Powder"], {"attack" : 8, "defense": 8});
const wartortle = new Pokemon("Wartortle", "Water", ["Water Gun","Mega Punch","Bubblebeam","Skull Bash"], {"attack" : 6, "defense": 10});
const charmeleon = new Pokemon("Charmeleon", "Fire", ["Flamethrower","Dig","Fire Blast","Slash"], {"attack" : 10, "defense": 6});

const venusaur = new Pokemon("Venusaur", "Plant", ["Solar Beam","Earthquake","Razor Leaf","Hyper Beam"], {"attack" : 10, "defense": 10});
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
