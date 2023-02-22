import '@styles/main.scss'

let newHeader = null;
let menuHeader = null;

const openMenu = () => {
	const menu = document.querySelector('.header__nav_fixed');
	menu.style.opacity = '1';
	menu.style.visibility = 'visible';
	menu.style.zIndex = '1000';

	menu.querySelector('.header__nav_mobile').innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<rect x="0.686279" y="21.8995" width="30" height="2" transform="rotate(-45 0.686279 21.8995)" fill="#B01736"/>
	<rect x="2.10059" y="0.686279" width="30" height="2" transform="rotate(45 2.10059 0.686279)" fill="#B01736"/>
	</svg>
	`;
	menu.querySelector('.header__nav_mobile').style.position = 'absolute';
	menu.querySelector('.header__nav_mobile').style.top = '16px';
	menu.querySelector('.header__nav_mobile').style.right = '20px';

	menu.querySelector('.header__logo').style.position = 'absolute';
	menu.querySelector('.header__logo').style.top = '16px';
	menu.querySelector('.header__logo').style.left = '20px';

	menu.querySelector('.header__nav_desktop').style.display = 'block';
	menu.querySelector('.header__nav_desktop').style.position = 'absolute';
	menu.querySelector('.header__nav_desktop').style.top = '100px';
	menu.querySelector('.header__nav_desktop').style.width = '100vw';
	menu.querySelector('.header__nav_desktop').style.transform = 'scale(1.25)';
	menu.querySelector('.header__nav_desktop ul').style.flexDirection = 'column';
	menu.querySelectorAll('.header__nav_desktop ul li').forEach((el) => el.style.marginRight = '0');
	menu.querySelectorAll('.header__nav_desktop ul li a').forEach((el) => {
		el.style.display = 'block';
		el.addEventListener('click', () => {
			menu.style.opacity = '0';
			setTimeout(() => {
				menu.style.visibility = 'hidden';
				menu.style.zIndex = '-1';
			}, 300);
		});
	});
	menu.querySelectorAll('.header__nav_desktop ul li a').forEach((el) => el.style.textAlign = 'center');

	menu.querySelector('.header__nav_mobile svg').addEventListener('click', () => {
		menu.style.opacity = '0';
		setTimeout(() => {
			menu.style.visibility = 'hidden';
			menu.style.zIndex = '-1';
		}, 300);
	});
}

function getTranslateStyle(element) {
	const style = window.getComputedStyle(element);
	const matrix = style.transform || style.webkitTransform || style.mozTransform;
	const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
	const x = matrixValues[4];
	const y = matrixValues[5];

	return [x, y];
}

window.addEventListener('scroll', () => {
	const height = document.querySelector('.header').getBoundingClientRect().height;
	if (!newHeader) {
		newHeader = document.querySelector('.header').cloneNode(true);
		newHeader.classList.add('header_fixed');
		document.querySelector('body').appendChild(newHeader);
		document.querySelector('.header_fixed').style.opacity = '0';
		document.querySelector('.header_fixed').style.visibility = 'hidden';
		document.querySelectorAll('.header_fixed a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', function (e) {
				e.preventDefault();

				document.querySelector(this.getAttribute('href')).scrollIntoView({
					behavior: 'smooth'
				});
			});
		});
		if (window.innerWidth < 420) {
			document.querySelector('.header_fixed .header__nav_mobile svg').addEventListener('click', openMenu);
		}
	}
	if (!menuHeader) {
		if (window.innerWidth < 420) {
			menuHeader = document.querySelector('.header_fixed').cloneNode(true);
			menuHeader.classList.add('header__nav_fixed');
			menuHeader.classList.add('header__nav');
			menuHeader.classList.remove('header_fixed');
			menuHeader.classList.remove('header');
			document.querySelector('body').appendChild(menuHeader);
			document.querySelector('.header__nav_fixed').style.opacity = '0';
			document.querySelector('.header__nav_fixed').style.visibility = 'hidden';
			document.querySelector('.header__nav_fixed').style.zIndex = '-1';
		}
	}

	if (Math.abs(document.querySelector('body').getBoundingClientRect().y) > (height / 2)) {
		document.querySelector('.header_fixed').style.opacity = '1';
		document.querySelector('.header_fixed').style.visibility = 'visible';
		if (window.innerWidth > 1110) {
			const width = window.innerWidth;
			document.querySelector('.header_fixed').style.paddingLeft = `${(width - 1110)/2}px`;
			document.querySelector('.header_fixed').style.paddingRight = `${(width - 1110)/2}px`;
		}
	} else {
		document.querySelector('.header_fixed').style.opacity = '0';
		document.querySelector('.header_fixed').style.visibility = 'hidden';
	}

	let heights = [];
	document.querySelectorAll('.container > *').forEach((el, i) => {
		if (i > 1) heights.push(el.getBoundingClientRect().y);
	});
	let currentBlock = -1;
	heights.forEach((el) => {
		if (el <= 100) currentBlock++
	});
	document.querySelectorAll('.header_fixed .header__nav_desktop ul li a').forEach((el) => {
		if (el.classList.value.includes('active')) el.classList.remove('active');
	});
	currentBlock >= 0 ? document.querySelector(`.header_fixed .header__nav_desktop ul li:nth-child(${currentBlock+1}) a`).classList.add('active') : document.querySelector(`.header_fixed .header__nav_desktop ul li:first-child a`).classList.add('active')
});

document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();

			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});

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
				document.querySelector('.map__nav').style.opacity = '';
			} else {
				el.classList.add('map__dropdown_active');
				document.querySelector('.dropdown').style.visibility = 'visible';
				document.querySelector('.dropdown').style.opacity = '1';
				document.querySelector('.map__nav').style.opacity = '0.1';
			}
		});
	});

	document.querySelectorAll('.map__nav ul li').forEach((el, i) => {
		el.addEventListener('click', () => {
			document.querySelectorAll('.map__nav ul li a').forEach((elem) => {
				if (elem.classList.value.includes('active')) elem.classList.remove('active');
			});
			el.querySelector('a').classList.add('active');
			if (i === 0) {
				document.querySelectorAll('.city__group').forEach((elem) => {
					elem.style.display = '';
				});
			} else {
				document.querySelectorAll('.city__group').forEach((elem, index) => {
					if (i - 1 === index) {
						elem.style.display = '';
					} else {
						elem.style.display = 'none';
					}
				});
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

		document.querySelector('.header__nav_mobile svg').addEventListener('click', openMenu);
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