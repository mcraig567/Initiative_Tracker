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

    // Create new list element
    let spell_elem = document.createElement('li');
    spell_elem.classList.add('spell_list');
    spell_elem.classList.add(`spell-${caster}`); //For easy removal

	// Create HTML sections for styling

	// Left is image only
	let left_div = document.createElement('div');
	left_div.classList.add('spell-left-div');

	let spell_img_container = document.createElement('div');
	spell_img_container.classList.add('spell-img-container');

	let spell_image = new Image();
	spell_image.src = 'images/spell-icon.png';
	spell_image.alt = 'Spell Logo';
	spell_image.classList.add('spell-logo');

	spell_img_container.appendChild(spell_image);
	left_div.appendChild(spell_img_container);

	// Middle contains spell name & caster
	let mid_div = document.createElement('div');
	mid_div.classList.add('spell-mid-div');

	let top_name_container = document.createElement('div');
	top_name_container.classList.add('spell-mid-topname-container');
	let top_name = document.createTextNode(`${caster}`);
	top_name_container.appendChild(top_name);
	top_name_container.setAttribute('data-value', caster);

	let bottom_name_container = document.createElement('div');
	bottom_name_container.classList.add('spell-mid-botname-container');
	let bottom_name = document.createTextNode(`${spell}`);
	bottom_name_container.appendChild(bottom_name);

	mid_div.appendChild(top_name_container);
	mid_div.appendChild(bottom_name_container);

	// Right contains remaining length, concentration (if application), and removal button
	let right_div = document.createElement('div');
	right_div.classList.add('spell-right-div');

	let rem_button_container = document.createElement('div');
	let time_container = document.createElement('div');
	let conc_container = document.createElement('div');

	rem_button_container.classList.add('spell-remove-container');
	time_container.classList.add('spell-time-container');
	conc_container.classList.add('spell-conc-container');

	let rem_button = document.createElement('div');
	rem_button.value = 'x';
	rem_button.classList.add('spell-remove');
	rem_button_container.appendChild(rem_button);
	rem_button.appendChild(document.createTextNode('x'));

	// Placeholder for when remove button is hidden
	let rem_placeholder = document.createElement('div');
	rem_placeholder.classList.add('spell-remove-placeholder');
	rem_button_container.appendChild(rem_placeholder);

	let spell_time = document.createTextNode('');
	spell_time.value = time;
	spell_time.nodeValue = `${spell_time.value} sec`;
	time_container.classList.add('time');
	time_container.appendChild(spell_time);

	let spell_conc = document.createTextNode('');
	if (concentration == 'True') {
        spell_conc.nodeValue = 'Conc';
        spell_elem.setAttribute('data-conc', true);
    } else {
		spell_conc.nodeValue = '';
        spell_elem.setAttribute('data-conc', false);
    };
	conc_container.appendChild(spell_conc);

	right_div.appendChild(rem_button_container);
	right_div.appendChild(time_container);
	right_div.appendChild(conc_container);

	// Add all the html together
	spell_elem.appendChild(left_div);
	spell_elem.appendChild(mid_div);
	spell_elem.appendChild(right_div);
	spell_elem.setAttribute('data-value', spell_time.value);
    spell_elem.setAttribute('data-caster', caster);

	// Add functionality to show & hide remove button
	spell_elem.addEventListener('mouseenter', (event) => {
        console.log("Showing remove button");
		let remove_target = 
			event.target.querySelector('.spell-right-div')
			.querySelector('.spell-remove-container');

		remove_target.querySelector('.spell-remove').style.display = 'flex';
		remove_target.querySelector('.spell-remove-placeholder').style.display = 'none';		
    });
    spell_elem.addEventListener('mouseleave', (event) => {
        console.log("Hiding remove button");
		let remove_target = 
			event.target.querySelector('.spell-right-div')
			.querySelector('.spell-remove-container');

		remove_target.querySelector('.spell-remove').style.display = 'none';
		remove_target.querySelector('.spell-remove-placeholder').style.display = 'flex';
    });	

	// Add functionality to remove button
    rem_button.onclick = removeSpell;

    //Highlight the spell to remove
    rem_button.addEventListener('mouseenter', (event) => {
        console.log("Changing Background");
        event.target.parentNode.parentNode.parentNode.style.backgroundColor = '#ddd';
    });
    rem_button.addEventListener('mouseleave', (event) => {
        console.log("Changing Background");
        event.target.parentNode.parentNode.parentNode.style.backgroundColor = 'transparent';
    });

    //Add new spell list item to full list and sort
    all_spells = document.querySelectorAll('.spell_list');
    all_spells = Array.from(all_spells);
    all_spells.push(spell_elem);
    all_spells.sort((a,b) => a.dataset.value - b.dataset.value);

    //Reset spell list and create sorted list
    spells = document.querySelector('#current-spells');
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
    this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);
}