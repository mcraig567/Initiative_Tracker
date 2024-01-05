function build_spell_html(spell, time, concentration, caster, id) {

	let spell_no_space = spell.replaceAll(" ", "-");
	let caster_no_space = caster.replaceAll(" ", "-");
	
	// Create new list element
	let spell_elem = document.createElement('li');
	spell_elem.classList.add('spell_list');
	spell_elem.classList.add(`spell-${id}`); //For easy removal

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
	top_name_container.setAttribute('data-value', caster_no_space);

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
	time_container.value = time;
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
	spell_elem.setAttribute('data-caster', caster_no_space);
	spell_elem.setAttribute('data-name', spell_no_space);
	spell_elem.setAttribute('data-casterId', id);

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