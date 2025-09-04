const teamBoxes = document.querySelectorAll('.team__box')

let currentlyFlippedBox = null

// Mobile
// Open mobile function for team__box
const openMobileView = () => {
	teamBoxes.forEach(teamBox => {
		const back = teamBox.querySelector('.team__box-back')
		const teamIcons = teamBox.querySelector('.team__box-back-icons')
		const flipTriggerBtn = teamBox.querySelector('.team__box-front-btn')

		teamBox.classList.add('team__box--nonactive')

		// Hidden back for screen readers
		if (back) {
			back.setAttribute('aria-hidden', 'true')
			teamIcons.setAttribute('aria-hidden', 'true')
		}

		// Add event listener once
		if (flipTriggerBtn && !flipTriggerBtn.dataset.listenerAttached) {
			flipTriggerBtn.addEventListener('click', event => {
				if (teamBox.classList.contains('team__box--nonactive')) {
					if (currentlyFlippedBox && currentlyFlippedBox !== teamBox) {
						closeFlippedBox(currentlyFlippedBox)
					}

					const isNowFlipped = teamBox.classList.toggle('isflipped')
					flipTriggerBtn.setAttribute('aria-expanded', isNowFlipped ? 'true' : 'false')

					if (back) {
						back.setAttribute('aria-hidden', isNowFlipped ? 'false' : 'true')
						teamIcons.setAttribute('aria-hidden', isNowFlipped ? 'false' : 'true')
					}

					currentlyFlippedBox = isNowFlipped ? teamBox : null
				}

				event.stopPropagation()
			})
			flipTriggerBtn.dataset.listenerAttached = 'true'
		}

		// Add focusin - close other team__boxes
		teamBox.addEventListener('focusin', () => {
			if (currentlyFlippedBox && currentlyFlippedBox !== teamBox) {
				closeFlippedBox(currentlyFlippedBox)
			}
		})
	})
}

// Close mobile function for team__box
const closeMobileView = () => {
	teamBoxes.forEach(teamBox => {
		const back = teamBox.querySelector('.team__box-back')

		teamBox.classList.remove('team__box--nonactive')
		teamBox.classList.remove('isflipped')

		if (back) {
			back.removeAttribute('aria-hidden')
		}
	})

	// Reset currentlyFlippedBox variable
	currentlyFlippedBox = null
}

// Function to manage responsive view
const handleResponsiveView = () => {
	const isMobile = window.innerWidth < 768

	if (isMobile) {
		openMobileView()
	} else {
		closeMobileView()
	}
}

// Function to close team__box when click on close button
const closeFlippedBox = box => {
	if (!box) return

	box.classList.remove('isflipped')

	const back = box.querySelector('.team__box-back')
	const teamIcons = box.querySelector('.team__box-back-icons')

	if (back) {
		back.setAttribute('aria-hidden', 'true')
		teamIcons.setAttribute('aria-hidden', 'true')
	}
	currentlyFlippedBox = null
}

// Desktop
// Function to update toggle icon and aria-expanded attribute
const updateToggleIcon = teamBox => {
	const button = teamBox.querySelector('.team__box-btn')
	const icon = button?.querySelector('i')
	const isOpen = teamBox.classList.contains('team__box--open')

	if (!icon || !button) return

	icon.classList.toggle('fa-angle-double-left', isOpen)
	icon.classList.toggle('fa-angle-double-right', !isOpen)

	button.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
}

// Function to open team__box on click for desktop view
const openTeamBox = openBox => {
	const teamIcons = openBox.querySelector('.team__box-back-icons')
	const back = openBox.querySelector('.team__box-back')

	openBox.classList.remove('team__box--closing')
	openBox.classList.add('team__box--open')

	if (teamIcons) {
		teamIcons.classList.remove('team__box-back-icons-close')
		teamIcons.classList.add('team__box-back-icons--open')

		teamIcons.setAttribute('aria-hidden', 'false')
	}

	if (back) {
		back.setAttribute('aria-hidden', 'false')
	}

	setTimeout(() => {
		const firstIconLink = openBox.querySelector('.team__box-back-icons a')
		if (firstIconLink) {
			firstIconLink.focus()
		}
	}, 10)

	updateToggleIcon(openBox)
}

const closeTeamBox = openBox => {
	const teamIcons = openBox.querySelector('.team__box-back-icons')
	const back = openBox.querySelector('.team__box-back')

	openBox.classList.remove('team__box--open')
	openBox.classList.add('team__box--closing')

	setTimeout(() => {
		if (teamIcons) {
			teamIcons.classList.remove('team__box-back-icons--open')
			teamIcons.classList.add('team__box-back-icons-close')
		}
	}, 700)

	teamIcons.setAttribute('aria-hidden', 'true')
	if (back) {
		back.setAttribute('aria-hidden', 'true')
	}
}

// A function that supports opening and closing team__box
const handleTeamBox = openBox => {
	const teamIcons = openBox.querySelector('.team__box-back-icons')
	// We check if any of the team__boxes are open. If so, we close it
	teamBoxes.forEach(teamBox => {
		if (teamBox !== openBox && teamBox.classList.contains('team__box--open')) {
			// If a box is open, we close it
			closeTeamBox(teamBox)
			updateToggleIcon(teamBox)
		}
	})

	if (openBox.classList.contains('team__box--open')) {
		closeTeamBox(openBox)
	} else {
		openTeamBox(openBox)
	}
	updateToggleIcon(openBox)
}

// Add an event listener to each team__box
teamBoxes.forEach(teamBox => {
	const teamBoxBtn = teamBox.querySelector('.team__box-btn')
	const teamBoxBtnI = teamBox.querySelector('.team__box-btn i')

	const handleClick = event => {
		// support click a button in team__box
		handleTeamBox(teamBox)

		event.stopPropagation()
	}
	teamBoxBtn.addEventListener('click', handleClick)
})

// Function to close an open team__box after clicking outside of it
const closeTeamBoxOnClickOutside = event => {
	teamBoxes.forEach(teamBox => {
		if (!teamBox.contains(event.target) && teamBox.classList.contains('team__box--open')) {
			closeTeamBox(teamBox)
			updateToggleIcon(teamBox)
		}

		if (!teamBox.contains(event.target)) {
			teamBox.classList.remove('isflipped')
		}
	})
}

document.addEventListener('click', closeTeamBoxOnClickOutside)

// We change the class after loading the page and when changing the resolution
window.addEventListener('load', handleResponsiveView)
window.addEventListener('resize', handleResponsiveView)

document.addEventListener('keydown', event => {
	if (event.key === 'Escape' && currentlyFlippedBox) {
		if (currentlyFlippedBox.classList.contains('team__box--nonactive')) {
			closeFlippedBox(currentlyFlippedBox)
		}
	}
})
