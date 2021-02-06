// Drops down tab to allow user to add a player and initiative
// Adds new player to existing players in sorted order
// Adds new player to options for casting a new spell

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('#new-init').value = "test";
    document.querySelector('#add-player').onclick = showPlayer;
    document.querySelector('#player-add').onclick = newPlayer;
    document.querySelector('#new-name').addEventListener('input', checkValues);
    document.querySelector('#new-init').addEventListener('input', checkValues)
});

function checkValues() {
    let name = checkNameValue();
    let init = checkInitValue();

    if (name === true && init === true) {
        document.querySelector('#player-add').disabled = false;
    } else {
        document.querySelector('#player-add').disabled = true;
    }
}

function checkNameValue() {
    let name = document.querySelector('#new-name').value;
    console.log(name);
    console.log(name.length);

    let name_test = true;

    //Ensure that user is inputting a legit name
    if (name.length > 64) {
        name_test = false;
        document.querySelector('#too-long').style.display = 'block';
    } else {
        document.querySelector('#too-long').style.display = 'none';
    }

    //For no input
    if (name.length === 0) {
        name_test = false;
    }

    return name_test;
}

function checkInitValue() {
    //Ensure that the user initiative is an int between -5 and 999
    let init = document.querySelector('#new-init').value;
    console.log(`before: ${init}`);
    init_type = Number(init);
    console.log(init_type);
    console.log(typeof init_type);

    let init_test = true;

    if (Number.isInteger(init_type) === false) {
        init_test = false;
        document.querySelector('#non-int').style.display = 'block';
    } else {
        document.querySelector('#non-int').style.display = 'none';
    }

    if (init_type > -6 && init_type < 1000) {
        document.querySelector('#init-range').style.display = 'none';
    } else {
        init_test = false;
        document.querySelector('#init-range').style.display = 'block';
    }

    //If no input for initiative
    if (init === "") {
        init_test = false;
    }

    return init_test;
}


function showPlayer() {
    //Show the drop down
    let current = document.querySelector('#add');
    
    if (current.style.display == 'block') {
       current.style.display = 'none'
    } else {
       current.style.display = 'block'
    };
};

function newPlayer(){
    //Get new player information
    let player_name = document.querySelector('#new-name').value;
    let player_init = document.querySelector('#new-init').value;

    //Get list of existing characters
    all_players = document.querySelectorAll('.player_list');
    all_players = Array.from(all_players);

    //Create new div and append to end of list
    let new_player = document.createElement('li');
    new_player.value = player_init;
    new_player.id = player_name;
    new_player.classList.add("player_list");

    let player_text = document.createElement('div');
    player_text.classList.add('player');

    let player_textNode = document.createTextNode(`${player_name} - Init: ${player_init}`);
 
    player_text.appendChild(player_textNode);
    new_player.appendChild(player_text);

    //Create kill button and append to new player element
    let kill = document.createElement('input');
    kill.type = 'submit';
    kill.name = 'dead';
    kill.value = 'kill';
    kill.classList.add('kill_button');
    kill.onclick = removePlayer;
    new_player.appendChild(kill);

    //Add new player to player list and sort
    all_players.push(new_player);
    all_players.sort((a,b) => b.value - a.value);

    //Clear current list (before rebuilding)
    let player_list = document.querySelector('.current-players');
    player_list.innerHTML = '';
    document.querySelector('#new-name').value = '';
    document.querySelector('#new-init').value = '';
    document.querySelector('#player-add').disabled = true;

    //Create new list of players
    let i;
    for (i = 0; i < all_players.length; i++) {
        player_list.appendChild(all_players[i]);
    };

    if (all_players.length == 0) {
        player_list.innerHTML = "No Players Yet!";
    };

    //Add new player as option to cast a spell
    let caster = document.createElement('option');
    caster.value = player_name;
    caster.id = `cast-${player_name}`;
    caster.innerHTML = `${player_name}`;
    document.querySelector('#spell-cast').appendChild(caster);

};

function removePlayer(){
    this.parentNode.parentNode.removeChild(this.parentNode);

    //Remove from caster options
    let kill_name = this.parentNode.id;
    let kill_spell = document.querySelector(`#cast-${kill_name}`);
    kill_spell.parentNode.removeChild(kill_spell);

    //Remove any spells cast by dead player
    let dead_spells = document.querySelectorAll(`.spell-${kill_name}`);
    //console.log(`Killed ${kill_name}`);
    //console.log(dead_spells);

    let i;
    for (i = 0; i < dead_spells.length; i++) {
        let spell = dead_spells[i];
        spell.parentNode.removeChild(spell);
    };

    //If no players left, don't leave blank
    all_players = document.querySelectorAll('.player_list');
    if (all_players.length == 0) {
        document.querySelector('.current-players').innerHTML = "No players yet";
    };
};