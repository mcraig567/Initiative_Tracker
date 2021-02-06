// Drops down tab where players can add a cast spell (and caster)
// Adds spell to spell list with soonest to expire at top

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('#add-spell').onclick = showSpell;
    document.querySelector('#spell-add').onclick = newSpell;
    document.querySelectorAll('.spell-input').forEach(i => {
        i.addEventListener('input', checkSpellValues);
    })
});

function checkSpellValues() {
    //Creates a list of completed checks, and disabled button if any are false
    let checks = [];
    let spellName = checkSpellName();
    checks.push(spellName);

    let spellLength = checkSpellTime();
    checks.push(spellLength);

    let spellConc = checkSpellConc();
    checks.push(spellConc);

    let spellCast = checkSpellCaster();
    checks.push(spellCast);

    document.querySelector('#spell-add').disabled = false; //Set enabled, disable if any issues
    let i;
    for(i = 0; i < checks.length; i++) {
        if (checks[i] === false) {
            document.querySelector('#spell-add').disabled = true;
        }
    }
}

function checkSpellName() {
    //Ensure that user is inputing a legit name
    let name = document.querySelector('#new-spell-name').value;
    let name_test = true; //Switch to false if issues

    //Ensure that user is inputing a legit name
    if (name.length > 64) {
        name_test = false;
        document.querySelector('#spell-too-long').style.display = 'block';
    } else {
        document.querySelector('#spell-too-long').style.display = 'none';
    }

    //For no input
    if (name.length === 0) {
        name_test = false;
    }

    return name_test;
}

function checkSpellTime() {
    let time = document.querySelector('#new-spell-duration').value;
    let time_test = true; //Switch to false if issues
    let time_type = Number(time);

    //Ensure that input is a whole number
    if (Number.isInteger(time_type) === false) {
        time_test = false;
        document.querySelector('#spell-non-int').style.display = 'block';
    } else {
        document.querySelector('#spell-non-int').style.display = 'none';
    }

    if (time_type < 0) {
        time_test = false;
        document.querySelector('#too-short').style.display = 'block';
    } else {
        document.querySelector('#too-short').style.display = 'none';
    }

    //For no input
    if (time === "") {
        time_test = false;
    }

    return time_test;
}

function checkSpellConc() {
    if (document.querySelector('#new-spell-conc').value === "") {
        return false;
    } else {
        return true;
    }
}

function checkSpellCaster() {
    if (document.querySelector('#spell-cast').value === "") {
        return false;
    } else {
        return true;
    }
}

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
    spell_elem.classList.add(`spell-${caster}`); //For easy removal
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
    spell_caster.setAttribute('data-value', caster);
    spell_caster.innerHTML = `Caster: ${caster}`;

    inner_list.appendChild(spell_time);
    inner_list.appendChild(spell_caster);

    //Add note if spell requires concentration
    if (concentration == 'True') {
        let spell_conc = document.createElement('li');
        spell_conc.innerHTML = 'Concentration'
        inner_list.appendChild(spell_conc);
    };

    //Create button to remove spell
    let rm_spell = document.createElement('button');
    rm_spell.classList.add('spell-remove');
    rm_spell.innerHTML = 'Remove';
    rm_spell.onclick = removeSpell;

    spell_elem.appendChild(inner_list);
    spell_elem.appendChild(rm_spell);
    spell_elem.setAttribute('data-value', spell_time.value);

    //Add new spell list item to full list and sort
    all_spells = document.querySelectorAll('.spell_list');
    all_spells = Array.from(all_spells);
    all_spells.push(spell_elem);
    all_spells.sort((a,b) => a.dataset.value - b.dataset.value);

    //Reset spell list and create sorted list
    spells = document.querySelector('#all-spells');
    spells.innerHTML = "";

    let i;
    for (i = 0; i < all_spells.length; i++) {
        spells.appendChild(all_spells[i]);
    }

    //Reset inputs to blank
    document.querySelector('#new-spell-name').value = "";
    document.querySelector('#new-spell-duration').value = "";
    document.querySelector('#new-spell-conc').value = "";
    document.querySelector('#spell-cast').value = "";
    document.querySelector('#spell-add').disabled = true;
};

function removeSpell() {
    this.parentNode.parentNode.removeChild(this.parentNode);
}