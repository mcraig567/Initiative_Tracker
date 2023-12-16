// On push "End Turn" button, switch the active player down to next
// Remove time from all spells
// Remove any expired spells
// At end of all players turns (and start of battle), saves players and spells as cookies

let turn = -1 // Keeps track of who's turn it is, set -1 so first turn is player 0

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('#end_turn').onclick = endTurn;
    document.querySelector('#end_battle').onclick = endBattle;

    //Check for cookies on page load
    if(localStorage.getItem('spells')) {
        let spells = localStorage.getItem('spells');
        console.log("Loading existing spells");
        jsonToSpell(spells);
    };

    if (localStorage.getItem('turn')) {
        turn = localStorage.getItem('turn');
    };
    
    if (localStorage.getItem('players')) {
        let players = localStorage.getItem('players');
        console.log("Loading existing players");
        jsonToPlayer(players);
    };
});

function endTurn() {
    console.log('Next Turn')

    if (document.querySelector('#end_turn').innerHTML === "Start Battle") {
        document.querySelector('#end_turn').innerHTML = "End Turn";
    };

    //Get list of all players
    let players = document.querySelectorAll('.player_list');
    players = Array.from(players);

    //Reset turns when end of players
    if (players.length == 0) {
        console.log("Why are you clicking start now? Add players instead");

    } else if (turn >= players.length - 1) {
        turn = 0;

        //All players have gone (in 6 seconds), so reduce all spells by 6 seconds
        //Get list of all remaining spell durations (li elements)
        let spell_times = document.querySelectorAll('.time');
        //console.log(spell_times)

        let i;
        //Iterate through spells, decreasing time by 6 seconds, and removing if time is below 0
        for (i = 0; i < spell_times.length; i++) {
            let time = spell_times[i].value;
            time -= 6;

            if (time <= 0) {
                //Create text to be added to expired spell toast and add to toast div
                let spellName = spell_times[i].parentNode.parentNode.childNodes[0].innerHTML;
                console.log(`Removing Spell ${spellName}`);

                let caster = spell_times[i].parentNode.childNodes[1].dataset.value;
                console.log(`Caster ${caster}`);

                let new_div = document.createElement('div');
                new_div.innerHTML = `${spellName} (${caster}) has expired`;

                document.querySelector('#toast').appendChild(new_div);

                //Remove spell from page
                spell_times[i].parentNode.parentNode.parentNode.removeChild(spell_times[i].parentNode.parentNode);

            } else {
                spell_times[i].value = time;
                spell_times[i].parentNode.parentNode.dataset.value = time;
                spell_times[i].innerHTML = `Remaining Time: ${spell_times[i].value}s`;
            };    
        };

        //Only show toast if spells have expired
        if (document.querySelector('#toast').innerHTML != "") {
            showToast();
        }

    } else {
        turn ++
    };

    //Clear old player list and make again
    let player_list = document.querySelector('.current-players');
    player_list.innerHTML = "";

    //Add bold font when players turn
    for (i = 0; i < players.length; i++) {
        if (i == turn) {
            players[i].classList.add('active');
        } else {
            players[i].classList.remove('active');
        };

        player_list.appendChild(players[i]);
    };

    //Save turn data to local storage
    let spells = spellToJSON();

    //Dont save chars as a blank array if empty, instead as None
    let chars;
    if (players.length > 0) {
        chars = playerToJSON();
    } else {
        chars = "";
        player_list.innerHTML = "No players yet";
    };

    localStorage.setItem("spells", spells);
    localStorage.setItem("players", chars);
    localStorage.setItem("turn", turn);
};

function endBattle() {
    console.log('Ending Battle')
    
    //Reset everything to blank
    document.querySelector('#all-spells').innerHTML = "";
    document.querySelector('.current-players').innerHTML = "No players yet";
    turn = -1;
    document.querySelector('#end_turn').innerHTML = "Start Battle";
    localStorage.setItem("spells", "");
    localStorage.setItem("players", "");
    localStorage.setItem("turn", "");
    
};

function showToast() {
    //Show any spells that expired on the last turn
    console.log("Showing Toast")
    let x = document.querySelector('#toast');
    x.className = "show";
    setTimeout(function() {
        x.className = x.className.replace("show", "");
        x.innerHTML = "";
    }, 3000);
}

function playerToJSON() {
    //Create an array of player names & initiatives to save to local storage
    let playerJSONs = [];
    players = document.querySelectorAll('.player_list');
    for (let i = 0; i < players.length; i++) {
        let name = players[i].id;
        let initiative = players[i].value;
        let play = {
            'name': name,
            'initiative': initiative
        };
        console.log("Adding player JSON to saved array");

        //JSON.stringify(play);
        playerJSONs.push(play);
    };

    playerJSONs = JSON.stringify(playerJSONs);
    return playerJSONs;
}

function jsonToPlayer(players) {
    // Take an array from local storage and turn into HTML
    // Each input in the array should have a name and initiative

    players = JSON.parse(players);
    document.querySelector('#current-players').innerHTML = "";

    for (let i = 0; i < players.length; i++ ) {
        let play = players[i];
        console.log("Creating HTML for new player");

        //Create HTML elements for each player
        let outer = document.createElement('li');
        let kill_button = document.createElement('input');
        let inner = document.createElement('div');

        //Add data to outer <li> element
        outer.classList.add('player_list');
        outer.id = play.name;
        outer.value = play.initiative
        if (i == turn) {
            outer.classList.add('active'); // Bold if player's turn
        };

        //Add data to kill button
        kill_button.type = 'submit';
        kill_button.name = 'dead';
        kill_button.value = 'kill';
        kill_button.classList.add('kill_button')
        kill_button.onclick = removePlayer;

        //Add data to inner <div> element
        inner.classList.add('player');
        inner.innerHTML = `${play.name} - ${play.initiative}`

        outer.appendChild(kill_button);
        outer.appendChild(inner);
        document.querySelector('#current-players').appendChild(outer);

        //Add player to caster list
        let cast = document.createElement('option');
        cast.value = play.name;
        cast.innerHTML = `${play.name}`;
        document.querySelector('#spell-cast').appendChild(cast);
    };
}

function spellToJSON() {
    let spellJSONs = [];
    spells = document.querySelectorAll('.spell_list');

    for (let i = 0; i < spells.length; i++) {
        let caster = spells[i].dataset.caster;
        let time = spells[i].dataset.value;
        let conc = spells[i].dataset.conc;
        let name = spells[i].firstChild.innerHTML;

        let spell = {
            "caster": caster,
            "time": time,
            "conc": conc,
            "name": name
        };

        spellJSONs.push(spell);

    };

    spellJSONs = JSON.stringify(spellJSONs);
    return spellJSONs;
}

function jsonToSpell(spells) {
    spells = JSON.parse(spells);

    for (let i = 0; i < spells.length; i++) {
        spell = spells[i];

        //Create HTML elements
        outer = document.createElement('li');
        text = document.createElement('div');
        inner = document.createElement('ul');
        inner_time = document.createElement('li');
        inner_cast = document.createElement('li');
        remove = document.createElement('button');

        //Add data to outer <li> element
        outer.classList.add('spell_list');
        outer.classList.add(`spell-${spell.caster}`);
        outer.setAttribute('data-conc', spell.conc);
        outer.setAttribute('data-value', spell.time);
        outer.setAttribute('data-caster', spell.caster);

        //Add data to text element
        text.innerHTML = `${spell.name}`;

        //Add data to inner list items
        inner_time.value = spell.time;
        inner_time.classList.add('time');
        inner_time.innerHTML = `Remaining Time: ${spell.time}s`;

        inner_cast.setAttribute('data-value', spell.caster);
        inner_cast.innerHTML = `Caster: ${spell.caster}`;

        //Add data to remove button
        remove.classList.add('spell-remove');
        remove.innerHTML = 'Remove';
        remove.onclick = removeSpell;

        //Create full element
        inner.appendChild(inner_time);
        inner.appendChild(inner_cast);

        outer.appendChild(text);
        outer.appendChild(inner);
        outer.appendChild(remove);

        //If Concentration Spell
        if (spell.conc == "true") {
            outer.setAttribute('data-conc', true);
            let conc = document.createElement('li');
            conc.innerHTML = 'Concentration';
            inner.appendChild(conc);
        } else {
            outer.setAttribute('data-conc', false);
        };

        document.querySelector('#all-spells').appendChild(outer);
    };
}
