// On push "End Turn" button, switch the active player down to next
// Remove time from all spells
// Remove any expired spells
//

let turn = -1 // Keeps track of who's turn it is, set -1 so first turn is player 0

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('#end_turn').onclick = endTurn;
    document.querySelector('#end_battle').onclick = endBattle;
});

function endTurn() {
    console.log('Next Turn')

    //Get list of all players
    let players = document.querySelectorAll('.player_list');
    players = Array.from(players);

    let player_list = document.querySelector('.current-players');
    player_list.innerHTML = "";

    //Reset turns when end of players
    if (turn === players.length - 1) {
        turn = 0;

        //Get list of all remaining spell durations (li elements)
        let spell_times = document.querySelectorAll('.time');
        //console.log(spell_times)
        
        if (document.querySelector('#end_turn').innerHTML === "Start Battle") {
            document.querySelector('#end_turn').innerHTML = "End Turn";
        };

        let i;
        //Iterate through spells, decreasing time by 6 seconds, and removing if time is below 0
        for (i = 0; i < spell_times.length; i++) {
            let time = spell_times[i].value;
            time -= 6;

            if (time <= 0) {
                spell_times[i].parentNode.parentNode.parentNode.removeChild(spell_times[i].parentNode.parentNode);
            } else {
                spell_times[i].value = time;
                spell_times[i].innerHTML = `Remaining Time: ${spell_times[i].value}s`;
            };        
        };

    } else {
        turn ++
    };

    //Add bold font when players turn
    for (i = 0; i < players.length; i++) {
        if (i == turn) {
            players[i].classList.add('active');
        } else {
            players[i].classList.remove('active');
        };

        player_list.appendChild(players[i]);
    };
};

function endBattle() {
    console.log('Ending Battle')
    
    //Reset everything to blank
    document.querySelector('#all-spells').innerHTML = "";
    document.querySelector('.current-players').innerHTML = "No players yet";
    turn = -1;
    document.querySelector('#end_turn').innerHTML = "Start Battle";
};