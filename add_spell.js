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
    //Show the drop down
	let main_display = document.querySelector('#add-section');
	let add_spell_section = document.querySelector('#spell');

	let add_player_section = document.querySelector('#add');
	add_player_section.style.display = 'none';

	// Nothing is showing
	if (main_display.style.display != 'flex') {
		main_display.style.display = 'flex';
		add_spell_section.style.display = 'flex';
	
	// Some other add option was open
	} else if (main_display.style.display != 'none' && add_spell_section.style.display != 'flex') {
		add_spell_section.style.display = 'flex';
	
	// Player add was open, close it all
	} else if (main_display.style.display != 'none') {
		add_spell_section.style.display = 'none';
		main_display.style.display = 'none';
	};    
};

function newSpell() {
    // Gather inputs from user
    let spell = document.querySelector('#new-spell-name').value;
    let time = document.querySelector('#new-spell-duration').value;
    let concentration = document.querySelector('#new-spell-conc').value
    let caster = document.querySelector('#spell-cast').value;
	let id = document.querySelector('#spell-cast');
	id = id.options[id.selectedIndex].id.substring(5);
	console.log(`id: ${id}`);


	build_spell_html(spell, time, concentration, caster, id);
}
