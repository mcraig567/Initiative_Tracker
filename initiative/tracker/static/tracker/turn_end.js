// On push "End Turn" button, switch the active player down to next
// Remove time from all spells
// Remove any expired spells
//

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('#end_turn').onclick = endTurn;
    document.querySelector('#end_battle').onclick = endBattle;
});

function endTurn() {
    console.log('Next Turn')
    //Get list of all remaining spell durations (li elements)
    let spell_times = document.querySelectorAll('.time');
    console.log(spell_times)
    
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
};

function endBattle() {
    console.log('Ending Battle')
    
    //Reset everything to blank
    document.querySelector('#all-spells').innerHTML = "";
    document.querySelector('.current-players').innerHTML = "No players yet";
};