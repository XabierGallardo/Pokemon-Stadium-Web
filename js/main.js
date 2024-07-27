fetch('http://localhost:8080/Pokemon-Stadium-Web/js/pokemons.json')
.then(response => {
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json()
})

.then(data => {
    

    //////////////////////////////
    //  MAPPING CONTROLS        //

    let screenData = document.getElementById("screen-data");
    let screenImg = document.getElementById("screen-img");

    let u_button = document.getElementById("u-button");
    let d_button = document.getElementById("d-button");
    let l_button = document.getElementById("l-button");
    let r_button = document.getElementById("r-button");

    let select_button = document.getElementById("select-button");
    let start_button = document.getElementById("start-button");

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
            if (pokemon1.type === "Grass" && pokemon2.type === "Water" || pokemon1.type === "Fire" && pokemon2.type === "Grass" || pokemon1.type === "Water" && pokemon2.type === "Fire") {
                pokemon1.attack += 7;
                pokemon1.defense += 7;

                console.log(pokemon1.type + " is superior than " + pokemon2.type);

                // Same type, nothing changes!
            } else if (pokemon1.type === pokemon2.type) {
                console.log("Both are same type " + pokemon2.type);

                // Oponent's pokemon has super effective attacks! attack + 7
            } else if (pokemon2.type === "Grass" && pokemon1.type === "Water" || pokemon2.type === "Fire" && pokemon1.type === "Grass" || pokemon2.type === "Water" && pokemon1.type === "Fire") {
                pokemon2.attack += 7;
                pokemon2.defense += 7;

                console.log(pokemon1.type + " is inferior than " + pokemon2.type);
            }
        }



        //////////////////////////
        //  BATTLE LOGIC        //
        continueBattle() {

            setTimeout(function () { // Delaying 1 second first battle text

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

                if (movesMap.length > 0) {

                    let textAttack1 = '';
                    let textAttack2 = '';
                    let selectedAttack = '';


                    // Pick last move selected on the array
                    let lastMove = movesMap[movesMap.length - 1];

                    switch (lastMove) {
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

                        let attackPower1 = pokemon1.attack + (Math.floor(Math.random() * 5) + 1);
                        textAttack1 = `<br>${pokemon1.name} used ${selectedAttack}!<br>`;

                        console.log(`${pokemon1.name} used ${selectedAttack}! Attack: ${attackPower1}`);
                        printText(textAttack1);

                        pokemon2.bars = pokemon2.bars - attackPower1;

                        if (pokemon2.bars < 1) {
                            printVictory();

                        } else {

                            // Pokemon 2 counter attacks
                            let randomAttack2 = Math.floor(Math.random() * 4);
                            let attackPower2 = pokemon1.attack + (Math.floor(Math.random() * 5) + 1);
                            textAttack2 = `<br>${pokemon2.name} used ${pokemon2.moves[randomAttack2]}!<br>`;

                            console.log(`${pokemon2.name} used ${pokemon2.moves[randomAttack2]}! Attack: ${attackPower2}`);
                            printText(textAttack2);

                            pokemon1.bars = pokemon1.bars - attackPower2;

                            if (pokemon1.bars > 0) {
                                printContinue();
                            } else {
                                printGameOver();
                            }

                        }


                    } else { // POKEMON 2 ATTACKS FIRST

                        let randomAttack2 = Math.floor(Math.random() * 4);
                        let attackPower2 = pokemon1.attack + (Math.floor(Math.random() * 5) + 1);
                        textAttack2 = `<br>${pokemon2.name} used ${pokemon2.moves[randomAttack2]}!<br>`;

                        console.log(`${pokemon2.name} used ${pokemon2.moves[randomAttack2]}! Attack: ${attackPower2}`);
                        printText(textAttack2);

                        pokemon1.bars = pokemon1.bars - attackPower2;

                        if (pokemon1.bars < 1) {
                            printGameOver();

                        } else {

                            // Pokemon 1 counter attacks
                            let attackPower1 = pokemon1.attack + (Math.floor(Math.random() * 5) + 1);
                            textAttack1 = `<br>${pokemon1.name} used ${selectedAttack}!<br>`;

                            console.log(`${pokemon1.name} used ${selectedAttack}! Attack: ${attackPower1}`);
                            printText(textAttack1);

                            pokemon2.bars = pokemon2.bars - attackPower1;

                            if (pokemon2.bars > 0) {
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
    
    const fetchedPokemons = [];
    
    for(const key in data) {

        const {name, type, moves, stats} = data[key];

        const pokemon = new Pokemon(name, type, moves, stats);
        
        fetchedPokemons.push(pokemon);
    }
    
    // Random Pokeballs & Pokemon selection
    let pokemon1;
    let pokemon2;

    function selectPokemons() {
        screenData.innerHTML = '';
        screenImg.innerHTML = '';

        pokemon1 = fetchedPokemons[Math.floor(Math.random() * 9)];
        pokemon2 = fetchedPokemons[Math.floor(Math.random() * 9)];
    
        pokemon1.startGame(pokemon2);
        pokemon1.continueBattle(pokemon2);
    
    }
    
    selectPokemons();
    
    


    //////////////////////////////
    //  SCREEN & CONTROLLERS    //

    u_button.addEventListener("click", function () {
        movesMap.push('u');
        pokemon1.continueBattle(pokemon2);
    });

    d_button.addEventListener("click", function () {
        movesMap.push('d');
        pokemon1.continueBattle(pokemon2);
    });

    l_button.addEventListener("click", function () {
        movesMap.push('l');
        pokemon1.continueBattle(pokemon2);
    });

    r_button.addEventListener("click", function () {
        movesMap.push('r');
        pokemon1.continueBattle(pokemon2);
    });

    
    function printText(text) {
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




    ////////////////////
    //  RESET GAME    //

    start_button.addEventListener("click", selectPokemons);

    


    ////////////////////////////////
    //  GAMEBOY COLOR SELECTOR    //
    
    let counter = 0;
    select_button.addEventListener("click", function() {
        const shell = document.querySelector(".shell");
        const logo = document.querySelector(".controls-logo");
        const dpad = document.querySelectorAll(".dpad-button p");
        const abButton = document.querySelectorAll(".ab-button");
        const startSelect = document.querySelectorAll(".start-select");

        const palette = ["white", "yellow", "red"];

        
        counter++;
        if(counter > 2) {
            counter = 0;
        }

        let randomColor = palette[counter];
        
        switch(randomColor) {
            case "white":

                shell.style.backgroundColor = "#e8e5df";
        
                logo.style.color = "#6052a4";
          
                abButton.forEach(element => {
                    element.style.backgroundColor = "#a84673"
                });
                
                dpad.forEach(element => {
                    element.style.color = "#6052a4";
                });
        
                startSelect.forEach(element => {
                    element.style.backgroundColor = "#9e9596"
                });

            break;

            case "yellow":

                shell.style.backgroundColor = "#f9b722";
                
                logo.style.color = "#6052a4";
                
                abButton.forEach(element => {
                    element.style.backgroundColor = "#313943"
                });
                
                dpad.forEach(element => {
                    element.style.color = "#6052a4";
                });
        
                startSelect.forEach(element => {
                    element.style.backgroundColor = "#313943"
                });

            break;

            case "red":

                shell.style.backgroundColor = "#ff4132";
                
                logo.style.color = "#313943";
                
                abButton.forEach(element => {
                    element.style.backgroundColor = "#313943"
                });
                
                dpad.forEach(element => {
                    element.style.color = "#313943";
                });
        
                startSelect.forEach(element => {
                    element.style.backgroundColor = "#313943"
                });

            break;
        }



    });


})
.catch(error => {
    console.log("Error loading JSON: ", error);
});
