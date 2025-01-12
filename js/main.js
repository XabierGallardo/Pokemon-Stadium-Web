// Using absolute paths due to CORS policy & local files security policies on a client JS app with no server
fetch('http://localhost:8080/Pokemon-Stadium-Web/public/pokemons.json')


    .then(response => {
        if (!response.ok) {
            throw new Error("Error on local JSON connection");
        }
        return response.json();
    })


    // Once got JSON data, game starts
    .then(data => { 
        

        //////////////////////////////
        //  MAPPING CONTROLS       //

        let screenData = document.getElementById("screen-data");
        let screenImg = document.getElementById("screen-img");

        let u_button = document.getElementById("u-button");
        let d_button = document.getElementById("d-button");
        let l_button = document.getElementById("l-button");
        let r_button = document.getElementById("r-button");

        let select_button = document.getElementById("select-button");
        let start_button = document.getElementById("start-button");

        let movesMap = [];



        /////////////////////////////
        // GAMEBOY COLOR PALETTES //
        
        // Mapping css elements to assign them new color styles
        const shell = document.querySelector(".shell");
        const logo = document.querySelector(".controls-logo");
        const dpad = document.querySelectorAll(".dpad-button p");
        const abButton = document.querySelectorAll(".ab-button");
        const startSelect = document.querySelectorAll(".start-select");
        
        // Array of objects with 3 color palettes
        const palette = [
            {
                name: "whiteGB",
                shellColor: "#e8e5df",
                logoColor: "#6052a4",
                abColor: "#a84673",
                dpadColor: "#6052a4",
                startSelectColor: "#9e9596"
            },
            {
                name: "yellowGB",
                shellColor: "#f9b722",
                logoColor: "#313943",
                abColor: "#313943",
                dpadColor: "#313943",
                startSelectColor: "#313943"
            },
            {
                name: "redGB",
                shellColor: "#ff4132",
                logoColor: "#313943",
                abColor: "#313943",
                dpadColor: "#313943",
                startSelectColor: "#313943"
            }
        ];

        

        ///////////////////////////////
        //  DEFINING CLASS POKEMON  //

        class Pokemon {

            constructor(name, type, moves, evs) {
                this.name = name;
                this.type = type;
                this.moves = moves;
                this.attack = evs['attack'];
                this.defense = evs['defense'];
                this.bars = 20 + this.defense;
            }



            //////////////////////////////////
            //  INTRO & TYPE ADVANTAGES    //

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
            }



            //////////////////////////
            //  BATTLE LOGIC       //

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
                        d. ${pokemon1.moves[3]}<br>
                    `;

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



                        //////////////////////////////
                        // POKEMON 1 ATTACKS FIRST //

                        if (attackOrder % 2 === 0) { 

                            // If it has a type advantage, our pokemon1 has super effective attacks! +10
                            if (hasTypeAdvantage(pokemon1, pokemon2)) {
                                pokemon1.attack += 5;
                            }
                                

                            let attackPower1 = pokemon1.attack + (Math.floor(Math.random() * 5) + 1);

                            textAttack1 = `<br>${pokemon1.name} used +${attackPower1} ${selectedAttack}!<br>`;

                            console.log(`${pokemon1.name} used ${selectedAttack}! Attack: ${attackPower1}`);
                            
                            printText(textAttack1);

                            pokemon2.bars = pokemon2.bars - attackPower1;

                            // Restoring attack to avoid continuous incrementation
                            if (hasTypeAdvantage(pokemon1, pokemon2)) {
                                pokemon1.attack -= 5;
                            }


                            if (pokemon2.bars < 1) {
                                printVictory();


                            } else {


                                // If has a type disadvantage, pokemon2 has super effective attacks!
                                if (hasTypeAdvantage(pokemon2, pokemon1)) {
                                    pokemon2.attack += 5;
                                }

                                // Pokemon 2 counter attacks
                                let randomAttack2 = Math.floor(Math.random() * 4);

                                let attackPower2 = pokemon2.attack + (Math.floor(Math.random() * 5) + 1);

                                textAttack2 = `<br>${pokemon2.name} used +${attackPower2} ${pokemon2.moves[randomAttack2]}!<br>`;

                                console.log(`${pokemon2.name} used ${pokemon2.moves[randomAttack2]}! Attack: ${attackPower2}`);
                                
                                printText(textAttack2);

                                pokemon1.bars = pokemon1.bars - attackPower2;

                                if (hasTypeAdvantage(pokemon2, pokemon1)) {
                                    pokemon2.attack -= 5;
                                }


                                if (pokemon1.bars > 0) {
                                    printContinue();
                                } else {
                                    printGameOver();
                                }

                            }



                        //////////////////////////////
                        // POKEMON 2 ATTACKS FIRST //
                        } else {
    
                            if (hasTypeAdvantage(pokemon2, pokemon1)) {
                                pokemon2.attack += 5;
                            }

                            let randomAttack2 = Math.floor(Math.random() * 4);

                            let attackPower2 = pokemon2.attack + (Math.floor(Math.random() * 5) + 1);
                            
                            textAttack2 = `<br>${pokemon2.name} used +${attackPower2} ${pokemon2.moves[randomAttack2]}!<br>`;

                            console.log(`${pokemon2.name} used ${pokemon2.moves[randomAttack2]}! Attack: ${attackPower2}`);
                            
                            printText(textAttack2);

                            pokemon1.bars = pokemon1.bars - attackPower2;

                            if (hasTypeAdvantage(pokemon2, pokemon1)) {
                                pokemon2.attack -= 5;
                            }


                            if (pokemon1.bars < 1) {
                                printGameOver();


                            } else {


                                if (hasTypeAdvantage(pokemon1, pokemon2)) {
                                    pokemon1.attack += 5;
                                }

                                // Pokemon 1 counter attacks
                                let attackPower1 = pokemon1.attack + (Math.floor(Math.random() * 5) + 1);
                                
                                textAttack1 = `<br>${pokemon1.name} used +${attackPower1} ${selectedAttack}!<br>`;

                                console.log(`${pokemon1.name} used ${selectedAttack}! Attack: ${attackPower1}`);
                                
                                printText(textAttack1);

                                pokemon2.bars = pokemon2.bars - attackPower1;

                                if (hasTypeAdvantage(pokemon1, pokemon2)) {
                                    pokemon1.attack -= 5;
                                }

                                if (pokemon2.bars > 0) {
                                    printContinue();
                                } else {
                                    printVictory();
                                }
                            }
                        }




                        ///////////////////////////////////
                        //  PRINTING BATTLE TEXTS       //

                        function printVictory() {
                            let victoryText = `
                                ________________________<br>
                                <br>VICTORY<br>
                                <br>${pokemon1.name} won! Health: ${pokemon1.bars}<br>
                                    <br>${pokemon2.name} fainted! Health: ${pokemon2.bars}<br>
                                <br><em>PRESS START BUTTON TO RESET</em><br>
                            `;

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
                                <br><em>PRESS START BUTTON TO RESET</em><br>
                            `;

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
                                d. ${pokemon1.moves[3]}<br>
                            `;

                            printText(continueFight2);
                        }

                    }


                    // Check if there's a type's advantage situation
                    function hasTypeAdvantage(pokemon1, pokemon2) {
                        if (
                            pokemon1.type === "Grass" && pokemon2.type === "Water" || 
                            pokemon1.type === "Fire" && pokemon2.type === "Grass" || 
                            pokemon1.type === "Water" && pokemon2.type === "Fire"
                        ) {

                            return true;
                        }
                    }


                }, 1000)
            }
        }




        //////////////////////////////////
        //  CREATING POKEMON OBJECTS    //
        
        // Saving random pokemons from our JSON on an array
        const fetchedPokemons = [];
        
        // Initializing new Pokemon objects by destructuring JSON data
        for(const key in data) {

            const {name, type, moves, stats} = data[key];

            const pokemon = new Pokemon(name, type, moves, stats);
            
            fetchedPokemons.push(pokemon);
        }
        
        // Random Pokeballs & Pokemon selection
        let pokemon1 = fetchedPokemons[Math.floor(Math.random() * 9)];
        let pokemon2 = fetchedPokemons[Math.floor(Math.random() * 9)];
        
        pokemon1.startGame(pokemon2);
        pokemon1.continueBattle(pokemon2);




        //////////////////////////////
        //  SCREEN & CONTROLLERS    //

        u_button.addEventListener("click", function () {
            // Disable attack buttons when a pokemon fainted
            if(pokemon1.bars > 0 && pokemon2.bars > 0) {
                movesMap.push('u');
                pokemon1.continueBattle(pokemon2);
            } 
        });

        d_button.addEventListener("click", function () {
            if(pokemon1.bars > 0 && pokemon2.bars > 0) {
                movesMap.push('d');
                pokemon1.continueBattle(pokemon2);
            }
        });

        l_button.addEventListener("click", function () {
            if(pokemon1.bars > 0 && pokemon2.bars > 0) {
                movesMap.push('l');
                pokemon1.continueBattle(pokemon2);
            }
        });

        r_button.addEventListener("click", function () {
            if(pokemon1.bars > 0 && pokemon2.bars > 0) {
                movesMap.push('r');
                pokemon1.continueBattle(pokemon2);
            }
        });


        
        function printText(text) {
            let parser = new DOMParser();
            let html = parser.parseFromString(text, 'text/html');
            let body = html.body.innerHTML;
            screenData.innerHTML += body;
            
            // When adding text, navigate to bottom
            screenData.scrollIntoView(false);
        }

        

        // Dynamically adding pokemon names onto pokemondb.net url to fetch images
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

        start_button.addEventListener("click", function(){
                location.reload()
        });

        


        ////////////////////////////////
        //  GAMEBOY COLOR SELECTOR    //

        let counter;

        // Get number according to theme's color position to preserve the color's order
        if(localStorage.getItem("gameboyColor")) {

            let savedColor = localStorage.getItem("gameboyColor");

            switch(savedColor) {
                case "whiteGB":
                    counter = 0;
                    break;

                case "yellowGB":
                    counter = 1;
                    break;

                case "redGB":
                    counter = 2;
                    break;
            }
        }


        select_button.addEventListener("click", function() {

            // Counter to allow navigation between 3 color themes
            counter++;

            if(counter > 2) {
                counter = 0;
            }

            let randomColor = palette[counter];

            switch(randomColor.name) {

                case "whiteGB":
                    setGameboyColor("whiteGB");
                    localStorage.setItem("gameboyColor", "whiteGB");
                break;

                case "yellowGB":
                    setGameboyColor("yellowGB");
                    localStorage.setItem("gameboyColor", "yellowGB");
                break;

                case "redGB":
                    setGameboyColor("redGB")
                    localStorage.setItem("gameboyColor", "redGB");
                break;
            }
        });



        // Assign CSS styles to gameboy 
        function setGameboyColor (estilo) {
        
            let color = palette.find(obj => obj.name === estilo)
            
            shell.style.backgroundColor = color.shellColor;

            logo.style.color = color.logoColor;

            abButton.forEach(element => {
                element.style.backgroundColor = color.abColor;
            });
            
            dpad.forEach(element => {
                element.style.color = color.dpadColor;
            });

            startSelect.forEach(element => {
                element.style.backgroundColor = color.startSelectColor;
            });
            
        }

        

        // Restore gameboy color from localStorage
        if(localStorage.getItem("gameboyColor")) {

            let savedColor = localStorage.getItem("gameboyColor");

            switch(savedColor) {
                case "whiteGB":
                    setGameboyColor("whiteGB");
                    break;

                case "yellowGB":
                    setGameboyColor("yellowGB");
                    break;

                case "redGB":
                    setGameboyColor("redGB");
                    break;
            }
            
        }

    })


    
.catch(error => {
    console.log("Error on local JSON: ", error);
});