// Drops down tab to allow user to add a player and initiative
// Adds new player to existing players in sorted order
// Adds new player to options for casting a new spell

// New effects are added as new players

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('#add-player').onclick = showPlayer;
	document.querySelector('#add-effect').onclick = showEffect;
    document.querySelector('#player-add').onclick = newPlayer;
	document.querySelector('#effect-add').onclick = newEffect;
    document.querySelectorAll('.player-input').forEach(i => {
        i.addEventListener('input', checkPlayerValues);
    })
	document.querySelectorAll('.effect-input').forEach(i => {
        i.addEventListener('input', checkEffectValues);
    })
});

function checkPlayerValues() {
    //Runs checks on both name and initiative, and allows player addition if both ok
    let name = checkNameValue();
    let init = checkInitValue();

    if (name === true && init === true) {
        document.querySelector('#player-add').disabled = false;
    } else {
        document.querySelector('#player-add').disabled = true;
    }
}

function checkEffectValues() {
    //Runs checks on both name and initiative, and allows player addition if both ok
    let name = checkEffectNameValue();
    let init = checkEffectInitValue();

    if (name === true && init === true) {
        document.querySelector('#effect-add').disabled = false;
    } else {
        document.querySelector('#effect-add').disabled = true;
    }
}

function checkNameValue() {
    //Ensure that user is inputting a legit name
    let name = document.querySelector('#new-name').value;
    let name_test = true; //Switch to false if issues

    //Ensure that user is inputting a legit name
    if (name.length > 40) {
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
    let init_type = Number(init);
    let init_test = true; //Switch to false if issues

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

    //If no input for initiative, need to check non-parsed input
    if (init === "") {
        init_test = false;
    }

    return init_test;
}

function checkEffectNameValue() {
    //Ensure that user is inputting a legit name
    let name = document.querySelector('#new-effect-name').value;
    let name_test = true; //Switch to false if issues

    //Ensure that user is inputting a legit name
    if (name.length > 40) {
        name_test = false;
        document.querySelector('#effect-too-long').style.display = 'block';
    } else {
        document.querySelector('#effect-too-long').style.display = 'none';
    }

    //For no input
    if (name.length === 0) {
        name_test = false;
    }

    return name_test;
}

function checkEffectInitValue() {
    //Ensure that the user initiative is an int between -5 and 999
    let init = document.querySelector('#new-effect-init').value;
    let init_type = Number(init);
    let init_test = true; //Switch to false if issues

    if (Number.isInteger(init_type) === false) {
        init_test = false;
        document.querySelector('#effect-non-int').style.display = 'block';
    } else {
        document.querySelector('#effect-non-int').style.display = 'none';
    }

    if (init_type > -6 && init_type < 1000) {
        document.querySelector('#effect-init-range').style.display = 'none';
    } else {
        init_test = false;
        document.querySelector('#effect-init-range').style.display = 'block';
    }

    //If no input for initiative, need to check non-parsed input
    if (init === "") {
        init_test = false;
    }

    return init_test;
}

function showPlayer() {
    //Show the drop down
	let main_display = document.querySelector('#add-section');
	let add_player_section = document.querySelector('#add');

	let add_spell_section = document.querySelector('#spell');
	let add_effect_section = document.querySelector('#new-effect');
	add_spell_section.style.display = 'none'
	add_effect_section.style.display = 'none'

	// Nothing is showing
	if (main_display.style.display != 'flex') {
		main_display.style.display = 'flex'
		add_player_section.style.display = 'flex'
	
	// Some other add option was open
	} else if (main_display.style.display != 'none' && add_player_section.style.display != 'flex') {
		add_player_section.style.display = 'flex'
	
	// Player add was open, close it all
	} else if (main_display.style.display != 'none') {
		add_player_section.style.display = 'none'
		main_display.style.display = 'none'
	};    
};

function showEffect() {
    //Show the drop down
	let main_display = document.querySelector('#add-section');
	let add_effect_section = document.querySelector('#new-effect');

	let add_spell_section = document.querySelector('#spell');
	let add_player_section = document.querySelector('#add');
	add_spell_section.style.display = 'none'
	add_player_section.style.display = 'none'

	// Nothing is showing
	if (main_display.style.display != 'flex') {
		main_display.style.display = 'flex'
		add_effect_section.style.display = 'flex'
	
	// Some other add option was open
	} else if (main_display.style.display != 'none' && add_effect_section.style.display != 'flex') {
		add_effect_section.style.display = 'flex'
	
	// Player add was open, close it all
	} else if (main_display.style.display != 'none') {
		add_effect_section.style.display = 'none'
		main_display.style.display = 'none'
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
    //new_player.appendChild(player_text);

    //Create kill button and append to new player element
    let kill = document.createElement('input');
    kill.type = 'submit';
    kill.name = 'dead';
    kill.value = 'KILL';
    kill.classList.add('kill_button');
    kill.onclick = removePlayer;

    //Highlight player to remove when hovering on kill button
    kill.addEventListener('mouseenter', (event) => {
        console.log("Changing Background");
        event.target.parentNode.style.backgroundColor = '#ddd';
    });
    kill.addEventListener('mouseleave', (event) => {
        console.log("Changing Background");
        event.target.parentNode.style.backgroundColor = 'transparent';
    });

	//Create divs and other html elements for styling
	let left_div = document.createElement('div');
	left_div.classList.add('left-div');
	
	let right_div = document.createElement('div');
	right_div.classList.add('right-div');

	let image_container = document.createElement('div');
	image_container.classList.add('player-logo-container');

	let player_image = new Image();
	player_image.src = 'images/player-icon.png';
	player_image.alt = 'Player Logo';
	player_image.classList.add('player-logo');

	let top_container = document.createElement('div');
	top_container.classList.add('card-top-container');

	let character_div = document.createElement('div');
	let character_text = document.createTextNode('Character');
	character_div.classList.add('card-character-name');
	character_div.appendChild(character_text);

	let kill_div = document.createElement('div');
	
	let bottom_container = document.createElement('div');
	bottom_container.classList.add('card-bottom-container');

	let name_div = document.createElement('div');
	name_div.classList.add('player-name');
	let name_text = document.createTextNode(`${player_name}`);
	name_div.appendChild(name_text);

	let init_div = document.createElement('div');
	let init_text = document.createTextNode(`${player_init}`);
	init_div.classList.add('player-init');
	init_div.appendChild(init_text);
	

	left_div.appendChild(image_container);
	image_container.appendChild(player_image);

	right_div.appendChild(top_container);
	right_div.appendChild(bottom_container);

	top_container.appendChild(character_div);
	top_container.appendChild(kill);

	bottom_container.appendChild(name_div);
	bottom_container.appendChild(init_div);

    new_player.appendChild(left_div);
    new_player.appendChild(right_div);

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
    //Remove from caster options
    let kill_name = this.parentNode.parentNode.parentNode.id;
    let kill_spell = document.querySelector(`#cast-${kill_name}`);
    kill_spell.parentNode.removeChild(kill_spell);

    //Remove any spells cast by dead player
    let dead_spells = document.querySelectorAll(`.spell-${kill_name}`);
    //onsole.log(`Killed ${kill_name}`);
    //console.log(dead_spells);

    let i;
    for (i = 0; i < dead_spells.length; i++) {
        let spell = dead_spells[i];
        spell.parentNode.removeChild(spell);
    };

	//Remove player from the initiative list
	this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);

    //If no players left, don't leave blank
    all_players = document.querySelectorAll('.player_list');
    if (all_players.length == 0) {
        document.querySelector('.current-players').innerHTML = "No players yet";
        localStorage.setItem('players', "");
    };
};

function newEffect(){
	//Treat effect as a player, will be added to the player initiative queue
    //Get new player information
    let player_name = document.querySelector('#new-effect-name').value;
    let player_init = document.querySelector('#new-effect-init').value;

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
    //new_player.appendChild(player_text);

    //Create kill button and append to new player element
    let kill = document.createElement('input');
    kill.type = 'submit';
    kill.name = 'dead';
    kill.value = 'remove';
    kill.classList.add('kill_button');
    kill.onclick = removePlayer;

    //Highlight player to remove
    kill.addEventListener('mouseenter', (event) => {
        console.log("Changing Background");
        event.target.parentNode.style.backgroundColor = '#ddd';
    });
    kill.addEventListener('mouseleave', (event) => {
        console.log("Changing Background");
        event.target.parentNode.style.backgroundColor = 'transparent';
    });

    new_player.appendChild(kill);
    new_player.appendChild(player_text);

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
