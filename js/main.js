const soundNameList = [
	'Rain',
	'Storm',
	'Wind',
	'Waves',
	'Stream',
	'Birds',
	'Summer Night',
	'Train',
	'Boat',
	'City',
	'Coffee Shop',
	'Fireplace',
	'Pink Noise',
	'White Noise',
];

const soundList = [];

const soundContainer = document.getElementById('soundList');

soundNameList.forEach((soundName) => {
	const sound = new Sound(soundName);	
	soundContainer.appendChild(sound.element);
	soundList.push(sound);
});

let masterVolume = localStorage.getItem('blanket-master-volume') || 1;

function setMasterVolume(volume) {
	masterVolume = volume;
	localStorage.setItem('blanket-master-volume', volume);
	soundList.forEach((sound) => {
		sound.setVolume(sound.getVolume());
	});
}

const playbackButton = document.getElementById('playback');

playbackButton.addEventListener('click', () => {
	if (playbackButton.classList.contains('active')) {
		soundList.forEach((sound) => {
			sound.pause();
		});
	} else {
		soundList.forEach((sound) => {
			sound.unpause();
		});
	}
	playbackButton.classList.toggle('active');
});
