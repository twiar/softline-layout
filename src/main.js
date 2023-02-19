import '@styles/main.scss'

function getTranslateStyle(element) {
	const style = window.getComputedStyle(element);
	const matrix = style.transform || style.webkitTransform || style.mozTransform;
	const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
	const x = matrixValues[4];
	const y = matrixValues[5];

	return [x, y];
}

window.addEventListener('resize', () => {
});

document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.country__part img').forEach((el, i) => {
		const rect = el.getBoundingClientRect();
		console.log(document.querySelector(`.city__group:nth-child(${i + 1})`), i);
		document.querySelector(`.city__group:nth-child(${i + 1})`).style.width = `${rect.width}px`;
		document.querySelector(`.city__group:nth-child(${i + 1})`).style.height = `${rect.height}px`;
	});
});