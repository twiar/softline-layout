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
		document.querySelector(`.city__group:nth-child(${i + 1})`).style.width = `${rect.width}px`;
		document.querySelector(`.city__group:nth-child(${i + 1})`).style.height = `${rect.height}px`;
	});

	document.querySelectorAll('.card').forEach((el) => {
		el.addEventListener('click', () => {
			if (el.classList.value.includes('active')) {
				el.classList.remove('card_active');
			} else {
				el.classList.add('card_active');
			}
		});
	});

	const slider = document.querySelector(`.gallery__slides`);
	let isDown = false;
	let startX;
	let scrollLeft;

	const sliderPrev = document.querySelector(`.gallery__prev`);
	const sliderNext = document.querySelector(`.gallery__next`);

	const projectsPos = Array.from(
		slider.querySelectorAll('.slide'),
	).map((el) => el.getBoundingClientRect().x - slider.getBoundingClientRect().x);
	let actualPos = 0;
	let stepWidth = 1;
	const step = projectsPos[stepWidth] - projectsPos[0];

	slider.addEventListener('mousedown', (e) => {
		isDown = true;
		slider.classList.add('active');
		startX = e.pageX - slider.offsetLeft;
		scrollLeft = slider.scrollLeft;
	});
	slider.addEventListener('mouseleave', () => {
		isDown = false;
		slider.classList.remove('active');
		const distance = [];
		projectsPos.forEach((el) => distance.push(Math.abs(actualPos - el)));
		const min = Math.min(...distance);
		const index = distance.indexOf(min);
		if (scrollLeft - slider.scrollLeft > 150) {
			actualPos = projectsPos[index - 1];
		} else if (slider.scrollLeft - scrollLeft > 150) {
			actualPos = projectsPos[index + 1];
		} else {
			actualPos = projectsPos[index];
		}
		slider.scroll({
			left: actualPos,
			top: actualPos,
			behavior: 'smooth',
		});
	});
	slider.addEventListener('mouseup', () => {
		slider.querySelectorAll('.slide').forEach((el) => el.style.pointerEvents = 'auto');
		isDown = false;
		slider.classList.remove('active');
		const distance = [];
		projectsPos.forEach((el) => distance.push(Math.abs(actualPos - el)));
		const min = Math.min(...distance);
		const index = distance.indexOf(min);
		if (scrollLeft - slider.scrollLeft > 150) {
			actualPos = projectsPos[index - 1];
		} else if (slider.scrollLeft - scrollLeft > 150) {
			actualPos = projectsPos[index + 1];
		} else {
			actualPos = projectsPos[index];
		}
		slider.scroll({
			left: actualPos,
			top: actualPos,
			behavior: 'smooth',
		});
	});
	slider.addEventListener('mousemove', (e) => {
		if (!isDown) return;
		e.preventDefault();
		const x = e.pageX - slider.offsetLeft;
		const walk = (x - startX) * 1.5;
		slider.scrollLeft = scrollLeft - walk;
		actualPos = -Array.from(slider.querySelectorAll('.slide')).map((el) => el.getBoundingClientRect().x)[0] + slider.getBoundingClientRect().x;
	});
	slider.addEventListener('scroll', () => {
		slider.querySelectorAll('.slide').forEach((el) => el.style.pointerEvents = 'none');
		actualPos = -Array.from(slider.querySelectorAll('.slide')).map((el) => el.getBoundingClientRect().x)[0] + slider.getBoundingClientRect().x;
	});

	sliderNext.addEventListener('click', () => {
		let isCorrectPos = true;
		if (projectsPos.filter((el) => el === actualPos).length === 0) isCorrectPos = false;
		if (isCorrectPos) {
			actualPos += step;
		} else {
			const distance = [];
			projectsPos.forEach((el) => distance.push(Math.abs(actualPos - el)));
			const min = Math.min(...distance);
			const index = distance.indexOf(min);
			actualPos = projectsPos[index + 1];
		}
		if (actualPos > projectsPos[projectsPos.length - stepWidth] - projectsPos[0]) {
			actualPos = projectsPos[projectsPos.length - stepWidth] - projectsPos[0];
		}
		slider.scroll({
			left: actualPos,
			top: actualPos,
			behavior: 'smooth',
		});
	});

	sliderPrev.addEventListener('click', () => {
		let isCorrectPos = true;
		if (projectsPos.filter((el) => el === actualPos).length === 0) isCorrectPos = false;
		if (isCorrectPos) {
			actualPos -= step;
		} else {
			const distance = [];
			projectsPos.forEach((el) => distance.push(Math.abs(actualPos - el)));
			const min = Math.min(...distance);
			const index = distance.indexOf(min);
			actualPos = projectsPos[index - 1];
		}
		if (actualPos < 0) {
			actualPos = 0;
		}
		slider.scroll({
			left: actualPos,
			behavior: 'smooth',
		});
	});
});