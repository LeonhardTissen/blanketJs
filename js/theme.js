const themes = ['light', 'dark', 'amoled'];

const themeKey = 'blanket-theme';

function setTheme(theme) {
	document.documentElement.setAttribute('data-theme', theme);
	localStorage.setItem(themeKey, theme);
}

const loadedTheme = localStorage.getItem(themeKey);
if (loadedTheme) {
	setTheme(loadedTheme);
}

function nextTheme() {
	const currentTheme = localStorage.getItem(themeKey);
	const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
	setTheme(nextTheme);
}

const themeButton = document.getElementById('theme');
themeButton.addEventListener('click', nextTheme);
