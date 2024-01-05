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
		document.querySelector('#battle-round').innerHTML = "Round: 1";
		document.querySelector('#battle-round').value = 1;
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
				let spellElem = spell_times[i].parentNode.parentNode;
                let spellName = spellElem.getAttribute('data-name');
                console.log(`Removing Spell ${spellName}`);

                let caster = spellElem.getAttribute('data-caster');
                console.log(`Caster ${caster}`);

                let new_div = document.createElement('div');
                new_div.innerHTML = `${spellName} (${caster}) has expired`;

                document.querySelector('#toast').appendChild(new_div);

                //Remove spell from page
                spell_times[i].parentNode.parentNode.parentNode.removeChild(spell_times[i].parentNode.parentNode);

            } else {
                spell_times[i].value = time;
                spell_times[i].parentNode.value = time;
				spell_times[i].parentNode.parentNode.setAttribute('data-value', time);
                spell_times[i].innerHTML = `${spell_times[i].value} sec`;
            };    
        };

        //Only show toast if spells have expired
        if (document.querySelector('#toast').innerHTML != "") {
            showToast();
        }

		//Increase the round number 
		let roundElement = document.querySelector('#battle-round');
		let round = roundElement.value;
		round += 1;
		roundElement.value = round;
		roundElement.innerHTML = `Round: ${round}`;

    } else {
        turn ++
    };

	//Add bold font and border when players turn
	let active_player_id;
    for (i = 0; i < players.length; i++) {
        if (i == turn) {
            players[i].classList.add('active-player');
			active_player_id = players[i].id;
        } else {
            players[i].classList.remove('active-player');
        };
    };

	//Add bold border of any active spells cast by the player
	let all_spells = document.querySelectorAll(".spell_list");
	all_spells = Array.from(all_spells);
	
	for (i = 0; i < all_spells.length; i++){
		if (all_spells[i].dataset.casterid === active_player_id) {
			all_spells[i].classList.add('active-spell');
		} else {
			all_spells[i].classList.remove('active-spell');
		}
	}

	//Highlight the active player in casting options
	let casterOptions = document.querySelector('#spell-cast');
	for (let caster of casterOptions.children) {
		if (caster.id === `cast-${active_player_id}`) {
			//caster.innerHTML = `${caster.value} (Current)`;
			caster.classList.add('active-caster');
			
		} else if (caster.id.length > 0) {		
			//caster.innerHTML= caster.value;
			caster.classList.remove('active-caster');

		}
	}

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
    document.querySelector('#current-spells').innerHTML = "";
    document.querySelector('#current-players').innerHTML = "No players yet";
	document.querySelector('#spell-cast').innerHTML = 
		"<option value='' disabled selected hidden>Caster</option>";
    turn = -1;
    document.querySelector('#end_turn').innerHTML = "Start Battle";
	document.querySelector('#battle-round').innerHTML = "Battle Setup";
	document.querySelector('#battle-round').value = 0;
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
		let id = players[i].id;
        let name = players[i].getAttribute('data-name');
        let initiative = players[i].value;
		let player_type = players[i].getAttribute('data-type');
		
        let play = {
			'id': id,
            'name': name,
            'initiative': initiative,
			'type': player_type
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
		build_player_html(play.name, play.initiative, play.type, play.id);

        if (i == turn) {

			let new_player = document.querySelector(`#${play.id}`)
            new_player.classList.add('active'); // Bold if player's turn
        };
    };
}

function spellToJSON() {
    let spellJSONs = [];
    spells = document.querySelectorAll('.spell_list');

    for (let i = 0; i < spells.length; i++) {
        let caster_name = spells[i].dataset.caster;
		let caster_id = spells[i].dataset.casterid;
        let time = spells[i].dataset.value;
        let conc = spells[i].dataset.conc;
        let name = spells[i].dataset.name;

        let spell = {
            "caster": caster_name,
			"caster_id": caster_id,
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

		build_spell_html(spell.name, spell.time, spell.conc, spell.caster, spell.caster_id);
    };
}
