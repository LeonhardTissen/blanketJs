const themes = ['light', 'dark', 'amoled'];

function setTheme(theme) {
	document.documentElement.setAttribute('data-theme', theme);
	localStorage.setItem('theme', theme);
}

const loadedTheme = localStorage.getItem('theme');
if (loadedTheme) {
	setTheme(loadedTheme);
}

function nextTheme() {
	const currentTheme = localStorage.getItem('theme');
	const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
	setTheme(nextTheme);
}

const themeButton = document.getElementById('theme');
themeButton.addEventListener('click', nextTheme);
