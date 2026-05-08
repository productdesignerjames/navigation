// Mobile nav open/close logic
document.addEventListener('DOMContentLoaded', function () {
	const menuBtn = document.querySelector('.mobile-menu-btn');
	const menu = document.getElementById('mobileMenu');
	const closeBtn = document.querySelector('.mobile-close-btn');
	if (menuBtn && menu) {
		menuBtn.addEventListener('click', function () {
			if (menu.classList.contains('open')) {
				menu.classList.remove('open');
				menuBtn.classList.remove('active');
			} else {
				menu.classList.add('open');
				menuBtn.classList.add('active');
			}
		});
	}
	if (closeBtn && menu && menuBtn) {
		closeBtn.addEventListener('click', function () {
			menu.classList.remove('open');
			menuBtn.classList.remove('active');
		});
	}

	// Mobile accordion logic
	const accordionBtns = document.querySelectorAll('.mobile-accordion-btn');
	accordionBtns.forEach(function (btn) {
		btn.addEventListener('click', function () {
			var parent = btn.parentElement;
			var isOpen = parent.classList.contains('open');
			// Close all accordions
			document.querySelectorAll('.mobile-accordion').forEach(function (acc) {
				acc.classList.remove('open');
			});
			// Toggle current
			if (!isOpen) {
				parent.classList.add('open');
			}
		});
	});

	// Desktop mega menu hover logic
	const tabs = document.querySelectorAll('.tab-figma[data-menu]');
	const navbar = document.querySelector('.navbar');
	const panels = document.querySelectorAll('.mega-menu-panel');
	let closeTimeout;

	var activePanel = null;

	function openMenu(menuName) {
		clearTimeout(closeTimeout);
		var panel = document.querySelector('[data-menu-panel="' + menuName + '"]');
		if (panel && panel !== activePanel) {
			// If already open, switch instantly (no fade)
			if (activePanel) {
				panel.style.transition = 'none';
				panel.classList.add('active');
				activePanel.classList.remove('active');
				// Re-enable transition after paint
				requestAnimationFrame(function () {
					panel.style.transition = '';
				});
			} else {
				// First open — fade in
				panel.classList.add('active');
			}
			activePanel = panel;
			navbar.classList.add('mega-open');
		}
		// Highlight the active tab
		tabs.forEach(function (t) {
			t.classList.remove('active');
		});
		var activeTab = document.querySelector('[data-menu="' + menuName + '"]');
		if (activeTab) {
			activeTab.classList.add('active');
		}
	}

	function scheduleClose() {
		closeTimeout = setTimeout(function () {
			panels.forEach(function (p) {
				p.classList.remove('active');
			});
			activePanel = null;
			navbar.classList.remove('mega-open');
			tabs.forEach(function (t) {
				t.classList.remove('active');
			});
		}, 300);
	}

	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') {
			// Close desktop mega menu
			clearTimeout(closeTimeout);
			panels.forEach(function (p) {
				p.classList.remove('active');
			});
			activePanel = null;
			navbar.classList.remove('mega-open');
			tabs.forEach(function (t) {
				t.classList.remove('active');
			});
			// Close mobile menu
			if (menu && menu.classList.contains('open')) {
				menu.classList.remove('open');
				menuBtn.classList.remove('active');
			}
		}
	});

	tabs.forEach(function (tab) {
		tab.addEventListener('mouseenter', function () {
			openMenu(tab.dataset.menu);
		});
		tab.addEventListener('mouseleave', scheduleClose);
	});

	panels.forEach(function (panel) {
		panel.addEventListener('mouseenter', function () {
			clearTimeout(closeTimeout);
		});
		panel.addEventListener('mouseleave', scheduleClose);
	});
});
