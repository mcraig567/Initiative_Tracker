// Drops down tab to allow user to add a player and initiative
// Adds new player to existing players in sorted order
// Adds new player to options for casting a new spell

//import { build_player_html } from "./add_player_html.js";

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('#add-player').onclick = showPlayer;
    document.querySelector('#player-add').onclick = newPlayer;
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
	let new_type = checkPlayerType();

    if (name === true && init === true && new_type === true) {
        document.querySelector('#player-add').disabled = false;
    } else {
        document.querySelector('#player-add').disabled = true;
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

function checkPlayerType() {
	//Enforce that the user is inputting a type
	let new_type = document.querySelector('#new-type').value;

	if (new_type ==='') {
		return false;
	}

	return true;
}

function showPlayer() {
    //Show the drop down
	let main_display = document.querySelector('#add-section');
	let add_player_section = document.querySelector('#add');

	let add_spell_section = document.querySelector('#spell');
	add_spell_section.style.display = 'none';

	// Nothing is showing
	if (main_display.style.display != 'flex') {
		main_display.style.display = 'flex';
		add_player_section.style.display = 'flex';
	
	// Some other add option was open
	} else if (main_display.style.display != 'none' && add_player_section.style.display != 'flex') {
		add_player_section.style.display = 'flex';
	
	// Player add was open, close it all
	} else if (main_display.style.display != 'none') {
		add_player_section.style.display = 'none';
		main_display.style.display = 'none';
	};    
};

function newPlayer(){
    //Get new player information
    let player_name = document.querySelector('#new-name').value;
    let player_init = document.querySelector('#new-init').value;
	let player_type = document.querySelector('#new-type').value;

	console.log(typeof player_name);

	if (typeof player_name != "string"){
		player_name = player_name.toString();
	}

	player_name.trim();

	build_player_html(player_name, player_init, player_type)
};
