window.addEventListener('load', () => {
	const tabsButtons = document.querySelectorAll('.main__tabs-button');
	const localStorageKey = 'activeTab';

	let activeTabId = localStorage.getItem(localStorageKey);

	tabsButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			const prevActiveItem = document.querySelector('.main__tabs-item._active');
			const prevActiveButton = document.querySelector('.main__tabs-button._active');

			if (prevActiveButton) {
				prevActiveButton.classList.remove('_active');
			}

			if (prevActiveItem) {
				prevActiveItem.classList.remove('_active');
			}

			const nextActiveItemId = `#${btn.getAttribute('data-tab')}`;
			const nextActiveItem = document.querySelector(nextActiveItemId);

			activeTabId = nextActiveItemId;

			localStorage.setItem(localStorageKey, activeTabId);

			btn.classList.add('_active');
			nextActiveItem.classList.add('_active');
		});

		if (activeTabId && `#${btn.getAttribute('data-tab')}` === activeTabId) {
			btn.click();
		}
	});
});
