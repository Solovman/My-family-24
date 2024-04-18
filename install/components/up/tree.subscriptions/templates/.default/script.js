window.addEventListener('load', () => {
	const tabsButtons = document.querySelectorAll('.subscriptions__btn');

	tabsButtons.forEach(btn => {
		btn.addEventListener('click', () => {

			const prevActiveItem = document.querySelector('.subscriptions__tabs-item._active');

			const prevActiveButton = document.querySelector('.subscriptions__btn._active');

			if (prevActiveButton) {
				prevActiveButton.classList.remove('_active');
			}

			if (prevActiveItem) {
				prevActiveItem.classList.remove('_active');
			}

			const nextActiveItemId = `#${btn.getAttribute('data-tab')}`;

			const nextActiveItem = document.querySelector(nextActiveItemId);

			btn.classList.add('_active');
			nextActiveItem.classList.add('_active');
		});
	})
})
