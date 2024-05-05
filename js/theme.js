const themes = [
	'light', 
	'dark', 
	'amoled', 
	'candy', 
	'warze',
];

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
themeButton.addEventListener('click', toggleThemeList);

const themeList = document.getElementById('themeList');

function toggleThemeList() {
	themeList.classList.toggle('hidden');
}

themes.forEach((theme) => {
	const themeButton = document.createElement('button');
	themeButton.textContent = theme;
	themeButton.addEventListener('click', () => setTheme(theme));
	themeList.appendChild(themeButton);
});
