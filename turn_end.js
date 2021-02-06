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

    if (document.querySelector('#end_turn').innerHTML === "Start Battle") {
        document.querySelector('#end_turn').innerHTML = "End Turn";
    };

    //Get list of all players
    let players = document.querySelectorAll('.player_list');
    players = Array.from(players);

    let player_list = document.querySelector('.current-players');
    player_list.innerHTML = "";

    //Reset turns when end of players
    if (turn === players.length - 1) {
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

function showToast() {
    console.log("Showing Toast")
    let x = document.querySelector('#toast');
    x.className = "show";
    setTimeout(function() {
        x.className = x.className.replace("show", "");
        x.innerHTML = "";
    }, 3000);
}