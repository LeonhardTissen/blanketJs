class Sound {
	constructor(soundName) {
		const fileName = soundName.toLowerCase().replace(/ /g, '');

		this.key = `blanket-${fileName}-volume`;

		this.element = document.createElement('div');
		this.element.classList.add('sound');
		this.element.dataset.sound = fileName;

		this.sound = new Audio(`assets/sounds/${fileName}.ogg`);
		this.sound.preload = 'auto';
		this.sound.load();
		this.sound.loop = true;

		this.sound.volume = this.getVolume();

		this.iconContainer = document.createElement('div');
		this.iconContainer.classList.add('iconContainer');

		this.icon = new Image();
		this.icon.classList.add('icon');
		this.icon.src = `assets/icons/${fileName}.svg`;
		this.icon.draggable = false;
		this.iconContainer.appendChild(this.icon);

		this.text = document.createElement('p');
		this.text.classList.add('name');
		this.text.textContent = soundName;

		this.sliderContainer = document.createElement('div');
		this.sliderContainer.classList.add('volumeContainer');

		this.slider = document.createElement('div');
		this.slider.classList.add('volume');
		this.slider.style.setProperty('--width', `${this.sound.volume * 100}%`);
		this.sliderContainer.appendChild(this.slider);

		// Append elements to the container
		this.element.appendChild(this.iconContainer);
		this.element.appendChild(this.text);
		this.element.appendChild(this.sliderContainer);

		// Slider events
		this.sliderContainer.addEventListener('mousedown', (event) => {
			this.updateSlider.call(this, event);
		});
		this.sliderContainer.addEventListener('touchstart', (event) => {
			this.updateSlider.call(this, event.touches[0]);
		});
		this.sliderContainer.addEventListener('mousemove', (event) => {
			if (event.buttons === 1) {
				this.updateSlider.call(this, event);
			}
		});
		this.sliderContainer.addEventListener('touchmove', (event) => {
			this.updateSlider.call(this, event.touches[0]);
		});

		// Icon events
		this.icon.addEventListener('click', this.toggle.bind(this));
	}
	updateSlider(event) {
		const rect = this.sliderContainer.getBoundingClientRect();
		let volume = (event.clientX - rect.left) / rect.width;
		volume = Math.max(0, Math.min(1, volume));
		if (volume === 0) {
			this.stop();
		} else {
			this.play();
		}
		this.setVolume(volume);
		this.slider.style.setProperty('--width', `${volume * 100}%`);
	}
	getVolume() {
		return localStorage.getItem(this.key) || 0.5;
	}
	setVolume(volume) {
		this.sound.volume = volume;
		localStorage.setItem(this.key, volume);
	}
	play() {
		this.sound.play();
		this.element.classList.remove('paused');
		this.element.classList.add('active');
	}
	stop() {
		this.sound.pause();
		this.element.classList.remove('active');
	}
	toggle() {
		if (this.sound.paused) {
			this.play();
		} else {
			this.stop();
		}
	}
	pause() {
		if (this.sound.paused) return;
		this.stop();
		this.element.classList.add('paused');
	}
	unpause() {
		if (this.element.classList.contains('paused')) {
			this.play();
			this.element.classList.remove('paused');
		}
	}
}
