const addNewButton = document.getElementById('addNew');

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'audio/*';
fileInput.style.display = 'none';
document.body.appendChild(fileInput);

addNewButton.addEventListener('click', () => {
	fileInput.click();
});

fileInput.addEventListener('change', () => {
	const file = fileInput.files[0];
	const reader = new FileReader();
	reader.onload = () => {
		const soundFile = new Audio(reader.result);
		saveCustomSound(file.name, reader.result);
		const sound = new Sound(file.name, soundFile);
		soundContainer.appendChild(sound.element);
		soundList.push(sound);
	};
	reader.readAsDataURL(file);
});

function saveCustomSound(name, data) {
	localStorage.setItem('customSound-' + name, data);
}

for (let i = 0; i < localStorage.length; i++) {
	const key = localStorage.key(i);
	if (key.startsWith('customSound-')) {
		const fileName = key.replace('customSound-', '');
		const soundFile = new Audio(localStorage.getItem(key));
		const sound = new Sound(fileName, soundFile);
		soundContainer.appendChild(sound.element);
		soundList.push(sound);
	}
}
