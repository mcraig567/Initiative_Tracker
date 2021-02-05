// Drops down tab where players can add a cast spell (and caster)
// Adds spell to spell list with soonest to expire at top

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('#add-spell').onclick = showSpell;
    document.querySelector('#spell-add').onclick = newSpell;
});

function showSpell() {
    // Show the drop down
    let current = document.querySelector('#spell');
    
    if (current.style.display == 'block') {
       current.style.display = 'none'
    } else {
       current.style.display = 'block'
    };    
};

function newSpell() {
    // Gather inputs from user
    let spell = document.querySelector('#new-spell-name').value;
    let time = document.querySelector('#new-spell-duration').value;
    let concentration = document.querySelector('#new-spell-conc').value
    let caster = document.querySelector('#spell-cast').value;

    // Create new list element
    let spell_elem = document.createElement('li');
    spell_elem.classList.add('spell_list');
    spell_elem.classList.add(`spell-${caster}`);
    spell_name = document.createElement('div');
    spell_name_text = document.createTextNode(`${spell}`);
    spell_name.appendChild(spell_name_text);
    spell_elem.appendChild(spell_name);

    let inner_list = document.createElement('ul');
    let spell_time = document.createElement('li');
    spell_time.value = time;
    spell_time.classList.add('time');
    spell_time.innerHTML = `Remaining Time: ${spell_time.value}s`;
    let spell_caster = document.createElement('li');
    spell_caster.value = caster;
    spell_caster.innerHTML = `Caster: ${caster}`;

    inner_list.appendChild(spell_time);
    inner_list.appendChild(spell_caster);

    if (concentration == 'True') {
        let spell_conc = document.createElement('li');
        spell_conc.innerHTML = 'Concentration'
        inner_list.appendChild(spell_conc);
    };

    spell_elem.appendChild(inner_list);

    //Add new spell list item to full list
    document.querySelector('#all-spells').appendChild(spell_elem);

    //Add the caster to the element classlist for easy removal
    spell_elem.classList.add(`spell-${caster}`);
    console.log(`Adding spell by ${caster}`);

    //Reset inputs to blank
    document.querySelector('#new-spell-name').value = "";
    document.querySelector('#new-spell-duration').value = "";
    document.querySelector('#new-spell-conc').value = "";
    document.querySelector('#spell-cast').value = "";
};