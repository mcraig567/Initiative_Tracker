// Drops down tab to allow user to add a player and initiative
// Adds new player to existing players in sorted order

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('#add-player').onclick = showPlayer;
    document.querySelector('#player-add').onclick = newPlayer;
});

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

    //Ensure both are legit


    //Get list of existing characters
    all_players = document.querySelectorAll('.player_list');
    all_players = Array.from(all_players);

    //Create new div and append to end of list
    let new_player = document.createElement('li');
    new_player.value = player_init;
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

    //Create new list of players
    let i;
    for (i = 0; i < all_players.length; i++) {
        player_list.appendChild(all_players[i]);
    };

    if (all_players.length == 0) {
        player_list.innerHTML = "No Players Yet!";
    };
};

function removePlayer(){
    this.parentNode.parentNode.removeChild(this.parentNode);

    //If no players left
    all_players = document.querySelectorAll('.player_list');
    if (all_players.length == 0) {
        document.querySelector('.current-players').innerHTML = "No players yet";
    };
};