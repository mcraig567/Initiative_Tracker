function build_player_html(char_name, initiative, char_type) {
	let name_no_space = char_name.replaceAll(" ", "-");

	//Get list of existing characters
	all_players = document.querySelectorAll('.player_list');
	all_players = Array.from(all_players);

	//Create new div and append to end of list
	let new_player = document.createElement('li');
	new_player.value = initiative;
	new_player.id = name_no_space;
	new_player.setAttribute('data-type', char_type);
	new_player.classList.add("player_list");

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
		event.target.parentNode.parentNode.parentNode.style.backgroundColor = '#ddd';
	});
	kill.addEventListener('mouseleave', (event) => {
		console.log("Changing Background");
		event.target.parentNode.parentNode.parentNode.style.backgroundColor = 'transparent';
	});

	//Create divs and other html elements for styling
	let left_div = document.createElement('div');
	left_div.classList.add('left-div');

	let right_div = document.createElement('div');
	right_div.classList.add('right-div');

	let image_container = document.createElement('div');
	image_container.classList.add('player-logo-container');

	let player_image = new Image();
	if (char_type ==='Player') {
		player_image.src = 'images/player-icon.png';
		player_image.alt = 'Player Logo';
		player_image.classList.add('player-logo');
	}

	else if (char_type === 'Monster') {
		player_image.src = 'images/monster-icon.png';
		player_image.alt = 'Monster Logo';
		player_image.classList.add('monster-logo');
	}

	else {
		player_image.src = 'images/logo.png';
		player_image.alt = 'Effect Logo';
		player_image.classList.add('effect-logo');
	}

	let top_container = document.createElement('div');
	top_container.classList.add('card-top-container');

	let character_div = document.createElement('div');

	let character_text;
	if (char_type === 'Player') {
		character_text = document.createTextNode('Character');
	} 
	else if (char_type === 'Monster') {
		character_text = document.createTextNode('Monster');
	}
	else {
		character_text = document.createTextNode('Lair Effect');
	}

	character_div.classList.add('card-character-name');
	character_div.appendChild(character_text);

	let bottom_container = document.createElement('div');
	bottom_container.classList.add('card-bottom-container');

	let name_div = document.createElement('div');
	name_div.classList.add('player-name');
	let name_text = document.createTextNode(`${char_name}`);
	name_div.appendChild(name_text);

	let init_div = document.createElement('div');
	let init_text = document.createTextNode(`${initiative}`);
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
	document.querySelector('#new-type').value = '';
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
	caster.value = char_name;
	caster.id = `cast-${name_no_space}`;
	caster.innerHTML = `${char_name}`;
	document.querySelector('#spell-cast').appendChild(caster);

}

function removePlayer(){
    //Remove from caster options
    let kill_name = this.parentNode.parentNode.parentNode.id;
    let kill_spell = document.querySelector(`#cast-${kill_name}`);
    kill_spell.parentNode.removeChild(kill_spell);

    //Remove any spells cast by dead player
    let dead_spells = document.querySelectorAll(`.spell-${kill_name}`);

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
