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

	document.querySelectorAll('.map__dropdown').forEach((el) => {
		el.addEventListener('click', () => {
			if (el.classList.value.includes('active')) {
				el.classList.remove('map__dropdown_active');
				document.querySelector('.dropdown').style.visibility = '';
				document.querySelector('.dropdown').style.opacity = '';
			} else {
				el.classList.add('map__dropdown_active');
				document.querySelector('.dropdown').style.visibility = 'visible';
				document.querySelector('.dropdown').style.opacity = '1';
			}
		});
	});

	if (window.innerWidth < 420) {
		document.querySelectorAll('.dropdown__text_head').forEach((el) => {
			el.addEventListener('click', () => {
				if (el.parentElement.classList.value.includes('active')) {
					el.parentElement.classList.remove('dropdown__col_active');
					Array.from(el.parentElement.children).forEach((elem) => {
						if (!elem.classList.value.includes('head')) elem.style.display = '';
					});
				} else {
					console.log(Array.from(el.parentElement.children));
					el.parentElement.classList.add('dropdown__col_active');
					Array.from(el.parentElement.children).forEach((elem) => {
						if (!elem.classList.value.includes('head')) elem.style.display = 'block';
					});
				}
			});
		});

		document.querySelectorAll('.dropdown__col').forEach((el) => {
			if (el.children.length < 2) el.classList.add('dropdown__col_disabled');
		});
	}

	const slider = document.querySelector(`.gallery__slides`);
	let isDown = false;
	let startX;
	let scrollLeft;

	const sliderPrev = document.querySelector(`.gallery__prev`);
	const sliderNext = document.querySelector(`.gallery__next`);

	const activeSlide = () => {
		document.querySelector('.gallery__prev').style.opacity = '';
		document.querySelector('.gallery__prev').style.pointerEvents = 'all';
		document.querySelector('.gallery__next').style.opacity = '';
		document.querySelector('.gallery__next').style.pointerEvents = 'all';

		if ((step * (projectsPos.length - 1)) === actualPos) {
			document.querySelector('.gallery__next').style.opacity = '0.1';
			document.querySelector('.gallery__next').style.pointerEvents = 'none';
		} else {
			document.querySelector('.gallery__next').style.opacity = '';
			document.querySelector('.gallery__next').style.pointerEvents = 'all';
		}
		if (actualPos === 0) {
			document.querySelector('.gallery__prev').style.opacity = '0.1';
			document.querySelector('.gallery__prev').style.pointerEvents = 'none';
		} else {
			document.querySelector('.gallery__prev').style.opacity = '';
			document.querySelector('.gallery__prev').style.pointerEvents = 'all';
		}

		document.querySelectorAll('.gallery__pgntn .pagination__item').forEach((el, i) => {
			if (el.classList.value.includes('active')) el.classList.remove('pagination__item_active');

			if ((actualPos / step) === i) {
				el.classList.add('pagination__item_active');
			}
		});
	}

	const leave = () => {
		slider.querySelectorAll('.slide').forEach((el) => el.style.pointerEvents = 'auto');
		isDown = false;
		slider.classList.remove('active');
		const distance = [];
		projectsPos.forEach((el) => distance.push(Math.abs(actualPos - el)));
		const min = Math.min(...distance);
		const index = distance.indexOf(min);
		if (scrollLeft - slider.scrollLeft > 50) {
			actualPos = projectsPos[index - 1];
			activeSlide();
		} else if (slider.scrollLeft - scrollLeft > 50) {
			actualPos = projectsPos[index + 1];
			activeSlide();
		} else {
			actualPos = projectsPos[index];
			activeSlide();
		}
		slider.scroll({
			left: actualPos,
			top: actualPos,
			behavior: 'smooth',
		});
	}

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
	slider.addEventListener('touchstart', (e) => {
		console.log(2);
		isDown = true;
		slider.classList.add('active');
		startX = e.targetTouches[0].pageX - slider.offsetLeft;
		scrollLeft = slider.scrollLeft;
	});
	slider.addEventListener('mouseleave', leave);
	slider.addEventListener('mouseup', leave);
	slider.addEventListener('touchend', leave);
	slider.addEventListener('touchcancel', leave);
	slider.addEventListener('mousemove', (e) => {
		if (!isDown) return;
		e.preventDefault();
		const x = e.pageX - slider.offsetLeft;
		const walk = (x - startX) * 1.5;
		slider.scrollLeft = scrollLeft - walk;
		actualPos = -Array.from(slider.querySelectorAll('.slide')).map((el) => el.getBoundingClientRect().x)[0] + slider.getBoundingClientRect().x;
	});
	slider.addEventListener('touchmove', (e) => {
		if (!isDown) return;
		e.preventDefault();
		const x = e.targetTouches[0].pageX - slider.offsetLeft;
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
			activeSlide();
		} else {
			const distance = [];
			projectsPos.forEach((el) => distance.push(Math.abs(actualPos - el)));
			const min = Math.min(...distance);
			const index = distance.indexOf(min);
			actualPos = projectsPos[index + 1];
			activeSlide();
		}
		if (actualPos > projectsPos[projectsPos.length - stepWidth] - projectsPos[0]) {
			actualPos = projectsPos[projectsPos.length - stepWidth] - projectsPos[0];
			activeSlide();
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
			activeSlide();
		} else {
			const distance = [];
			projectsPos.forEach((el) => distance.push(Math.abs(actualPos - el)));
			const min = Math.min(...distance);
			const index = distance.indexOf(min);
			actualPos = projectsPos[index - 1];
			activeSlide();
		}
		if (actualPos < 0) {
			actualPos = 0;
			activeSlide();
		}
		slider.scroll({
			left: actualPos,
			behavior: 'smooth',
		});
	});
});