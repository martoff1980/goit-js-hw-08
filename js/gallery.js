/** @format */

const images = [
	{
		preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
		original: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
		description: 'Hokkaido Flower',
	},
	{
		preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
		original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
		description: 'Container Haulage Freight',
	},
	{
		preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
		original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
		description: 'Aerial Beach View',
	},
	{
		preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
		original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
		description: 'Flower Blooms',
	},
	{
		preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
		original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
		description: 'Alpine Mountains',
	},
	{
		preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
		original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
		description: 'Mountain Lake Sailing',
	},
	{
		preview: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
		original: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
		description: 'Alpine Spring Meadows',
	},
	{
		preview: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
		original: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
		description: 'Nature Landscape',
	},
	{
		preview: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
		original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
		description: 'Lighthouse Coast Sea',
	},
];

const gallery = document.querySelector('.gallery');

const galleryItemsHTML = images
	.map(({ preview, original, description }) => {
		return `<li class="gallery-item">
                    <a class="gallery-link" href="${original}">
                        <img
                            class="gallery-image"
                            src="${preview}"
                            data-source="${original}"
                            alt="${description}"
                        />
                    </a>
                </li>`;
	})
	.join('');

function showEnlargeImage() {
	const galleryItems = document.querySelectorAll('.gallery-item img');

	galleryItems.forEach((item) => {
		item.addEventListener('mouseenter', function (event) {
			// Заборона завантаження зображення
			event.preventDefault();

			// Якщо зображення вже збільшено, то зменьшуємо його
			if (item.classList.contains('enlarge')) {
				item.classList.remove('enlarge');
			} else {
				// Удаляємо клас 'enlarge' у всіх изображень
				galleryItems.forEach((img) => img.classList.remove('enlarge'));
				// Додаємо клас 'enlarge' к поточному зображенню
				item.classList.add('enlarge');
			}
		});
	});
}

function selectedImage() {
	const gallery = document.querySelector('.gallery');

	function clickImage(event) {
		// Заборна завантаженню зображення
		event.preventDefault();

		// Перевіряємо, чи був клік виконаний на зображенні
		if (event.target.tagName === 'IMG') {
			const largeImageURL = event.target.parentElement.href;

			//Працюємо з Local Storage для запобігання помілки:
			// "Chrome is moving towards a new experience that allows users
			//  to choose to browse without third - party cookies".
			localStorage.clear();
			localStorage.setItem('curentPhoto', largeImageURL);
			console.log(localStorage.getItem('curentPhoto'));
			localStorage.removeItem('curentPhoto');
		}
	}

	gallery.addEventListener('click', clickImage);
}

function modalWindow() {
	const galleryItems = document.querySelectorAll('.gallery-item a');
	const hero = document.querySelector('.hero');
	let currentIndex = 0;

	function showImage(index) {
		const item = galleryItems[index];
		hero.classList.add('modal-open');
		const instance = basicLightbox.create(
			`
			<div class="modal-container">
				<div class="modal-window">
					<button class="modal-button modal-close" type="button">&times;</button>
					<p class="modal-button modal-info">${index + 1} / ${galleryItems.length}</p>
					<button class="modal-button modal-prev">&lt;</button>
					<img src="${item.href}" alt="${item.querySelector('img').alt}">
					<button class="modal-button modal-next">&gt;</button>
				<div>
            </div>
        `,
			{
				onShow: (instance) => {
					const modalClose = instance.element().querySelector('.modal-close');
					const modalPrev = instance.element().querySelector('.modal-prev');
					const modalNext = instance.element().querySelector('.modal-next');
					const modalClickWindow = instance.element();

					modalClose.onclick = () => {
						hero.classList.remove('modal-open');
						instance.close();
					};

					modalPrev.onclick = (e) => {
						currentIndex = currentIndex > 0 ? currentIndex - 1 : galleryItems.length - 1;
						createCircle(e.clientX, e.clientY, instance.element());
						updateImage(currentIndex, instance.element());
					};

					modalNext.onclick = (e) => {
						currentIndex = currentIndex < galleryItems.length - 1 ? currentIndex + 1 : 0;
						createCircle(e.clientX, e.clientY, instance.element());
						updateImage(currentIndex, instance.element());
					};

					// клік тільки на модальне вікно
					// код демонструє варіативність basicLightbox
					modalClickWindow.onclick = (e) => {
						if (e.target.classList[0] === 'modal-window') {
							createCircle(e.clientX, e.clientY, instance.element());
							setTimeout(() => {
								instance.close();
							}, 500);
							hero.classList.remove('modal-open');
						}
					};
				},
			}
		);
		instance.show();
	}

	galleryItems.forEach((item, index) => {
		item.addEventListener('click', function (event) {
			// Заборна завантаження зображення
			event.preventDefault();
			currentIndex = index;
			showImage(currentIndex);
		});
	});

	//Функція візуалізацїї клику
	function createCircle(x, y, container) {
		const circle = document.createElement('div');
		circle.className = 'circle';
		circle.style.left = `${x - container.getBoundingClientRect().left - 25}px`;
		circle.style.top = `${y - container.getBoundingClientRect().top - 25}px`;
		circle.style.width = `50px`;
		circle.style.height = `50px`;
		circle.style.border = `3px solid black`;
		container.appendChild(circle);

		//Видалення елементу через потрібний час, сек
		setTimeout(() => {
			circle.remove();
		}, 250);
	}

	// Функція оновлення зображення
	function updateImage(index, container) {
		container.querySelector('img').src = galleryItems[index].querySelector('img').src;
	}
}

gallery.insertAdjacentHTML('beforeend', galleryItemsHTML);
document.addEventListener('DOMContentLoaded', showEnlargeImage);
document.addEventListener('DOMContentLoaded', selectedImage);
document.addEventListener('DOMContentLoaded', modalWindow);
